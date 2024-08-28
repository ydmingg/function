import { Core } from "../index";

const loadingDOM = document.createElement("div")
loadingDOM.classList.add("loading")
document.body.insertAdjacentElement('afterbegin', loadingDOM)



const container = document.querySelector('#app') as HTMLDivElement;
const width = container.clientWidth;
const height = container.clientHeight;


// 实例化
const core = new Core(container, {
    width,
    height 
});


// 渲染
// const url1 = "../static/models/scene_collision.glb";
// const url2 = "../static/models/scene_collision.glb";
// core.render(url1);

