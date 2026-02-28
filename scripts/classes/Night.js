import { audio_manager } from "../audio-manager.js";

class Night {

    constructor(config){

        this.number = config.number;
        this.running_event_value = config.running_event_value;
        this.isCompleted = config.isCompleted;
        this.event_running_interval = null;
        this.playerIsDeath = false;
        this.end_of_night_container = config.end_of_night_container;
    }

    onNightWin(){
        audio_manager.onPlay('clock')
        this.end_of_night_container.style.display = 'flex';
        this.end_of_night_container.classList.add("end-enabled");

    }
    onNightOver(){

    }


}

export {
    Night
}