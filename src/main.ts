import Core from "./core";
import EventEmitter from "./event";

// 实例化
const core = new Core();






// 示例使用
const emitter = new EventEmitter();

function callback1(data: any) {
    console.log('callback1:', data);
}

function callback2(data: any) {
    console.log('callback2:', data);
}

// 绑定事件
emitter.on('event1', callback1);
emitter.on('event1', callback2);

// 触发事件
emitter.emit('event1', { some: 'data' });

// 取消某个事件的一个回调函数
emitter.off('event1', callback1);

// 触发事件，验证回调函数是否已被取消
emitter.emit('event1', { some: 'other data' });

// 取消某个事件的所有回调函数
emitter.off('event1');

// 触发事件，验证所有回调函数是否已被取消
emitter.emit('event1', { some: 'data' });

// 获取所有事件及其回调函数
console.log(emitter.all());


