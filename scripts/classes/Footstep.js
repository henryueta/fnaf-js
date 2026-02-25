import { audio_manager } from "../audio-manager.js";
import { onRandomNumber } from "../functions/randomNumber.js";

class Footstep{

    constructor(){
        this.max_cheat_quantity = 5;
        this.current_cheat_quantity = 0;
        this.inProcess = false;
        this.current_footstep = null;
        this.current_side = null;
        this.footstep_checkout = {
            right:'right_to_left',
            left:'left_to_right',
            right_to_left:'left_to_right',
            left_to_right:'right_to_left'
        }
    }

    onResetFootstepQuantity(){
        // this.max_cheat_quantity = 3;
        this.current_cheat_quantity = 0;
    }

    onPlayFootstepAudio(cheatProcess){
        if(!!cheatProcess){
            this.current_cheat_quantity+=1;
         this.current_side = 
                this.current_footstep === 'right_to_left'
                ? 'left'
                : 
                    this.current_footstep === 'left_to_right'
                    ? 'right'
                        : 
                            this.current_footstep === 'right'
                            ? 'right'
                            : 'left';
        }
        audio_manager.onPlay((
            !!cheatProcess
            ? this.current_footstep
            : this.current_side
        )+"_audio");
        console.log(this.current_side,this.current_footstep);
        if(this.current_cheat_quantity === this.max_cheat_quantity){
            this.inProcess = false;
            return
        }
    }

    onCheat(){

        if(!this.inProcess){
            this.inProcess = true;
        }

        const repeat_side_footstep = onRandomNumber(0,1);

        if(
            repeat_side_footstep === 1 
            && 
            this.current_footstep !== null){

            this.current_footstep === 'right_to_left'

        }

        this.current_footstep = 
            this.current_footstep === null
            ? (onRandomNumber(0,1) === 1
                ? 'right'
                : 'left'
            )
            : ((repeat_side_footstep === 1 && this.current_footstep !== 'right' && this.current_footstep !== 'left')
                ? 
                    this.current_footstep === 'right_to_left'
                    ? 'left'
                    : 'right'
                : this.footstep_checkout[this.current_footstep]
            );

        this.onPlayFootstepAudio(true);


        return

    }

}

export {
    Footstep
}