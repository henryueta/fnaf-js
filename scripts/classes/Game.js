import { Jumpscare } from "./Jumpscare.js";

class Game {

    constructor(config){
        this.player_room = config.player_room;
        this.camera_monitor = config.camera_monitor;
        this.x_moviment = config.x_moviment;
        this.toggle_cam_system_button = config.toggle_cam_system_button;
        this.animatronic_list = config.animatronic_list;
        this.jumpscare = null;
        this.place_list = config.place_list;
        this.current_night = config.current_night;
    }

    onActiveAnimatronic(animatronic){

        if(animatronic.isActive){
            if(!!animatronic.isMoving){

            if(animatronic.current_place === 11){
                this.player_room.playerIsDeath = true;
                animatronic.isMoving = false;
                animatronic.inJumpscareProcess = true;

                this.jumpscare = new Jumpscare({
                    jumpscare_room_context:this.player_room.room_context,
                    canvas_height:this.player_room.room_canvas.height,
                    canvas_width:this.player_room.room_canvas.width,
                    animatronic_identifier:animatronic.identifier,
                    unloaded_frame_list:animatronic.jumpscare_frame_list,
                    scream_audio:animatronic.jumpscare_scream_audio
                })

                this.jumpscare.onStart();
                this.player_room.onChangeDarkAmbience('0%');
                this.toggle_cam_system_button.style.display = 'none';

                if(this.camera_monitor.isOpen){
                    this.camera_monitor.onToggle();
                }

                return
            }

            const prev_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === animatronic.current_place)

              if(!!prev_current_animatronic_place.hasSecurityRoomConnection)
               {

                    console.log("entrou aqui")

                    const current_animatronic_door = this.player_room.onFindAnimatronic(animatronic.identifier)
                    
                    console.log("current",current_animatronic_door)
                
                    if(current_animatronic_door === undefined || current_animatronic_door === null){
                         animatronic.current_place = 0;
                         animatronic.onResetVisitedPlaceList();
                        return
                    }
                   
               }

            
            //apenas o número do local
            
            const current_animatronic_place =  animatronic.onChoicePlace(this.place_list.find((place_item)=>place_item.number === animatronic.current_place).next_place_index_list);
            
            

            const next_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === current_animatronic_place)
            
                if(next_current_animatronic_place.hasSecurityRoomConnection){

                    const current_player_room_door = [
                        this.player_room.front_door,
                        this.player_room.left_door,
                        this.player_room.right_door
                    ].find((door)=>
                        door.place_location_number === next_current_animatronic_place.number
                    )

                    console.log("Porta encontrada: ",current_player_room_door)
                    current_player_room_door.onSetAnimatronicView(animatronic.identifier)

                }


             

            if(animatronic.current_mode === 'hunter'){
                if(!!next_current_animatronic_place.hasMultipleConnections && !!prev_current_animatronic_place.hasMultipleConnections){
                    console.warn("push",prev_current_animatronic_place.number)
                    
                    animatronic.visited_place_list.push(prev_current_animatronic_place.number)
                }
            }

            const place_for_noisy = next_current_animatronic_place.place_view_list.find((place_item)=>
                typeof place_item.noisy_animatronic === 'number' 
                &&
                place_item.noisy_animatronic === animatronic.identifier
            )
            
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
                    this.player_room.flashlight_number_clicks = 0;
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
            this.x_moviment.setIsLocked(!!(
                vision === 'external'
            ),true)
        }
        setInterval(()=>{
            // for(const animatronic of this.animatronic_list){
            //     setTimeout(()=>{
            //         this.onActiveAnimatronic(animatronic);
            //     },animatronic.movement_delay)
            // }

            // this.onActiveAnimatronic(this.animatronic_list[0]);

        },this.current_night.event_running_interval)

        this.x_moviment.onMove();

        // this.toggle_cam_system_button.addEventListener('mousemove',()=>{
           
        // })
        this.toggle_cam_system_button.addEventListener('click',()=>{

            if(this.player_room.vision === 'internal'){
                this.camera_monitor.onToggle();
                this.x_moviment.setIsLocked(this.camera_monitor.isOpen);
                this.x_moviment.onEndMove();
                return
            }
            this.player_room.onSwitchVision("../teste5.jpeg","internal",'exit',this.player_room.direction)
            return
        })
        this.camera_monitor.onChangeCurrentCamera()
    }

}

export {
    Game
}