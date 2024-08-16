import UI from "../ui";
import Loader from "../loader";
import Emitter from "../utils";
import Word from "../word";

let instance: Core | null = null;
export default class Core extends Emitter{ 
    ui!: UI;
    loader!: Loader;
    word!: Word;
    
    constructor() { 
        super();

        if (instance) { return instance }
        instance = this;

        // 实例化ui
        this.ui = new UI();
        this.loader = new Loader()
        this.word = new Word()
        
        
    }

    
    
    



    
}