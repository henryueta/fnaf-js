
class Clock{

    constructor(config){

        this.timer_interval = null;
        this.timer_value = 5000;
        this.current_time = 0;
        this.time_container = config.time_container;

    }

    onUpdateTime(onEnd){

      

        if(
            this.timer_interval !== null
            &&
            this.current_time < 6
        ){
            this.current_time+=1;
            this.time_container.textContent = this.current_time;
              if(this.current_time === 6){
                clearInterval(this.timer_interval);
                this.timer_interval = null;
                if(onEnd){
                    onEnd();
                }
            }
            return
        }

    }

}

export {
    Clock
}