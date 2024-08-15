type EventCallback = (...args: any[]) => void;

export default class EventEmitter {
    // 存储事件及其回调函数的容器
    private events: Map<string, EventCallback[]>;

    constructor() {
        this.events = new Map();
    }

    // all 方法：返回所有事件及其回调函数
    public all(): Map<string, EventCallback[]> {
        return this.events;
    }

    // on 方法：绑定事件和回调函数
    public on(event: string, callback: EventCallback): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    // emit 方法：触发事件，调用所有绑定的回调函数
    public emit(event: string, ...args: any[]): void {
        if (!this.events.has(event)) return;

        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                callback(...args);
            });
        }
    }

    // off 方法：取消事件的某个或所有回调函数
    public off(event: string, callback?: EventCallback): void {
        if (!this.events.has(event)) return;

        if (!callback) {
            // 如果没有提供具体的回调函数，移除该事件的所有回调函数
            this.events.delete(event);
        } else {
            // 移除该事件的指定回调函数
            const callbacks = this.events.get(event);
            if (callbacks) {
                this.events.set(event, callbacks.filter(cb => cb !== callback));
            }
        }
    }
}

