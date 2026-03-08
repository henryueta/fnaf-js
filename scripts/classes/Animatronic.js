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

    onChoicePlace(places,played_room,playerFocus){
        console.log("places",places)
        
        const security_room = places.includes(10);

        let choice_decision = (
            playerFocus
            ? onRandomNumber(0,1)
            :played_room !== null && played_room !== undefined
                ? onRandomNumber(0,6)
                : onRandomNumber(0,1)
        );

        if(!!security_room && choice_decision < 1){
            console.log("escolheu entrar")
            this.current_place = 10;
            return this.current_place;
        }

        const audio_room_index = places.findIndex((room_item_number)=>
            room_item_number > 11 
        );
        
        if(played_room !== null && played_room !== undefined && places.includes(played_room)){

            choice_decision = (
                playerFocus
                ? onRandomNumber(0,1)
                : this.current_place !== played_room
                    ? onRandomNumber(-5,1)
                    : onRandomNumber(0,3)
            );
            
            if(choice_decision < 1){
                 console.log(this.identifier+"escolheu audio",places[audio_room_index],places)
                this.current_place = played_room;
                return this.current_place
            }

        }
        // choice_decision = onRandomNumber(-5,1);

        // if((choice_decision === 1 && places[audio_room_index] !== undefined)){
        //     console.log(this.identifier+"escolheu audio",places[audio_room_index])
        //     this.current_place = places[audio_room_index]
        //     return this.current_place
        // }

        const no_audio_room_places = places.filter((_,place_index)=>place_index !== audio_room_index)
        let random_number = onRandomNumber(0,1);

        random_number = onRandomNumber(0,no_audio_room_places.length-1)
        if(this.current_mode === 'hunter' &&  !!this.visited_place_list.length && this.visited_place_list.includes(no_audio_room_places[random_number])){
            while(this.visited_place_list.includes(no_audio_room_places[random_number])){
                console.log("visitados",this.visited_place_list)
                random_number = onRandomNumber(0,no_audio_room_places.length-1)
                console.log("tentativa: ",random_number)
            }
        }

        console.log(this.identifier+"escolheu outro lugar",no_audio_room_places[random_number])
        this.current_place = no_audio_room_places[random_number]
        return this.current_place

    }

}

export{
    Animatronic
}