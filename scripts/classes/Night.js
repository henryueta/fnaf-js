import { audio_manager } from "../audio-manager.js";

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
        document.body.classList.remove("loaded");
        setTimeout(()=>{
        window.location.replace("../../index.html");
        },3000)
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

    onNightWin(onWin){
        audio_manager.onPlayJustOneAudio('clock');
        this.game_won_container.style.display = 'flex';
        this.game_won_container.classList.add("end-enabled");
        this.ending_slider.enableCancelButton = true;
        this.onCloseEndingSlider([
            "Parabens, você venceu"
        ],onWin)
        setTimeout(()=>{
            if(!!onWin){
                this.game_won_container.classList.remove("end-enabled");
                this.game_won_container.classList.add("final-screen")
                this.ending_slider.onViewStoryText();
                this.ending_slider.enableClick = true;

                this.game_won_container.addEventListener("click",()=>{
                    this.onReturnToMenu();
                    return
                },{once:true})
               
                }
        },12000)
    }
    onNightOver(onOver,reason){
        
        this.game_over_container.style.display = 'flex';
        this.onCloseEndingSlider([
            "Game Over: "+reason
        ],onOver);
        setTimeout(()=>{
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