import EventEmitter from "evter";

export default class Emitter {
    
    private eventEmitter: EventEmitter;

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    $on(event: string, callback: (...args: any[])=> void) {
        this.eventEmitter.on(event, callback);
    }
    
    $emit(name: string, ...args: any[]) {
		this.eventEmitter.emit(name, args);
	}

}