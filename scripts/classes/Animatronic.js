import { onRandomNumber } from "../functions/randomNumber.js";

class Animatronic {

    constructor(config){
        this.identifier = config.identifier;
        this.current_place = config.current_place;
        this.action_list = config.action_list;
        this.isActive = config.isActive;
        this.isMoving = config.isMoving;
        this.inJumpscareProcess = false;
        this.current_mode = config.current_mode;
        this.movement_delay = config.movement_delay;
        // this.isHuntingPlayer = config.isHuntingPlayer;
        this.jumpscare_scream_audio = config.jumpscare_scream_audio;
        this.visited_place_list = [];
        this.jumpscare_frame_list = config.jumpscare_frame_list;
        // this.next_place = config.next_place;
    }

    onResetVisitedPlaceList(){
        this.visited_place_list = [];
    }

    onCheckMode(mode,type){

        onResetVisitedPlaceList();

        const current_mode_list = {
            'default':()=>{

            },
            'hunter':()=>{
                console.log(this.visited_place_list)
                this.visited_place_list.push(place.number)
            },
            'noisy':()=>{
                
                if(type === 'action'){
                    const place_for_noisy = place.place_view_list.find((place_item)=>
                        typeof place_item.noisy_animatronic === 'number' 
                        &&
                        place_item.noisy_animatronic === this.identifier
                    )
    
                    
                    console.log(this.isMoving,!!place_for_noisy)
                    return
                }

                

            }
        }
        return current_mode_list[mode]()
    }

    onAction(place){
        
        const current_mode_list = {
            'default':()=>{

            },
            'hunter':()=>{
                console.log(this.visited_place_list)
                this.visited_place_list.push(place.number)
            },
            'noisy':()=>{
                
                const place_for_noisy = place.place_view_list.find((place_item)=>
                    typeof place_item.noisy_animatronic === 'number' 
                    &&
                    place_item.noisy_animatronic === this.identifier
                )

                
                console.log(this.isMoving,!!place_for_noisy)

            }
        }

        current_mode_list[this.current_mode]();

        const place_action = this.action_list.find((action_item)=>
            action_item.place_number === place.number
        );
        
        console.log("ativo",this.isActive)
        if(!place_action){
            return null
        }
        this.isActive = !place_action.isMovementCancelled;
        return place_action.onAction();

    }

    onChoicePlace(places){
        //0-ficar
        //1-andar
        
        let random_number = onRandomNumber(0,1);

        // if(random_number === 0){
        //     console.log(this.identifier+"escolheu ficar",this.current_place)
        //     return this.current_place
        // }
    


        random_number = onRandomNumber(0,places.length-1)
        if(this.current_mode === 'hunter' &&  !!this.visited_place_list.length && this.visited_place_list.includes(places[random_number])){
            while(this.visited_place_list.includes(places[random_number])){
                console.log("visitados",this.visited_place_list)
                random_number = onRandomNumber(0,places.length-1)
                console.log("tentativa: ",random_number)
            }

        }

     

        console.log(this.identifier+"escolheu avançar",places[random_number])
        this.current_place = places[random_number]
        return places[random_number]

    }

}

export{
    Animatronic
}