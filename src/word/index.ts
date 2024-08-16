import Core from "../core";
import Environment from "../environment";

export default class Word { 
    private core: Core;
    private environment: Environment;

    constructor() { 
        this.core = new Core();
        
        this.core.$on("on-load-progress", this._handleLoadProgress.bind(this));
        console.log(this.core);
        
        this.environment = new Environment();
    }

    private _handleLoadProgress([{url, loaded, total}]: [{url: string, loaded: number, total: number}]) {
		const percentage = ((loaded / total) * 100).toFixed(2);
        if (/.*\.(blob|glb)$/i.test(url)) {
            
			this.core.ui.updateLoadingProgress(`${url.includes("collision") ? "加载碰撞场景模型" : "加载其他场景模型"}：${percentage}%`);
		}
		// if (/.*\.(jpg|png|jpeg)$/i.test(url)) {
		// 	this.core.ui.updateLoadingProgress("加载图片素材中...");
		// }
		// if (/.*\.(m4a|mp3)$/i.test(url)) {
		// 	this.core.ui.updateLoadingProgress("加载声音资源中...");
		// }
	}
}