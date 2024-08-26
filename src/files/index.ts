export const COLLISION_SCENE_URL = new URL("../../static/models/scene_collision.glb", import.meta.url).href;
export const STATIC_SCENE_URL = new URL("../../static/models/scene_desk_obj.glb", import.meta.url).href;

// 贴图资源
export const BOARD_TEXTURES = [
	new URL("../../static/boards/1.png", import.meta.url).href,
    new URL("../../static/boards/2.png", import.meta.url).href,
    new URL("../../static/boards/3.jpg", import.meta.url).href,
    new URL("../../static/boards/4.jpg", import.meta.url).href,
    new URL("../../static/boards/5.png", import.meta.url).href,
    new URL("../../static/boards/6.png", import.meta.url).href,
    new URL("../../static/boards/7.png", import.meta.url).href,
    new URL("../../static/boards/8.jpg", import.meta.url).href,
    new URL("../../static/boards/9.jpg", import.meta.url).href,
    new URL("../../static/boards/10.png", import.meta.url).href,
];

export const IFRAME_SRC = new URL("/universe/index.html", import.meta.url).href;

// 媒体资源
export const AUDIO_URL = new URL("../../static/audio/01.m4a", import.meta.url).href

// 注册事件
export const Events = {
    ON_LOAD_PROGRESS : "on-load-progress",
    ON_LOAD_MODEL_FINISH : "on-load-model-finish",
    ON_CLICK_RAY_CAST : "on-click-ray-cast",
    ON_SHOW_TOOLTIP : "on-show-tooltip",
    ON_HIDE_TOOLTIP : "on-hide-tooltip",
    ON_KEY_DOWN : "on-key-down",
    ON_KEY_UP : "on-key-up",
    ON_Click : "on-click",
    ON_ENTER_APP : "on-enter-app",
}


