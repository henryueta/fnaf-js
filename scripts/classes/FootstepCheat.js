import { onRandomNumber } from "../functions/randomNumber.js";
import { AudioProvider } from "./AudioProvider.js";

class FootstepCheat{

    constructor(){
        this.max_cheat_quantity = 3;
        this.current_cheat_quantity = 0;
        this.inProcess = false;
        this.current_footstep = null;
        this.right_to_left_audio = "../assets/audio/right_to_left_footstep.mp3";
        this.left_to_right_audio = "../assets/audio/left_to_right_footstep.mp3";
        this.right_audio = "";
        this.left_audio = "";
        this.current_side = null;
        this.footstep_audio = null;
    }

    onResetFootstepCheatQuantity(){
        // this.max_cheat_quantity = 3;
        this.current_cheat_quantity = 0;
    }

    onPlayFootstepAudio(){
        this.current_cheat_quantity+=1;
        this.footstep_audio.onLoadAudio().then(()=>{
            this.footstep_audio.onPlayAudio();
            this.current_side = 
               this.current_footstep === 'right_to_left'
                ? 'left'
                : 'right';
                 if(this.current_cheat_quantity === this.max_cheat_quantity){
                    this.inProcess = false;
                return
        }
        })
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
                    ? this.right_to_left_audio
                    : this.left_to_right_audio
                
                    this.onPlayFootstepAudio();


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
        this.onPlayFootstepAudio();


        return

    }

}

export {
    FootstepCheat
}