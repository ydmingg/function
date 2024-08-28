import { Core } from "../core";
import {Events} from "../files";

type Mode = "pc" | "mobile"

type Keys = "KeyW" | "KeyS" | "KeyA" | "KeyD" | "Space";

type KeySets = Keys[]

type KeyStatus = {
	[key in Keys]: boolean;
};

export default class ControlManage {
	private core: Core;
	key_status: KeyStatus = {
		"KeyW": false,
		"KeyS": false,
		"KeyA": false,
		"KeyD": false,
		"Space": false
	};
	is_click = true;
	is_enabled =  false;
	private key_sets: KeySets = ["KeyW", "KeyS", "KeyA", "KeyD", "Space"];
	private joystick_element = document.getElementById("joystick")!;
	// private joystick_manager: ReturnType<typeof Joystick.create> | undefined;
	mode: Mode = "pc";
	move_degree: number | undefined = undefined;
	target_position: any;

	constructor() {
		this.core = new Core();
		this._bindEvent();
	}

	private _bindEvent() {
		
		
		if ("ontouchstart" in window) { // 绑定移动端摇杆事件
			this.mode = "mobile";

			this._createJoystick();

			window.addEventListener("dblclick", () => {
				document.documentElement.requestFullscreen();
			});

			document.addEventListener('click', () => { 
				// this.move_degree = 12
				console.log(this.move_degree);
				
			})
			
			// this.joystick_manager?.on("move", (event, nipple) => {
			// 	this.move_degree = nipple.angle.degree;
			// });

			// this.joystick_manager?.on("end", () => {
			// 	this.move_degree = undefined
			// });
		} else { // 绑定pc端键盘事件
			document.addEventListener("keydown", this._onKeyDown.bind(this));
			document.addEventListener("keyup", this._onKeyUp.bind(this));
			// document.addEventListener("click", () => { 
			// 	this.move_degree = 12
			// 	console.log(this.move_degree);
			// })
			// 鼠标长按时设置 this.is_click = false;
			// this.mode = "mobile";

			// this._createJoystick();

			// window.addEventListener("dblclick", () => {
			// 	document.documentElement.requestFullscreen();
			// });

			// document.addEventListener('click', () => { 
			// 	this.move_degree = 12
			// 	// console.log(this.move_degree);
				
			// })
			// document.addEventListener("click", this._onClick.bind(this));
		}
	}

	private _createJoystick() {
		// this.joystick_element.style.display = "block";

		// this.joystick_manager = Joystick.create({
		// 	zone: this.joystick_element,
		// 	color: "black",
		// 	mode: "static",
		// 	position: { left: "50%", top: "50%" },
		// });
	}

	private _onKeyDown(event: KeyboardEvent) {
		if (this.isAllowKey(event.code) && this.is_enabled) {
			this.key_status[event.code] = true;
			this.core.$emit(Events.ON_KEY_DOWN, event.code);
			// console.log(1);
			
		}
	}

	private _onKeyUp(event: KeyboardEvent) {
		if (this.isAllowKey(event.code) && this.is_enabled) {
			this.key_status[event.code] = false;
			this.core.$emit(Events.ON_KEY_UP, event.code);
		}
	}

	private _onClick(event:any) {
		if (this.is_enabled && this.is_click) { 
			// this.click_status[event.code] = false;
			this.core.$emit(Events.ON_Click, event.code);
			
		}
	}

	// 判断是否为允许的键盘key
	isAllowKey(key: string): key is Keys {
		return this.key_sets.includes(key as Keys);
	}

	disabled() {
		this.is_enabled = false;
	}

	enabled() {
		this.is_enabled = true;
	}
}
