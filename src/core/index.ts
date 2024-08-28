import * as THREE from 'three';
import type { CoreOptions } from "../types";
import UI from "../ui";
import Loader from "../loader";
import Emitter from "../utils";
import Word from "../word";
import ControlManage from "../controlManage";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let instance: Core | null = null;
export class Core extends Emitter{ 
	private container: HTMLDivElement;
    scene!: THREE.Scene;
	renderer!: THREE.WebGLRenderer;
	camera!: THREE.PerspectiveCamera;
	clock!: THREE.Clock;
	orbit_controls!: OrbitControls;

	ui!: UI;
	control_manage!: ControlManage;
    loader!: Loader;
    word!: Word;
    
    constructor(container: HTMLDivElement, opts: CoreOptions) { 
		super();

		const { width, height } = opts;
		this.container = container
		

        if (instance) { return instance }
        instance = this;

		



        this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.camera = new THREE.PerspectiveCamera();
		this.clock = new THREE.Clock();
		this.orbit_controls = new OrbitControls(this.camera, this.renderer.domElement);

        this._initScene();
		this._initCamera({
			width,
			height,
		});
		// renderer 渲染
		this._initRenderer({
			width,
			height,
		});
		// 初始化resize
		this._initResponsiveResize();
		
		// 实例化ui
        this.ui = new UI();
		this.control_manage = new ControlManage();
        this.loader = new Loader()
        this.word = new Word()

		
	}
	
	render(url: string) {
		console.log(url);
		
		
		this.renderer.setAnimationLoop(() => {
			this.renderer.render(this.scene, this.camera);
			const delta_time = Math.min(0.05, this.clock.getDelta());
			this.word.update(delta_time);
			this.orbit_controls.update();
		});
	}

    private _initScene() {
		this.scene.background = new THREE.Color(0x000000);
	}
    
    private _initCamera(size: any) {
		this.camera.fov = 55;
		this.camera.aspect = size.width / size.height;
		this.camera.near = 0.1;
		this.camera.far = 1000;
		this.camera.position.set(0, 0, 3);
		this.camera.updateProjectionMatrix();
    }
    
    private _initRenderer(size:any) {
		this.renderer.shadowMap.enabled = true;
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.setSize(size.width, size.height);
		// this.renderer.domElement.style.position = "absolute";
		// this.renderer.domElement.style.zIndex = "1";
		// this.renderer.domElement.style.top = "0px";
		
		this.container.appendChild(this.renderer.domElement);
	}
    
    private _initResponsiveResize() {
		window.addEventListener("resize", () => {
			this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
			this.renderer.setPixelRatio(window.devicePixelRatio);
		});
	}



    
}