class Flashlight {

    constructor(config){

        
        this.inUse = false;
        this.enableProcess = true;
        this.enableCharging = true;
        this.utility_timeout = null;
        this.utility_value = 3000;
        this.battery = config.battery;
    }

    onUse(type,onProcess,onEnd){

        if(!this.enableProcess){
            return
        }

        this.inUse = true;
        this.battery.isCharging = !!(type === 'charge');
       
        this.battery.batery_use_interval = setInterval(()=>{    

            if(type !== 'charge'){
                this.battery.percent_container['percent-'+this.battery.current_battery_value].style.opacity = '0%';
            }

            this.battery.current_battery_value += (
                type === 'charge'
                ? 25
                : -25
            );

            if(type === 'charge'){
                console.log(this.battery.current_battery_value)
                console.log(this.battery.percent_container['percent-'+this.battery.current_battery_value])
                this.battery.percent_container['percent-'+this.battery.current_battery_value].style.opacity = '100%';
            }

            if(!!onProcess){
                onProcess();
            }
        
            if(this.battery.current_battery_value === (
                type === 'charge'
                ? 100
                : 25
            )){
                clearInterval(this.battery.batery_use_interval);
                console.log("limpo")
                this.battery.batery_use_interval = null;
                this.inUse = false;
                
                if(type === 'charge'){
                    this.battery.isCharging = false;
                }

                if(!!onEnd){
                    onEnd();
                }
            }

            // if(this.battery.current_battery_value === 0){
            //     this.battery.battery_container.style.borderColor = "red";
            //     return
            // }
            // this.battery.battery_container.style.borderColor = "white";
            return
        },(
            type === 'charge'
            ? this.battery.battery_use_value+1000
            : this.battery.battery_use_value
        ))
    }

}

export {
    Flashlight
}