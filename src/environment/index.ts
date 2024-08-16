import Core from "../core";
import Loader from "../loader";

export default class Environment { 
    private core: Core;
    private loader: Loader;
    // is_load_finished = false;
    
    constructor() { 
        this.core = new Core();
        this.loader = new Loader();
        this._loadScenes();
    }

    private async _loadScenes() {
       try {
           await this._loadStaticScene();
           
       } catch (error) {
           console.log(error);
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