import { Flashlight } from "./Flashlight.js";
import { Jumpscare } from "./Jumpscare.js";

class Game {

    constructor(config){
        this.player_room = config.player_room;
        this.camera_monitor = config.camera_monitor;
        this.x_movement = config.x_movement;
        this.toggle_cam_system_button = config.toggle_cam_system_button;
        this.animatronic_list = config.animatronic_list;
        this.place_list = config.place_list;
        this.current_night = config.current_night;
        this.night_event_interval = null;
    }

    onLockClick(){
        document.addEventListener("pointerdown", function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, true);
    }

    onKillPlayer(animatronic){
        animatronic.isMoving = false;
        animatronic.inJumpscareProcess = true;
        if(this.night_event_interval !== null){
            clearInterval(this.night_event_interval);
        }
        this.x_movement.setIsLocked(true,true);
        const jumpscare = new Jumpscare({
            jumpscare_room_context:this.player_room.room_context,
            canvas_height:this.player_room.room_canvas.height,
            canvas_width:this.player_room.room_canvas.width,
            animatronic_identifier:animatronic.identifier,
            unloaded_frame_list:animatronic.jumpscare_frame_list,
            scream_audio:animatronic.jumpscare_scream_audio
        })
        jumpscare.onStart();
        this.player_room.onChangeDarkAmbience('0%');
        this.toggle_cam_system_button.style.display = 'none';
        if(this.camera_monitor.isOpen){
            this.camera_monitor.onToggle();
        }
    }

    onActiveAnimatronic(animatronic){

        if(animatronic.isActive){

            if(!!animatronic.isMoving){

                if(!!animatronic.isWaitingPlayer && animatronic.footstep_cheat.current_side === null){

                    console.log("esperando player")
                    animatronic.waiting_player_timeout = setTimeout(()=>{

                        console.log("espera acabou");
                        animatronic.isWaitingPlayer = false;


                    },animatronic.waiting_player_value) 
                    return
                }

                if(!!animatronic.footstep_cheat.inProcess){
                    animatronic.footstep_cheat.onCheat();
                    return
                }

            // if(animatronic.current_place === 11){

            //     return
            // }

            const prev_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === animatronic.current_place)

              if(!!prev_current_animatronic_place.hasSecurityRoomConnection)
               {
                
                    console.log("entrou aqui");

                    const current_animatronic_door = this.player_room.onFindAnimatronic(animatronic.identifier)
                    
                    console.log("current",current_animatronic_door);
                

                    if(current_animatronic_door === undefined || current_animatronic_door === null){
                        prev_current_animatronic_place.current_view = prev_current_animatronic_place.place_view_list.find((view_item=>
                            view_item.animatronic_list.length === 0
                        )).image;
                         animatronic.current_place = 0;
                         animatronic.onResetVisitedPlaceList();
                         animatronic.footstep_cheat.onResetFootstepCheatQuantity();
                        return
                    }
               }

            
            //apenas o número do local
            
            const current_animatronic_place =  animatronic.onChoicePlace(this.place_list.find((place_item)=>place_item.number === animatronic.current_place).next_place_index_list);
            
            if(current_animatronic_place === 11){
                this.player_room.playerIsDeath = true;
                this.onKillPlayer(animatronic);
                
                if(this.player_room.vision === 'external'){

                    this.toggle_cam_system_button.onclick = ()=>console.log("VOCE ESTÁ MORTO")
                    
                    return
                }
                
                return
            }
            
            const next_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === current_animatronic_place)

                if(next_current_animatronic_place.isPointOfChoice ){
                    
                    animatronic.footstep_cheat.inProcess = true;

                    return 
                    
                }

                if(next_current_animatronic_place.hasSecurityRoomConnection){

                    if(animatronic.footstep_cheat.current_side){
                       console.log("escolha predefinida",animatronic.footstep_cheat.current_side) 
                    }

                    const current_player_room_door = 
                    animatronic.footstep_cheat.current_side === 'right'
                        ? this.player_room.right_door
                        : 
                        animatronic.footstep_cheat.current_side === 'left'
                        ? this.player_room.left_door
                        :  [
                        // this.player_room.front_door,
                            this.player_room.left_door,
                            this.player_room.right_door
                        ].find((door)=>
                            door.place_location_number === next_current_animatronic_place.number
                        );

                    console.log("Porta encontrada: ",current_player_room_door)
                    current_player_room_door.onSetAnimatronicView(animatronic.identifier)

                    animatronic.isWaitingPlayer = true;

                }
             

            if(animatronic.current_mode === 'hunter'){
                if(!!next_current_animatronic_place.hasMultipleConnections && !!prev_current_animatronic_place.hasMultipleConnections){
                    animatronic.visited_place_list.push(prev_current_animatronic_place.number)
                }
            }

            const place_for_noisy = next_current_animatronic_place.place_view_list.find((place_item)=>
                typeof place_item.noisy_animatronic === 'number' 
                &&
                place_item.noisy_animatronic === animatronic.identifier
            );
            
            // if(animatronic.current_mode === 'noisy'){

            //     if(!!place_for_noisy){
            //         animatronic.isMoving = !place_for_noisy;
            //         // next_current_animatronic_place.current_view = place_for_noisy.image;
            //         next_current_animatronic_place.current_audio = place_for_noisy.audio;
            //         next_current_animatronic_place.repeat_audio = place_for_noisy.repeat_audio;
                    
            //     }
            //     console.log("moving",place_for_noisy)
            // }

            // animatronic.onAction(next_current_animatronic_place);
            if(prev_current_animatronic_place.number !== next_current_animatronic_place.number){
                prev_current_animatronic_place.onRemoveAnimatronic(animatronic);
                prev_current_animatronic_place.onSetView(false);
                next_current_animatronic_place.onSetAnimatronic(animatronic);
                next_current_animatronic_place.onSetView(((place_for_noisy) && animatronic.current_mode === 'noisy'));
               
                if(
                    this.camera_monitor.choiced_camera_info.number === prev_current_animatronic_place.number
                    ||
                    this.camera_monitor.choiced_camera_info.number === next_current_animatronic_place.number
                ){
        
                    this.camera_monitor.choiced_camera_info.image.src = "../assets/imgs/static.gif";
                    
                    setTimeout(()=>{
        
                        // this.camera_monitor.choiced_camera_info.image.src = (
                        //     this.camera_monitor.choiced_camera_info.number === prev_current_animatronic_place.number
                        //     ?  prev_current_animatronic_place.current_view
                        //     :  next_current_animatronic_place.current_view
                        // )
                        const current_place = (
                            this.camera_monitor.choiced_camera_info.number === prev_current_animatronic_place.number
                            ?  prev_current_animatronic_place
                            :  (next_current_animatronic_place)
                        )
                        
                        current_place.onSetView(((place_for_noisy) && animatronic.current_mode === 'noisy'))
                        this.camera_monitor.choiced_camera_info.image.src = (
                            !!(place_for_noisy && animatronic.current_mode === 'noisy')
                            ? place_for_noisy.image
                            : current_place.current_view
                        );
                        this.camera_monitor.choiced_camera_info.audio.src = (
                            !!(place_for_noisy && animatronic.current_mode === 'noisy')
                            ? place_for_noisy.audio
                            : current_place.current_audio
                        );
                    },200)
                }
            }
            if(this.player_room.current_door_vision !== null){
                if(this.player_room.current_door_vision.place_location_number === animatronic.current_place
                    &&
                    this.player_room.vision === 'external'
                ){
                    this.player_room.current_door_vision.onSetAnimatronicView(animatronic.identifier);
                    this.player_room.room_image.src = this.player_room.current_door_vision.vision_image;
                    this.player_room.onLoadImage();
                }
            }

            return
            }

            return
        }
    }
    
    onStart(){
        // 4 - 10 - 11
        //
        this.player_room.onDraw();
        this.player_room.onLockVision = (vision)=>{
            this.x_movement.setIsLocked(!!(
                vision === 'external'
            ),true)
        }

        this.player_room.onFlashLightCheckout = ()=>{
            this.animatronic_list[0].onClearWaitingTimeEvent();
        }

        this.night_event_interval = setInterval(()=>{
            // for(const animatronic of this.animatronic_list){
            //     setTimeout(()=>{
            //         this.onActiveAnimatronic(animatronic);
            //     },animatronic.movement_delay)
            // }

            this.onActiveAnimatronic(this.animatronic_list[0]);
        },this.current_night.event_running_interval);

        this.x_movement.onMove();

        // this.toggle_cam_system_button.addEventListener('mousemove',()=>{
           
        // })
        this.toggle_cam_system_button.addEventListener('click',()=>{

            if(this.player_room.flashlight.inUse && !this.player_room.flashlight.isCharging){
                return
            }

            if(this.player_room.vision === 'internal'){
                this.camera_monitor.onToggle();
                this.x_movement.setIsLocked(this.camera_monitor.isOpen);
                this.x_movement.onEndMove();
                return
            }
            this.player_room.onSwitchVision("../bedroom_1.jpeg","internal",'exit',this.player_room.direction)
            return
        })
        this.camera_monitor.onChangeCurrentCamera()
    }

}

export {
    Game
}