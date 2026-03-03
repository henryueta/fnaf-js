import { audio_manager } from "../audio-manager.js";

class Night {

    constructor(config){
        this.number = config.number;
        this.running_event_value = config.running_event_value;
        this.isCompleted = config.isCompleted;
        this.event_running_interval = null;
        this.playerIsDeath = false;
        this.game_won_container = config.game_won_container;
        this.game_over_container = config.game_over_container;
    }

    onNightWin(){
        audio_manager.onPlay('clock')
        this.game_won_container.style.display = 'flex';
        this.game_won_container.classList.add("end-enabled");

    }
    onNightOver(){
        
        this.game_over_container.style.display = 'flex';
        
    }


}

export {
    Night
}