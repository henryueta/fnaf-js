
class Clock{

    constructor(config){

        this.timer_interval = null;
        this.timer_value = 10000;
        this.current_time = 0;
        this.timer_container = config.timer_container;

    }

    onUpdateTime(onEnd){

        if(this.current_time === 6){
            clearInterval(this.timer_interval);
            this.timer_interval = null;
            if(onEnd){
                onEnd();
            }
        }

        if(
            this.timer_interval !== null
            &&
            this.current_time < 6
        ){
            this.current_time+=1;
            return
        }

    }

}

export {
    Clock
}