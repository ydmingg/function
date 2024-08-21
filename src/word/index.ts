import Core from "../core";
import Audio from "../audio";
import Environment from "../environment";
import { 
	Events,
} from "../files";

export default class Word { 
    private core: Core;
	private environment: Environment;
	private audio: Audio;

    constructor() { 
        this.core = new Core();

		this.core.$on(Events.ON_LOAD, this._handleLoadProgress.bind(this));
		this.core.$on(Events.ON_LOAD_MODEL_FINISH, this._onLoadModelFinish.bind(this));
        
		this.environment = new Environment();
		this.audio = new Audio()
	}
	

	private async _onLoadModelFinish() { 
		// 场景模型加载完毕后开始加载音频
		await this.audio.createAudio();

		// 音频加载完毕后移除加载进度UI，显示进入确认UI
		this.core.ui.removeLoading();
		this.core.ui.showLoadingConfirm();


	}

	private _handleLoadProgress([{url, loaded, total}]: [{url: string, loaded: number, total: number}]) {
		const percentage = ((loaded / total) * 100).toFixed(2);
		if (/.*\.(blob|glb)$/i.test(url)) {
			this.core.ui.updateLoadingProgress(`${url.includes("collision") ? "加载碰撞场景模型" : "加载其他场景模型"}：${percentage}%`);
		}
		if (/.*\.(jpg|png|jpeg)$/i.test(url)) {
			this.core.ui.updateLoadingProgress("加载图片素材中...");
		}
		if (/.*\.(m4a|mp3)$/i.test(url)) {
			this.core.ui.updateLoadingProgress("加载声音资源中...");
		}
	}
}