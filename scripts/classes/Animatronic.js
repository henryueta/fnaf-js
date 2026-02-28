import { onRandomNumber } from "../functions/randomNumber.js";
import { Footstep } from "./Footstep.js";

class Animatronic {

    constructor(config){
        this.identifier = config.identifier;
        this.current_place = config.current_place;
        this.action_list = config.action_list;
        this.isActive = config.isActive;
        this.isMoving = config.isMoving;
        this.footstep_cheat = new Footstep();
        this.inJumpscareProcess = false;
        this.current_mode = config.current_mode;
        this.movement_delay = config.movement_delay;
        this.isWaitingPlayer = false;
        this.usingGenerator = false;
        this.waiting_player_timeout = null;
        this.waiting_player_value = config.waiting_player_value;
        // this.isHuntingPlayer = config.isHuntingPlayer;
        this.jumpscare_scream_audio = config.jumpscare_scream_audio;
        this.running_away_audio = config.running_away_audio;
        this.visited_place_list = [];
        this.jumpscare_frame_list = config.jumpscare_frame_list;
        // this.next_place = config.next_place;
    }

    onResetVisitedPlaceList(){
        this.visited_place_list = [];
    }
    
    onClearWaitingTimeEvent(){
        console.log("timeout",this.waiting_player_timeout)
        if(this.waiting_player_timeout !== null){
            clearTimeout(this.waiting_player_timeout);
            this.waiting_player_timeout = null;
        }
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
        
        if(!place_action){
            return null
        }
        this.isActive = !place_action.isMovementCancelled;
        return place_action.onAction();

    }

    onChoicePlace(places){

        let random_number = onRandomNumber(0,1);
        
        const generator_room_index = places.findIndex((room_item_number)=>
            room_item_number > 11 
        );
        // const choice_decision = onRandomNumber(-3,1);

        // if(choice_decision === 1 && places[generator_room_index] !== undefined){
        //     console.log(this.identifier+"escolheu gerador",places[generator_room_index])
        //     this.current_place = places[generator_room_index]
        //     return places[generator_room_index]
        // }

        const no_generator_room_places = places.filter((_,place_index)=>place_index !== generator_room_index)

        random_number = onRandomNumber(0,no_generator_room_places.length-1)
        if(this.current_mode === 'hunter' &&  !!this.visited_place_list.length && this.visited_place_list.includes(no_generator_room_places[random_number])){
            while(this.visited_place_list.includes(no_generator_room_places[random_number])){
                console.log("visitados",this.visited_place_list)
                random_number = onRandomNumber(0,no_generator_room_places.length-1)
                console.log("tentativa: ",random_number)
            }
        }

        console.log(this.identifier+"escolheu outro lugar",no_generator_room_places[random_number])
        this.current_place = no_generator_room_places[random_number]
        return no_generator_room_places[random_number]

    }

}

export{
    Animatronic
}