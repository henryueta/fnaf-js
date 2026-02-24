
class Night {

    constructor(config){

        this.number = config.number;
        this.running_event_value = config.running_event_value;
        this.isCompleted = config.isCompleted;
        this.event_running_interval = null;
        this.playerIsDeath = false;

    }

}

export {
    Night
}