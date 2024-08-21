import Core from "../core";
import Loader from "../loader";
import * as THREE from "three";
import { 
    BOARD_TEXTURES,
    Events,
    Module,
} from "../files";

export default class Environment { 
    private core: Core;
    private loader: Loader;
    private texture_boards: Record<string, THREE.Texture> = {};
    collider: THREE.Mesh | undefined;
    is_load_finished = false;
    
    constructor() { 
        this.core = new Core();
        this.loader = this.core.loader
        this._loadScenes();
    }

    private async _loadScenes() {
       try {
           await this._loadStaticScene();
           await this._loadBoardsTexture();
        //    this.is_load_finished = true;
        //    this.core.$emit(Events.ON_LOAD_MODEL_FINISH);
           
           
       } catch (error) {
           console.log(error);
       }

    }

    private async _loadBoardsTexture(): Promise<void> { 
        for (let i = 0; i < BOARD_TEXTURES.length; i++) {
            this.texture_boards[i+1] = await this.loader.texture_loader.loadAsync(BOARD_TEXTURES[i]);
            
        }

        return Promise.resolve();
    }

    private _loadStaticScene(): Promise<void> {
        return new Promise(resolve => {
            this.loader.gltf_loader.load(Module, (event: any) => {
                resolve();
                
            }),
                (event: any) => {
                
				this.core.$emit(Events.ON_LOAD, {url: Module, loaded: event.loaded, total: event.total});
			};
		});
	}
}