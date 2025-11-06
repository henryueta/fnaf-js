import { onRandomNumber } from "../functions/randomNumber.js";

class Animatronic {

    constructor(config){
        this.identifier = config.identifier;
        this.current_place = config.current_place;
        this.action_list = config.action_list;
        this.isActive = config.isActive;

        // this.next_place = config.next_place;
    }

    onAction(place){
        console.log(place)
        const place_action = this.action_list.find((action_item)=>
            action_item.place_number === place.number
        );
        if(!place_action){
            console.log("lugar sem ação")
            return null
        }
        console.log("lugar com ação")
        return place_action.onAction();

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