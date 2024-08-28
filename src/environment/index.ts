import { Core } from "../core";
import Loader from "../loader";
import {isLight, isMesh} from "../utils/typeAssert";
import * as THREE from "three";
import { 
    BOARD_TEXTURES,
    Events,
    STATIC_SCENE_URL,
    COLLISION_SCENE_URL,
} from "../files";
import {Reflector} from "../lib/index";
import {MeshBVH, MeshBVHOptions, StaticGeometryGenerator} from "three-mesh-bvh";

export default class Environment { 
    private core: Core;
    private loader: Loader;
    private collision_scene: THREE.Group | undefined;
    private texture_boards: Record<string, THREE.Texture> = {};
	private gallery_boards: Record<string, THREE.Mesh> = {};
	raycast_objects: THREE.Object3D[] = [];
    collider: THREE.Mesh | undefined;
    is_load_finished = false;
    
    constructor() { 
		this.core = new Core();
        this.loader = this.core.loader
		this._loadScenes(this.core.render);
		
        
    }

    private async _loadScenes() {
        try {
			await this._loadSceneAndCollisionDetection();
			await this._loadStaticScene();
			await this._loadBoardsTexture();
			this._configureGallery();
			this._createSpecularReflection();
			this.is_load_finished = true;
			this.core.$emit(Events.ON_LOAD_MODEL_FINISH);
			
			// console.log(this.collider);
		} catch (e) {
			console.log(e);
		}

    }

    private _createSpecularReflection() {
		const mirror = new Reflector(new THREE.PlaneGeometry(100, 100), {
			textureWidth: window.innerWidth * window.devicePixelRatio,
			textureHeight: window.innerHeight * window.devicePixelRatio,
			color: 0xffffff,
		});
		if (mirror.material instanceof THREE.Material) {
			mirror.material.transparent = true;
		}
		mirror.rotation.x = -0.5 * Math.PI;
		this.core.scene.add(mirror);
	}

    private _configureGallery() {
		for (const key in this.texture_boards) {
			const board = this.gallery_boards[`gallery${key}_board`];
			const board_material = board.material;

			(board_material as THREE.MeshBasicMaterial).map = this.texture_boards[key];
			// console.log(board);
			
			board.userData = {
				name: board.name,
				// title: BOARDS_INFO[key].title,
				// author: BOARDS_INFO[key].author,
				// describe: BOARDS_INFO[key].describe,
				index: key,
				src: this.texture_boards[key].image.src,
				show_boards: true
			};
		}
	}

    private async _loadBoardsTexture(): Promise<void> { 
		for (let i = 0; i < BOARD_TEXTURES.length; i++) {
			this.texture_boards[i + 1] = await this.loader.texture_loader.loadAsync(BOARD_TEXTURES[i]);
		}

		return Promise.resolve();
    }

    private _loadStaticScene(): Promise<void> {
        return new Promise(resolve => {
			this.loader.gltf_loader.load(url, (gltf) => {
				this.core.scene.add(gltf.scene);
				gltf.scene.traverse(item => {
					if (item.name === "computer") {
						item.userData = {
							name: item.name,
							// title: "",
						};
						this.raycast_objects.push(item);
					}
				});
				resolve();
			}, (event) => {
				this.core.$emit(Events.ON_LOAD_PROGRESS, {url: STATIC_SCENE_URL, loaded: event.loaded, total: event.total});
			});
		});
    }
    
    private _loadSceneAndCollisionDetection(): Promise<void> { 
        return new Promise(resolve => {
			this.loader.gltf_loader.load(COLLISION_SCENE_URL, (gltf) => {
				this.collision_scene = gltf.scene;

				this.collision_scene.updateMatrixWorld(true);

				this.collision_scene.traverse(item => {
					if (item.name === "home001" || item.name === "PointLight") {
						item.castShadow = true;
					}

					if (item.name.includes("PointLight") && isLight(item)) {
						item.intensity *= 2000;
					}

					if (item.name === "home002") {
						item.castShadow = true;
						item.receiveShadow = true;
					}

					// 提取出相框元素
					if (/gallery.*_board/.test(item.name) && isMesh(item)) {
						this.gallery_boards[item.name] = item;
					}

					this.raycast_objects.push(item);
				});

				const static_generator = new StaticGeometryGenerator(this.collision_scene);
				static_generator.attributes = ["position"];

				const merged_geometry = static_generator.generate();
				merged_geometry.boundsTree = new MeshBVH(merged_geometry, {lazyGeneration: false} as MeshBVHOptions);

				this.collider = new THREE.Mesh(merged_geometry);
				this.core.scene.add(this.collision_scene);

				resolve();
			}, (event) => {
				this.core.$emit(Events.ON_LOAD_PROGRESS, {url: COLLISION_SCENE_URL, loaded: event.loaded, total: event.total});
			});
		});
    }
}