import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

import Core from "../core";
import {DefaultLoadingManager} from "three";

export default class Loader { 
    gltf_loader: GLTFLoader;
    texture_loader: THREE.TextureLoader;
    audio_loader: THREE.AudioLoader;
    private core: Core;
    constructor() { 
        this.core = new Core();
        this.gltf_loader = new GLTFLoader();
        this.texture_loader = new THREE.TextureLoader();
        this.audio_loader = new THREE.AudioLoader();
        
        // 触发事件
        DefaultLoadingManager.onProgress = (url, loaded, total) => {
            this.core.$emit("on-load", { url, loaded, total });
        };
        
        

    }
}