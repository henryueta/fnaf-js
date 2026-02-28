
class Battery {

    constructor(config){
        this.isCharging = false;
        this.current_battery_value = 100;
        this.batery_use_interval = null;
        this.battery_use_value = 650;  
        this.battery_container = config.percent_container;
        this.percent_container = Object.fromEntries(
        Array.from(config.percent_container.children).map(percent_item => [
            percent_item.id,
            percent_item
        ])
        );
    }

}

export {
    Battery
}