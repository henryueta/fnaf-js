import { Jumpscare } from "./Jumpscare.js";
import { Virus } from "./Virus.js";

class Game {

    constructor(config){
        this.player_room = config.player_room;
        this.camera_monitor = config.camera_monitor;
        this.x_moviment = config.x_moviment;
        this.toggle_cam_system_button = config.toggle_cam_system_button;
        this.animatronic_list = config.animatronic_list;
        this.virus_provider = (()=>{

            const animatronic_with_virus = this.animatronic_list.find((animatronic_item)=>
            animatronic_item.current_mode === 'virus'
            )

            if(!animatronic_with_virus){
                throw new Error("Nenhum animatronic com vírus encontrado")
            }

            return new Virus({
                identifier:animatronic_with_virus.identifier
            })

        })()
        this.jumpscare = null;
        this.place_list = config.place_list;
        this.current_night = config.current_night;
        this.night_event_interval = null;
    }

    onActiveAnimatronic(animatronic){

        if(animatronic.isActive){

            if(animatronic.current_mode === 'virus'){

                if(this.virus_provider.resolve_timeout_value !== null){
                    console.log("Em espera")
                    return

                }

                this.virus_provider.resolve_timeout_value = setTimeout(()=>{

                    const virus_current_place = animatronic.onChoicePlace([0])

                    const next_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === virus_current_place)

                    const current_place = this.place_list.find((place_item)=>place_item.number === virus_current_place)

                    if(this.camera_monitor.choiced_camera_info.number === virus_current_place){
                        this.camera_monitor.choiced_camera_info.image.src = this.virus_provider.virus_image_view;
                    }

                    current_place.current_view = this.virus_provider.virus_image_view;

            //         const place_for_noisy = next_current_animatronic_place.place_view_list.find((place_item)=>
            //         typeof place_item.noisy_animatronic === 'number' 
            //         &&
            //         place_item.noisy_animatronic === animatronic.identifier
            // )

                    // this.camera_monitor.choiced_camera_info.image.src = (
                    //         !!(place_for_noisy && animatronic.current_mode === 'virus')
                    //         ? place_for_noisy.image
                    //         : current_place.current_view
                    //     );

                    console.log("Vírus detectado! 10 segundos")


                    setTimeout(()=>{

                        if(this.virus_provider.isDestroyed){
                            console.log("Nenhuma ação maliciosa,fim")
                            return
                        }

                        console.log("Ação maliciosa começando . . .")

                    },10000)

                },Math.floor(Math.random()*25000)+20000)

                return

            }

            if(!!animatronic.isMoving){

            if(animatronic.current_place === 11){
                animatronic.isMoving = false;
                animatronic.inJumpscareProcess = true;

                if(this.night_event_interval !== null){
                    clearInterval(this.night_event_interval);
                }

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
            
            if(current_animatronic_place === 11){
                this.player_room.playerIsDeath = true;
                
                if(this.player_room.vision === 'external'){

                    this.toggle_cam_system_button.onclick = ()=>console.log("VOCE ESTÁ MORTO")

                    return
                }

                return
            }

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

        this.night_event_interval = setInterval(()=>{
            // for(const animatronic of this.animatronic_list){
            //     setTimeout(()=>{
            //         this.onActiveAnimatronic(animatronic);
            //     },animatronic.movement_delay)
            // }

            // this.onActiveAnimatronic(this.animatronic_list[0]);
        },this.current_night.event_running_interval);

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