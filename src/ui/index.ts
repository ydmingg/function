import Core from "../core";
import { Events } from "../files"

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
        
        document.body.addEventListener("click", this.handleClick.bind(this));
        
        
    }

    handleClick(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
			// 定义一套对应元素click响应事件的策略
			const MAP_EVENT = [
				{
					verify: () => {
						return (e.target as HTMLElement).classList.contains("start");
					},
					handler: this.onClickEnterApp.bind(this)
				},
				// {
				// 	verify: () => {
				// 		return this._isBInA(["boards-info-close", "boards-info"], (e.target as HTMLElement).classList.value.split(" "));
				// 	},
				// 	handler: this.hideBoardsBox.bind(this)
				// },
				// {
				// 	verify: () => {
				// 		return (e.target as HTMLElement).classList.contains("help");
				// 	},
				// 	handler: this.showHelp.bind(this)
				// },
				// {
				// 	verify: () => {
				// 		return this._isBInA(["operating-intro-close", "operating-intro", "operating-intro-img"], (e.target as HTMLElement).classList.value.split(" "));
				// 	},
				// 	handler: this.hideHelp.bind(this)
				// }
			];

			const event = MAP_EVENT.find(item => item.verify());
			if (event) {
				event.handler();
			}
		}
	}
	
	showBoardsBox(title: string, author: string, describe: string, img_src: string) {
		// if (this.doms.boards_dialog.style.visibility === "visible") return;
		// this.doms.boards_dialog.style.visibility = "visible";
		// this.doms.boards_container.classList.remove("hide");
		// this.doms.boards_title.innerText = title;
		// this.doms.boards_author.innerText = author;
		// this.doms.boards_describe.innerHTML = describe;
		// this.doms.boards_img.src = img_src;
		// this.doms.boards_content.scrollTo({top: 0, left: 0, behavior: "smooth"});
	}

	showPreviewTooltip(msg: string, show_preview_tips = true) {
		// this.doms.preview_tooltip.classList.remove("hide");
		// if (show_preview_tips) {
		// 	this.doms.preview_tips.classList.remove("hide");
		// }
		// if (this.doms.preview_tooltip.innerText === msg) return;
		// this.doms.preview_tooltip.innerText = msg;
	}

	hidePreviewTooltip() {
		// this.doms.preview_tooltip.classList.add("hide");
		// this.doms.preview_tips.classList.add("hide");
	}
    
    onClickEnterApp() {
		this.doms.loading_complete.remove();
        this.core.$emit(Events.ON_ENTER_APP);
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