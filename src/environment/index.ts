import Core from "../core";
import Loader from "../loader";
import * as THREE from "three";
import { 
    BOARD_TEXTURES
} from "../files";

export default class Environment { 
    private core: Core;
    private loader: Loader;
    private texture_boards: Record<string, THREE.Texture> = {};
    collider: THREE.Mesh | undefined;
    is_load_finished = false;
    
    constructor() { 
        this.core = new Core();
        this.loader = new Loader();
        this._loadScenes();
    }

    private async _loadScenes() {
       try {
           await this._loadStaticScene();
           await this._loadBoardsTexture();
           this.is_load_finished = true;
           this.core.$emit("on-load-model-finish");
           
           
       } catch (error) {
           console.log(error);
       }

    }

    private async _loadBoardsTexture(): Promise<void> { 
        for (let i = 0; i < BOARD_TEXTURES.length; i++) {
            this.texture_boards[i+1] = await this.loader.texture_loader.loadAsync(BOARD_TEXTURES[i]);
        }
    }

    private _loadStaticScene(): Promise<void> {
        return new Promise(resolve => {
            this.loader.gltf_loader.load("../../static/models/scene_desk_obj.glb", (event: any) => {
                resolve();
                
            }),
                (event: any) => {
                
                
				// this.core.$emit("on-load-progress", {url: "../../static/models/scene_desk_obj.glb", loaded: event.loaded, total: event.total});
			};
		});
	}
}