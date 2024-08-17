import * as THREE from 'three';
import UI from "../ui";
import Loader from "../loader";
import Emitter from "../utils";
import Word from "../word";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let instance: Core | null = null;
export default class Core extends Emitter{ 
    scene!: THREE.Scene;
	renderer!: THREE.WebGLRenderer;
	camera!: THREE.PerspectiveCamera;
	clock!: THREE.Clock;
	orbit_controls!: OrbitControls;

    ui!: UI;
    loader!: Loader;
    word!: Word;
    
    constructor() { 
        super();

        if (instance) { return instance }
        instance = this;

        this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.camera = new THREE.PerspectiveCamera();
		this.clock = new THREE.Clock();
		this.orbit_controls = new OrbitControls(this.camera, this.renderer.domElement);

        // 实例化ui
        this.ui = new UI();
        this.loader = new Loader()
        this.word = new Word()

        this._initScene();
		this._initCamera();
		this._initRenderer();
		this._initResponsiveResize();
        
    }

    private _initScene() {
		this.scene.background = new THREE.Color(0x000000);
	}
    
    private _initCamera() {
		this.camera.fov = 55;
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.near = 0.1;
		this.camera.far = 1000;
		this.camera.position.set(0, 0, 3);
		this.camera.updateProjectionMatrix();
    }
    
    private _initRenderer() {
		this.renderer.shadowMap.enabled = true;
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.domElement.style.position = "absolute";
		this.renderer.domElement.style.zIndex = "1";
		this.renderer.domElement.style.top = "0px";
		document.querySelector("#app")?.appendChild(this.renderer.domElement);
	}
    
    private _initResponsiveResize() {
		window.addEventListener("resize", () => {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer.setPixelRatio(window.devicePixelRatio);
		});
	}



    
}