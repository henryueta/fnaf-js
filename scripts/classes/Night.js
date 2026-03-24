import { audio_manager } from "../audio-manager.js";
import { onExitPage } from "../functions/navigate.js";

class Night {

    constructor(config){
        this.number = config.number;
        this.running_event_value = config.running_event_value;
        this.isCompleted = config.isCompleted;
        this.event_running_timeout = null;
        this.playerIsDeath = false;
        this.game_won_container = config.game_won_container;
        this.game_over_container = config.game_over_container;
        this.ending_slider = config.ending_slider;
    }

    onReturnToMenu(){
        onExitPage("../../index.html");
    }

    onCloseEndingSlider(text_list,onClose){
        this.ending_slider.text_list = text_list;
        this.ending_slider.onCancel = ()=>{
            onClose();
            this.ending_slider.current_slider_text_container.parentElement.parentElement.classList.add("slider-close");
            return
        }
        this.ending_slider.onEnd = ()=>{
            onClose();
            this.ending_slider.current_slider_text_container.parentElement.parentElement.classList.add("slider-close");
            return
        }
        return
    }

    onNightWin(isPrimeMode,onWin){
        this.isCompleted = true;
        audio_manager.onPlayJustOneAudio('clock');
        this.game_won_container.style.display = 'flex';
        this.game_won_container.classList.add("end-enabled");
        this.ending_slider.enableCancelButton = true;
        
        this.onCloseEndingSlider((
            isPrimeMode
            ? [
                "Nada para ver aqui"
            ]
            : [
            "Após uma longa noite de puro terror,Tolinho finalmente termina a cura para Bistecone.",
            "O gato aplica a substância em seu pai e o magrelone retorna em seu estado original.",
            "TRUE ENDING"
        ]
        ),onWin)
        setTimeout(()=>{
            if(!!onWin){
                this.game_won_container.classList.remove("end-enabled");
                this.game_won_container.classList.add("final-screen");
                audio_manager.onPlay("true_ending",null,1,true);
                this.ending_slider.onViewStoryText();
                this.ending_slider.enableClick = true;

                this.game_won_container.addEventListener("click",()=>{
                    this.onReturnToMenu();
                    return
                },{once:true})
               
                }
        },12000)
    }
    onNightOver(onOver,reason,isEnding){
        
        this.game_over_container.style.display = 'flex';
        this.onCloseEndingSlider((
            !!isEnding
            ? ["Game Over: "+reason,
                "Tolinho não conseguiu terminar a receita da cura para Bistecone.",
                "BAD ENDING"
            ]
            : ["Game Over: "+reason]
        ),onOver);
        setTimeout(()=>{

            if(isEnding){
                audio_manager.onPlay("bad_ending",null,1,true);
            }

            this.ending_slider.onViewStoryText();
            this.ending_slider.enableClick = true;
        },1800)
        this.game_over_container.addEventListener('click',()=>{
            this.onReturnToMenu();
            return
        },{once:true})

    }


}

export {
    Night
}