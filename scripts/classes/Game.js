import { audio_manager } from "../audio-manager.js";
import { onRandomNumber } from "../functions/randomNumber.js";
import { Jumpscare } from "./Jumpscare.js";

class Game {

    constructor(config){
        this.player = config.player;
        this.clock = config.clock;
        this.player_room = config.player_room;
        this.player_battery = config.player_battery;
        this.player_room.flashlight.battery = config.player_battery;
        this.camera_monitor = config.camera_monitor;
        this.task_monitor = config.task_monitor;
        this.x_movement = config.x_movement;
        this.toggle_cam_system_button = config.toggle_cam_system_button;
        this.toggle_task_system_button = config.toggle_task_system_button;
        this.animatronic_list = config.animatronic_list;
        this.place_list = config.place_list;
        this.current_night = config.current_night;

    }

    onCheckDisplay(){
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobileByUA = /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
        const isMobileByWidth = window.innerWidth <= 768;
        this.player.screen_display = (isMobileByUA || isMobileByWidth) ? "MOBILE" : "PC";
        return this.player.screen_display;
    }

    onClearNightEvent(){
        if(this.current_night.event_running_timeout !== null){
            clearTimeout(this.current_night.event_running_timeout);
        }
        if(this.clock.timer_interval !== null){
            clearInterval(this.clock.timer_interval);
        }
        if(this.player_room.flashlight.battery.batery_use_interval !== null){
            clearInterval(this.player_room.flashlight.battery.batery_use_interval);
        }
    }

    onKillPlayer(animatronic){
        this.player_room.dark_screen.style.zIndex = '0';
        animatronic.isMoving = false;
        animatronic.inJumpscareProcess = true;
        this.current_night.playerIsDeath = true;
        this.player_room.clickIsDisabled = true;
        this.onClearNightEvent();
        const jumpscare = new Jumpscare({
            jumpscare_room_context:this.player_room.room_context,
            canvas_height:this.player_room.room_canvas.height,
            canvas_width:this.player_room.room_canvas.width,
            animatronic_identifier:animatronic.identifier,
            unloaded_frame_list:animatronic.jumpscare_frame_list,
            scream_audio:animatronic.jumpscare_scream_audio
        });
        this.x_movement.setIsLocked(true,true);
        jumpscare.onStart(()=>{
            this.current_night.onNightOver();
            return
        });
        this.player_room.onChangeDarkAmbience(true);
        this.toggle_cam_system_button.style.display = 'none';
        if(this.camera_monitor.isOpen){
            this.camera_monitor.onToggle();
        }
    }

    onUpdatePlayerVision(prev_current_animatronic_place,next_current_animatronic_place){
        if(
        this.camera_monitor.choiced_camera_info.number === prev_current_animatronic_place.number
        ||
        this.camera_monitor.choiced_camera_info.number === next_current_animatronic_place.number
        ){
            this.camera_monitor.choiced_camera_info.image = this.camera_monitor.loading_image;
            this.camera_monitor.onLoadView(true);
            setTimeout(()=>{
                const current_place = (
                    this.camera_monitor.choiced_camera_info.number === prev_current_animatronic_place.number
                    ?  prev_current_animatronic_place
                    :  (next_current_animatronic_place)
                )
                current_place.onSetView()
                console.log("VIEW ",current_place.current_view)
                this.camera_monitor.choiced_camera_info.image = ( current_place.current_view);
                this.camera_monitor.choiced_camera_info.audio = ( current_place.current_audio);
                this.camera_monitor.onLoadView(false);
            },200)
        }
    }

    onActiveAnimatronic(animatronic){

        if(animatronic.isActive){

            if(!!animatronic.isMoving){
                if(
                    !!animatronic.isWaitingPlayer 
                    && 
                    animatronic.waiting_player_timeout === null
                    ){
                    console.log("esperando player")
                    animatronic.waiting_player_timeout = setTimeout(()=>{
                        console.log("espera acabou");
                        animatronic.isWaitingPlayer = false;
                        animatronic.waiting_player_timeout = null;
                        this.onKillPlayer(animatronic)
                    },animatronic.waiting_player_value); 
                    return
                }
                if(!!animatronic.footstep_cheat.inCheatProcess
                    &&
                    animatronic.footstep_cheat.max_cheat_quantity !== null
                    &&
                    animatronic.footstep_cheat.current_cheat_quantity !== animatronic.footstep_cheat.max_cheat_quantity
                ){
                    animatronic.footstep_cheat.onCheat(()=>{
                        this.onActiveAnimatronic(animatronic);
                    });
                    return
                }

            // if(animatronic.current_place === 11){

            //     return
            // }

                if(animatronic.waiting_player_timeout !== null){
                    return
                }

            const prev_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === animatronic.current_place)

              if(!!prev_current_animatronic_place.hasSecurityRoomConnection)
               {
                
                    console.log("entrou aqui");

                    const current_animatronic_door = this.player_room.onFindAnimatronic(animatronic.identifier)
                    
                    console.log("current",current_animatronic_door);
                

                    if(current_animatronic_door === undefined || current_animatronic_door === null){
                        this.isWaitingPlayer = false;
                        prev_current_animatronic_place.current_view = prev_current_animatronic_place.place_view_list.find((view_item=>
                            view_item.animatronic_list.length === 0
                        )).image;

                        // if(this.clock.current_time >= 4){
                        //     console.log("Vai continuar");
                        //     this.current_night.running_event_value = 2300;
                        //     animatronic.current_place = 10;
                        //     animatronic.footstep_cheat.onResetFootstepQuantity();
                        //     animatronic.footstep_cheat.onSetMaxCheatQuantity();
                        //     return
                        // }

                         if(!animatronic.footstep_cheat.inCheatProcess
                            ||
                            (!!animatronic.footstep_cheat.inCheatProcess
                                &&
                                onRandomNumber(0,1) === 0
                            )
                         ){
                            // this.camera_monitor.onGenerateGeneratorRoomList();
                            console.log("escolheu recomeçar no início");
                            audio_manager.onPlay("knock");
                            animatronic.current_place = 0;
                            animatronic.onResetVisitedPlaceList();
                            animatronic.footstep_cheat.onResetFootstepQuantity(); 
                            this.place_list[0].onSetAnimatronic(animatronic);
                            this.place_list[0].onSetView();
                            return
                         }
                         console.log("escolheu continuar")
                         animatronic.current_place = 10;
                         animatronic.footstep_cheat.onResetFootstepQuantity();
                         animatronic.footstep_cheat.onSetMaxCheatQuantity();
                        return
                    }
               }

            
            //apenas o número do local


            const locked_place = this.place_list.filter((place_item)=>
            {
                return !!place_item.isLocked
            }
            ).map((place_item)=>place_item.number);


            const next_place_list = this.place_list.find((place_item)=>
                place_item.number === animatronic.current_place
            ).next_place_index_list;

            const current_animatronic_place =  animatronic.onChoicePlace(
                (
                    (!!locked_place.length)
                    ? next_place_list.filter((place_number)=>!locked_place.includes(place_number))
                    : next_place_list
                ),
                this.camera_monitor.current_played_room
            ); 

            if(current_animatronic_place === 11){
                this.onKillPlayer(animatronic);
                
                if(this.player_room.vision === 'external'){

                    this.toggle_cam_system_button.onclick = ()=>console.log("VOCE ESTÁ MORTO");
                    
                    return
                }
                
                return
            }
            
            const next_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === current_animatronic_place)
            
                // if(next_current_animatronic_place.isPointOfChoice && this.clock.current_time >= 1 ){
                //     animatronic.footstep_cheat.onSetMaxCheatQuantity();
                //     animatronic.footstep_cheat.inCheatProcess = true; 
                // }

                if(next_current_animatronic_place.hasSecurityRoomConnection && !next_current_animatronic_place.isPointOfChoice){

                    

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
                        console.log("side",animatronic.footstep_cheat.current_side)
                        if(animatronic.footstep_cheat.current_side === null){
                            animatronic.footstep_cheat.current_side = 
                            current_player_room_door.place_location_number === this.player_room.right_door.place_location_number
                            ? 'right'
                            : 'left';
                            animatronic.footstep_cheat.onPlayFootstepAudio(false)
                        }
                        

                    console.log("Porta encontrada: ",current_player_room_door);
                    current_player_room_door.onSetAnimatronicView(animatronic.identifier,'common')
                    if(this.player_room.current_door_vision !== null){
                        this.player_room.onUpdatePlayerView();
                        console.log("dentro da porta");
                    }

                    animatronic.isWaitingPlayer = true;

                }
            if(prev_current_animatronic_place.number !== next_current_animatronic_place.number){
                prev_current_animatronic_place.onRemoveAnimatronic(animatronic);
                prev_current_animatronic_place.onSetView(false);
                next_current_animatronic_place.onSetAnimatronic(animatronic);
                next_current_animatronic_place.onSetView(false);
               
                this.onUpdatePlayerVision(prev_current_animatronic_place,next_current_animatronic_place);
            }

            if(this.camera_monitor.current_played_room !== null && !next_current_animatronic_place.hasPowerGenerator){
                 const current_choiced_camera = this.camera_monitor.onFindChoiceCamera()
                current_choiced_camera.isAudioPlayed = false;
                this.camera_monitor.current_played_room = null;
                this.camera_monitor.onChangePlayButtonView()
            }

             if(!!next_current_animatronic_place.hasPowerGenerator){

                const current_choiced_camera = this.camera_monitor.onFindChoiceCamera()
                current_choiced_camera.isAudioPlayed = false;
                this.camera_monitor.current_played_room = null;
                console.log("playted",current_choiced_camera.isAudioPlayed)
                this.camera_monitor.action_button_list.place_lock_switch.textContent = ("Play Audio")
                animatronic.visited_place_list = animatronic.visited_place_list.filter((place_item_number)=>
                    place_item_number !== next_current_animatronic_place.next_place_index_list[0]
                )
                //  setTimeout(()=>{
                //     prev_current_animatronic_place.onRemoveAnimatronic(animatronic);
                //     prev_current_animatronic_place.onSetView(false);
                //     this.onUpdatePlayerVision(prev_current_animatronic_place,next_current_animatronic_place);
                //     audio_manager.onPlay("vent_walk");
                //      setTimeout(()=>{
                //         animatronic.usingGenerator = false;
                //         this.onStartNightInterval();
                //     },5500);
                //  },5000)

                return  

            }
           
            if(this.player_room.current_door_vision !== null){
                if(this.player_room.current_door_vision.place_location_number === animatronic.current_place
                    &&
                    this.player_room.vision === 'external'
                ){
                    this.player_room.current_door_vision.onSetAnimatronicView(animatronic.identifier,'common');
                    this.player_room.onUpdatePlayerView();
                }
            }

             if(animatronic.visited_place_list.length < onRandomNumber(1,4)){
                animatronic.visited_place_list.push(prev_current_animatronic_place.number);

                return
             }

             animatronic.visited_place_list = [];
            return
            }

            return
        }
    }
    
    onStartNightInterval(){
        if(this.animatronic_list[0].usingGenerator){
            return
        }

        console.log("é maior",this.clock.current_time < 2)
        this.current_night.running_event_value = (
            this.clock.current_time < 2
            ? (
                (this.player_room.left_door.current_animatronic !== null || this.player_room.right_door.current_animatronic !== null)
                ? 5000
                : onRandomNumber(4000,15000)
            )
            : (
                (this.player_room.left_door.current_animatronic !== null || this.player_room.right_door.current_animatronic !== null)
                ? 2500
                : 3000
            )
        );
        this.onActiveAnimatronic(this.animatronic_list[0]);
        console.log("executado",this.current_night.running_event_value);
        this.current_night.event_running_timeout = setTimeout(()=>this.onStartNightInterval(),this.current_night.running_event_value)
    }

    onStartNightEvent(){
        console.log("VALOR ATUAL: ",this.current_night.running_event_value);

        setTimeout(()=>{
            this.onStartNightInterval();
        },onRandomNumber(2000,5000))

        this.clock.timer_interval = setInterval(()=>{

            this.clock.onUpdateTime(()=>{
                this.onClearNightEvent();
                this.current_night.onNightWin();

            });

        },this.clock.timer_value);
    }

    onStart(){
        // 4 - 10 - 11
        //
        this.onCheckDisplay();
        this.player_room.onDraw();
        this.player_room.onLockVision = (vision)=>{
            this.x_movement.setIsLocked(!!(
                vision === 'external'
            ),true)
        }

        this.player_room.onFlashLightCheckout = ()=>{

            if(this.player_room.current_door_vision.current_animatronic === null){
                return
            }
            console.log("aqui")
            this.animatronic_list[0].onClearWaitingTimeEvent();
        }

        this.player_room.onFlashLightProcess = ()=>{

            if(this.player_room.current_door_vision.current_animatronic === null){
                return
            }

            if(this.player_room.flashlight.battery.current_battery_value === 50){
                this.player_room.current_door_vision.onSetAnimatronicView(0,'transition');
                this.player_room.onUpdatePlayerView();
            }   
            if(!this.animatronic_list[0].footstep_cheat.inCheatProcess){
                this.animatronic_list[0].footstep_cheat.current_side = null;
            }
        }   

        this.player_room.onFlashLightEnd = ()=>{

            if(this.player_room.current_door_vision.current_animatronic === null){
                return
            }
            audio_manager.onPlay(this.animatronic_list[0].running_away_audio);
            this.animatronic_list[0].isWaitingPlayer = false;

        }

        this.player_room.onChangeVisionCheckout = ()=>{
            if(this.player_room.vision === 'internal'){
                this.toggle_task_system_button.style.display = 'none';
                return
            }
                this.toggle_task_system_button.style.display = 'block';
            return
        }

        this.camera_monitor.onLockCheckout = ()=>{
            // if(this.player_room.flashlight.inUse){
            //     this.camera_monitor.activeLock = false;
            //     return
            // }
            // this.camera_monitor.activeLock = true;
            // return
        }

        this.camera_monitor.onPlayedPlace = (place_number)=>{
            


        }   

        this.onStartNightEvent();

        this.x_movement.onMove(this.player.screen_display);

        if(this.player.screen_display === 'PC'){
            this.camera_monitor.choiced_camera_canvas.addEventListener("mouseenter",()=>{
                this.toggle_cam_system_button.style.display = 'flex';
            });
        }

        this.toggle_task_system_button.addEventListener(
            (this.player.screen_display === 'MOBILE'
                ? 'click'
                : 'click'
            ),()=>{
                this.task_monitor.onToggle()
                audio_manager.onPlay('camera_toggle');
                this.x_movement.setIsLocked(this.task_monitor.isOpen || this.current_night.playerIsDeath);
                this.x_movement.onEndMove();
                if(this.task_monitor.isOpen){
                    this.toggle_cam_system_button.style.display = 'none';
                    return
                }
                this.toggle_cam_system_button.style.display = 'block';
        })

        this.toggle_cam_system_button.addEventListener(
            (this.player.screen_display === 'MOBILE'
                ? 'click'
                : 'mouseenter'
            )
            ,()=>{

            this.player_room.playerIsMoving = true;

            if(this.player.screen_display === 'PC' && !!(this.player_room.vision === 'internal' || this.player_room.playerIsMoving)){
                this.toggle_cam_system_button.style.display = 'none';
            }
            if(this.camera_monitor.isOpen || this.player_room.playerIsMoving){
                setTimeout(()=>{
                    this.toggle_cam_system_button.style.display = 'flex';
                },500)
            }

            if(this.player_room.flashlight.inUse && !this.player_room.flashlight.battery.isCharging){
                return
            }

            if(this.player_room.vision === 'internal'){
                this.camera_monitor.onToggle();
                audio_manager.onPlay('camera_toggle');
                this.x_movement.setIsLocked(this.camera_monitor.isOpen || this.current_night.playerIsDeath);
                this.x_movement.onEndMove();
                if(this.camera_monitor.isOpen){
                    this.toggle_task_system_button.style.display = 'none';
                    return
                }
                this.toggle_task_system_button.style.display = 'block';
                return
            }
            this.player_room.onSwitchVision(this.player_room.image_of_interior_room,"internal",'exit',this.player_room.direction)
            return
        })
        this.camera_monitor.onChangeCurrentCamera();
    }

}

export {
    Game
}