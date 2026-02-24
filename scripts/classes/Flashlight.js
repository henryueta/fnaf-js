class Flashlight {

    constructor(config){

        this.max_battery_value = 100;
        this.current_battery_value = 100;
        this.inUse = false;
        this.isCharging = false;
        this.utility_timeout = null;
        this.utility_value = 3000;
        this.batery_use_interval = null;
        this.batery_use_value = 650;  
        this.batery_container = config.battery_container
    }

    onUse(type,onProcess,onEnd){
        this.inUse = true;
        this.isCharging = !!(type === 'charge');
        this.batery_use_interval = setInterval(()=>{

            this.current_battery_value += (
                type === 'charge'
                ? 25
                : -25
            );
            if(!!onProcess){
                onProcess();
            }
            
            if(this.current_battery_value === (
                type === 'charge'
                ? 100
                : 0
            )){
                clearInterval(this.batery_use_interval);
                this.batery_use_interval = null;
                this.inUse = false;
                
                if(type === 'charge'){
                    this.isCharging = false;
                }

                if(!!onEnd){
                    onEnd();
                }
            }

        },(
            type === 'charge'
            ? this.batery_use_value+1000
            : this.batery_use_value
        ))
    }

}

export {
    Flashlight
}