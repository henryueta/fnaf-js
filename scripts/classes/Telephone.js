import { audio_manager } from "../audio-manager.js";

class Telephone {

    constructor(config){
        this.call_audio = config.call_audio;
        this.isCanceled = false;
        this.enableCancelButton = config.enableCancelButton;
        this.cancel_call_container = config.cancel_call_container;
        console.log("enabkle",this.enableCancelButton)
        if(!this.enableCancelButton){
            this.cancel_call_container.style.display = 'none';
        }
        this.cancel_call_container.children[0].addEventListener('click',()=>{
            if(this.isCanceled){
                return
            }

            audio_manager.onStop(this.call_audio);
            this.isCanceled = true;
            return
        })
    }

    onAnswerCall(onEnd){
        audio_manager.onPlay(this.call_audio,()=>{
            this.cancel_call_container.style.display = 'none';
            if(onEnd){
                onEnd();
            }
        })
    }

}

export {
    Telephone
}