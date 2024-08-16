import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import Core from "../core";
import {DefaultLoadingManager} from "three";

export default class Loader { 
    gltf_loader: GLTFLoader;
    private core: Core;
    constructor() { 
        this.core = new Core();
        this.gltf_loader = new GLTFLoader();
        
        // 触发事件
        DefaultLoadingManager.onProgress = (url, loaded, total) => {
			this.core.$emit("on-load-progress", {url, loaded, total});
		};

    }
}