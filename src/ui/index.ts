import Core from "../core";

export default class Ui { 
    private core: Core
    private doms: {
        /* 初始加载进度相关 */
        app: HTMLElement;
        // loading: HTMLElement;
        // loading_complete: HTMLElement;
    }

    constructor() { 
        this.core = new Core()

        this.doms = {
            app: document.querySelector("#app")!,
            // loading: document.querySelector(".loading")!,
			// loading_complete: document.querySelector(".loading-complete")!,
            
        }
        

        
    }
}