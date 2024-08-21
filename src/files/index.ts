// 贴图资源
export const BOARD_TEXTURES = [
    new URL("../../static/boards/1.png", import.meta.url).href,
    new URL("../../assets/boards/2.png", import.meta.url).href,
    new URL("../../static/boards/3.jpg", import.meta.url).href,
    new URL("../../assets/boards/4.jpg", import.meta.url).href,
    new URL("../../assets/boards/5.png", import.meta.url).href,
    new URL("../../assets/boards/6.png", import.meta.url).href,
    new URL("../../assets/boards/7.png", import.meta.url).href,
    new URL("../../assets/boards/8.jpg", import.meta.url).href,
    new URL("../../assets/boards/9.jpg", import.meta.url).href,
    new URL("../../assets/boards/10.png", import.meta.url).href,
]

// 视频资源
export const AUDIO_URL = new URL("../../static/audio/01.m4a", import.meta.url).href

export const Module = "../../static/models/scene_desk_obj.glb"

// 注册事件
export const Events = {
    ON_LOAD: "on-load",
    ON_LOAD_MODEL_FINISH : "on-load-model-finish"
}