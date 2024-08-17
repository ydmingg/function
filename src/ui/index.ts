import Core from "../core";

export default class Ui { 
    private core: Core;
    private doms: {
        /* 初始加载进度相关 */
        loading: HTMLElement;
        loading_complete: HTMLElement;
    }

    constructor() { 
        this.core = new Core()

        
        
        

        this.doms = {
            loading: document.querySelector(".loading")!,
			loading_complete: document.querySelector(".loading-complete")!,
            
        }
        
        
    }

    updateLoadingProgress(loading_text: string) {
		const progress = this.doms.loading;
		progress && (progress.textContent = loading_text);
	}

    removeLoading() {
		this.doms.loading.remove();
	}

    showLoadingConfirm() {
		this.doms.loading_complete.classList.remove("display-none");
	}
}