import { onRandomNumber } from "../functions/randomNumber.js";

class Animatronic {

    constructor(config){
        this.identifier = config.identifier;
        this.current_place = config.current_place;
        this.isActive = config.isActive;
        // this.next_place = config.next_place;
    }

    onChoicePlace(places){
        //0-ficar
        //1-andar
        
        let random_number = onRandomNumber(0,1);

        if(random_number === 0){
            console.log(this.identifier+"escolheu ficar",this.current_place)
            return this.current_place
        }

        random_number = onRandomNumber(0,places.length-1)
        console.log(this.identifier+"escolheu avançar",places[random_number])
        this.current_place = places[random_number]
        return places[random_number]

    }

}

export{
    Animatronic
}