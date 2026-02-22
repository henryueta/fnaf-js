import { onRandomNumber } from "../functions/randomNumber.js";
import { AudioProvider } from "./AudioProvider.js";

class FootstepCheat{

    constructor(){
        this.inProcess = false;
        this.current_footstep = null;
        this.right_to_left_audio = "../assets/audio/right_to_left_footstep.mp3";
        this.left_to_right_audio = "../assets/audio/left_to_right_footstep.mp3";
        this.footstep_audio = null;
    }

    onCheat(){

        if(!this.inProcess){
            this.inProcess = true;
        }
        
        this.current_footstep = 
            this.current_footstep === null
            ? (onRandomNumber(0,1) === 1
                ? 'right_to_left'
                : 'left_to_right'
            )
            : (
                this.current_footstep === 'right_to_left'
                ? 'left_to_right'
                : 'right_to_left'
            );

            if(this.footstep_audio !== null){
                this.footstep_audio.audio = 
                    this.current_footstep === 'right_to_left'
                    ? this.left_to_right_audio
                    : this.right_to_left_audio
                
                this.footstep_audio.onLoadAudio();
                this.footstep_audio.onPlayAudio();

                return
            }

        this.footstep_audio = 
                new AudioProvider({
                audio:(
                this.current_footstep === 'right_to_left'
                ? this.right_to_left_audio
                : this.left_to_right_audio
                ),
                volume:0.8
                });
        this.footstep_audio.onLoadAudio();
        this.footstep_audio.onPlayAudio();

                console.log(this.current_footstep)
                console.log(this.footstep_audio)

        return

    }

}

export {
    FootstepCheat
}