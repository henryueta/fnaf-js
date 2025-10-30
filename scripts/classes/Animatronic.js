class Animatronic {

    constructor(config){
        this.current_place = config.current_place;
        // this.next_place = config.next_place;
    }

    onChoicePlace(places){

        const random_number = 0;
        this.current_place = places[random_number]
        return places[random_number]

    }

}

export{
    Animatronic
}