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
        this.percent_container = Object.fromEntries(
        Array.from(config.percent_container.children).map(percent_item => [
            percent_item.id,
            percent_item
        ])
        );
    }

    onUse(type,onProcess,onEnd){
        this.inUse = true;
        this.isCharging = !!(type === 'charge');
        this.batery_use_interval = setInterval(()=>{

            if(type !== 'charge'){
                this.percent_container['percent-'+this.current_battery_value].style.opacity = '0%';
            }

            this.current_battery_value += (
                type === 'charge'
                ? 25
                : -25
            );

            if(type === 'charge'){
                this.percent_container['percent-'+this.current_battery_value].style.opacity = '100%';
            }

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