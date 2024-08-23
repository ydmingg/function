import Core from "./core";

const loadingDOM = document.createElement("div")
loadingDOM.classList.add("loading")
document.body.insertAdjacentElement('afterbegin',loadingDOM)
const loading_completeDOM = `<div class="loading-complete display-none">
    <p>
    加载完成
    <svg t="1677233206130" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2675" width="24" height="24"><path d="M537.6 102.4c73.5744 0 142.336 20.6848 200.704 56.576 15.872 9.6256 16.7936 23.1424 2.9696 40.5504-14.08 16.2816-43.008 13.2608-86.8352-9.216l-0.0512 0.0512a318.1568 318.1568 0 1 0 104.8064 524.3904h0.3584c19.456-26.7776 40.5504-40.192 63.1296-40.2432l6.8096 0.4096c24.064 4.4032 30.4128 16.6912 19.0464 36.864l0.2048-0.3584-0.1536 0.1536-0.0512 0.2048h-0.1024l-7.936 10.5984A384 384 0 1 1 537.6 102.4z m332.288 201.0112a33.28 33.28 0 0 1 0 47.104l-276.48 276.48a31.2832 31.2832 0 0 1-0.512 0.4608l-3.584 3.584a30.72 30.72 0 0 1-43.4176 0l-1.8432-1.792-0.4096-0.512-135.3216-135.2704a30.72 30.72 0 0 1 0-43.4176l3.584-3.584a30.72 30.72 0 0 1 43.4688 0l112.2304 112.128 255.232-255.1808a33.28 33.28 0 0 1 47.104 0z" fill="#ffffff" p-id="2676"></path></svg>
    </p>
    <p>Tips:(移动端建议开启横屏，双击屏幕开启全屏体验更佳！)</p>
    <div class="start">进入项目</div>
</div>`
document.querySelector("#app")?.insertAdjacentHTML('beforebegin',loading_completeDOM) 
        


// 实例化
const core = new Core();
core.render();
