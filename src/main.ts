import Core from "./core";

const loadingDOM = document.createElement("div")
loadingDOM.classList.add("loading")
document.body.insertAdjacentElement('afterbegin',loadingDOM)
const loading_completeDOM = document.createElement("div")
loading_completeDOM.className = "loading-complete display-none"
document.querySelector("#app")?.insertAdjacentElement('beforebegin',loading_completeDOM) 
        
// 实例化
const core = new Core();