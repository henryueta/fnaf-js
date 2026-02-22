
class Virus {

    constructor(config){

        this.resolve_timeout_value =  null;
        this.isDestroyed = false;
        this.identifier = config.identifier;
        this.virus_image_view = "../assets/imgs/static.gif";

    }

    onDestroy(){

    }

}
export {
    Virus
}