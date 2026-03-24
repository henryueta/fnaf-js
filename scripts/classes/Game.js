import { audio_manager } from "../audio-manager.js";
import { onDisplay } from "../functions/display.js";
import { onLoadImage } from "../functions/image-loader.js";
import { onSetPlayerData, onSetPlayerStar } from "../functions/player-data.js";
import { onRandomNumber } from "../functions/randomNumber.js";
import { Jumpscare } from "./Jumpscare.js";

class Game {

    constructor(config){
        this.mode_type = config.mode_type;
        this.player = config.player;
        this.clock = config.clock;
        this.player_room = config.player_room;
        this.player_telephone = config.telephone;
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
        this.isStarted = false;
        this.isPlayingAnxietyAudio = false;
        this.isPlayingRandomAudio = false;
    }

    onCheckDisplay(){
        this.player.screen_display = onDisplay();
        return this.player.screen_display;
    }

    onClearNightEvent(){

        if(this.task_monitor.task_resolve_interval !== null){
            clearInterval(this.task_monitor.task_resolve_interval)
        }

        if(this.task_monitor.increase_temperature_interval !== null){
            clearInterval(this.task_monitor.increase_temperature_interval)
        }

        if(this.task_monitor.decrease_temperature_interval !== null){
            clearInterval(this.task_monitor.decrease_temperature_interval)
        }

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

    onSavePlayer(){
        this.player_room.dark_screen.style.zIndex = '0';
        // this.x_movement.setIsLocked(true,true);
        this.player_room.onChangeDarkAmbience(true);
        this.x_movement.vision_container.style.zIndex = '20';
    }

    onKillPlayer(animatronic,reason,isEnding){

        if(!!this.current_night.isCompleted){
            return
        }

        if(!!this.current_night.playerIsDeath){
            return
        }

        this.player_room.dark_screen.style.zIndex = '0';
        this.toggle_cam_system_button.parentElement.style.zIndex = '0';
        this.toggle_task_system_button.parentElement.style.zIndex = '0';
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
        jumpscare.onStart(this.player.screen_display === 'MOBILE',()=>{
                this.camera_monitor.screen_container.parentElement.style.zIndex = '0';
                this.task_monitor.screen_container.parentElement.style.zIndex = '0';
        },()=>{
            this.current_night.onNightOver(this.mode_type === 'prime_mode',async ()=>{
                this.onActiveItems(false);
                this.player_room.onSwitchImage(await onLoadImage("../assets/imgs/end/game_over.png"),"none");
                if(this.mode_type === 'prime_mode'){
                    return
                }
                onSetPlayerData('firstPlay');
                return
            },reason,isEnding);
            return
        });
        this.player_room.onChangeDarkAmbience(true);


    }

    onUpdatePlayerVision(prev_current_animatronic_place,next_current_animatronic_place){

         if(
        !(this.camera_monitor.chosen_camera_info.number === prev_current_animatronic_place.number
        ||
        this.camera_monitor.chosen_camera_info.number === next_current_animatronic_place.number)
        ){
            return
        }
            this.camera_monitor.chosen_camera_info.image = this.camera_monitor.loading_image;
            this.camera_monitor.onLoadView(true);
            setTimeout(()=>{
                const current_place = (
                    this.camera_monitor.chosen_camera_info.number === prev_current_animatronic_place.number
                    ?  prev_current_animatronic_place
                    :  (next_current_animatronic_place)
                )
                current_place.onSetView()
                this.camera_monitor.chosen_camera_info.image = ( current_place.current_view);
                this.camera_monitor.chosen_camera_info.audio = ( current_place.current_audio);
                this.camera_monitor.onLoadView(false);
            },200)
        return
    }

    onActiveAnimatronic(animatronic){

        if(!animatronic.isActive){
            return
        }

            // if(this.clock.current_time >= 3 && animatronic.waiting_player_value !== 3200){
            //     animatronic.waiting_player_value = 3200;
            // }
                    if(!animatronic.isMoving){
                        return
                    }

                if(
                    !!animatronic.isWaitingPlayer 
                    && 
                    animatronic.waiting_player_timeout === null
                    ){
                    animatronic.waiting_player_timeout = setTimeout(()=>{
                        animatronic.isWaitingPlayer = false;
                        animatronic.waiting_player_timeout = null;
                        this.onKillPlayer(animatronic,"Você não ouviu atentamente os corredores")
                    },(
                        this.mode_type === 'prime_mode'
                        ? 2000
                        : animatronic.waiting_player_value
                    )); 
                    return
                }
                if( this.mode_type !== 'prime_mode'
                    &&
                    !!animatronic.footstep_cheat.inCheatProcess
                    &&
                    animatronic.footstep_cheat.max_cheat_quantity !== null
                    &&
                    animatronic.footstep_cheat.current_cheat_quantity < animatronic.footstep_cheat.max_cheat_quantity
                ){
                    if(this.camera_monitor.current_played_room !== null && animatronic.current_place === 10){

                        const choice_decision = this.clock.current_time >= 3
                        ? onRandomNumber(-3,1)
                        : onRandomNumber(-5,1);

                        if(choice_decision > 0 && this.mode_type !== 'prime_mode'){
                            animatronic.footstep_cheat.onCheat();
                            const current_played_camera = this.camera_monitor.onFindPlayedRoom();
                            current_played_camera.isAudioPlayed = false;
                            this.camera_monitor.current_played_room = null;
                            this.camera_monitor.onChangePlayButtonView(true);  
                            return
                        }
                        animatronic.footstep_cheat.onResetFootstepQuantity();
                        animatronic.onResetVisitedPlaceList();
                                             
                    }

                    if(this.camera_monitor.current_played_room === null){
                        animatronic.footstep_cheat.onCheat();
                        return
                    }
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
                

                    const current_animatronic_door = this.player_room.onFindAnimatronic(animatronic.identifier)
                    
                

                    if(current_animatronic_door === undefined || current_animatronic_door === null){
                        this.isWaitingPlayer = false;
                        prev_current_animatronic_place.current_view = prev_current_animatronic_place.place_view_list.find((view_item=>
                            view_item.animatronic_list.length === 0
                        )).image;

                        // if(this.clock.current_time >= 4){
                        //     this.current_night.running_event_value = 2300;
                        //     animatronic.current_place = 10;
                        //     animatronic.footstep_cheat.onResetFootstepQuantity();
                        //     animatronic.footstep_cheat.onSetMaxCheatQuantity();
                        //     return
                        // }

                         if(
                         (
                            !animatronic.footstep_cheat.inCheatProcess
                            ||
                            (!!animatronic.footstep_cheat.inCheatProcess
                                &&
                                onRandomNumber(0,(
                                     this.mode_type !== 'prime_mode'
                                     ? 1
                                     : 2
                                ) ) === 0
                            )
                            )
                            &&
                            this.mode_type === 'prime_mode'
                            ? this.clock.current_time < 1
                            : this.clock.current_time < 3
                         ){
                            // this.camera_monitor.onGenerateGeneratorRoomList();
                            audio_manager.onPlay("knock");
                            animatronic.current_place = 0;
                            animatronic.onResetVisitedPlaceList();
                            animatronic.footstep_cheat.onResetFootstepQuantity(); 
                            this.place_list[0].onSetAnimatronic(animatronic);
                            this.place_list[0].onSetView();
                            return
                         }
                         animatronic.current_place = 10;
                         animatronic.footstep_cheat.onResetFootstepQuantity();
                         animatronic.footstep_cheat.onSetMaxCheatQuantity();
                        return
                    }
               }

               if(animatronic.current_place > 11){
                    audio_manager.onPlay("audio_room_exit",null,0.4)
               }

               if(animatronic.current_place === 10){
                    animatronic.visited_place_list = [];
               }

            //apenas o número do local
            const next_place_list = this.place_list.find((place_item)=>
                place_item.number === animatronic.current_place
            ).next_place_index_list;

            const played_place = this.place_list.find((place_item)=>
            {
                return !!place_item.isAudioPlayed && !!place_item.canPlayAudio && next_place_list.includes(place_item.number)
            }
            )
            //
            //
            //
            //
            //
            //
            const current_animatronic_place =  animatronic.onChoicePlace(
                (
                    (played_place !== null && played_place !== undefined)
                    ? next_place_list.filter((place_number)=>played_place.number === place_number || place_number < 12)
                    : animatronic.current_place === 0
                        ?  [1,5]
                        : next_place_list.filter((place_number)=>place_number <= 10)
                ),
                this.camera_monitor.current_played_room,
                (this.clock.current_time >= 3),
                this.mode_type === 'prime_mode'
            ); 

            if(current_animatronic_place === 11){
                // this.onKillPlayer(animatronic);
                
                if(this.player_room.vision === 'external'){

                    this.toggle_cam_system_button.onclick = ()=>{};
                    
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

                        if(
                            animatronic.footstep_cheat.current_side !== null 
                            &&
                            //  (
                            //     !!animatronic.footstep_cheat.inCheatProcess
                            //     &&
                            //     animatronic.footstep_cheat.current_cheat_quantity < animatronic.footstep_cheat.max_cheat_quantity
                            //  )
                            //  ||
                             (
                                !!animatronic.footstep_cheat.inCheatProcess
                                &&
                                animatronic.footstep_cheat.max_cheat_quantity === null
                             )
                        ){
                             animatronic.footstep_cheat.onPlayFootstepAudio(false)
                        }

                        if(animatronic.footstep_cheat.current_side === null){
                            animatronic.footstep_cheat.current_side = 
                            current_player_room_door.place_location_number === this.player_room.right_door.place_location_number
                            ? 'right'
                            : 'left';
                            animatronic.footstep_cheat.onPlayFootstepAudio(false)
                        }

                    current_player_room_door.onSetAnimatronicView(animatronic.identifier,'common')
                    if(this.player_room.current_door_vision !== null){
                        this.player_room.onUpdatePlayerView();
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
                const current_played_camera = this.camera_monitor.onFindPlayedRoom();

            if(this.camera_monitor.current_played_room !== null && !next_current_animatronic_place.canPlayAudio){
                 const current_played_camera = this.camera_monitor.onFindPlayedRoom();
                current_played_camera.isAudioPlayed = false;
                this.camera_monitor.current_played_room = null;
                this.camera_monitor.onChangePlayButtonView(true);
            }


            if(!!next_current_animatronic_place.canPlayAudio){
                 animatronic.visited_place_list = animatronic.visited_place_list.filter((place_item_number)=>
                    place_item_number !== next_current_animatronic_place.next_place_index_list[0]
                );
            }

             if(!!next_current_animatronic_place.canPlayAudio && this.camera_monitor.current_played_room === next_current_animatronic_place.number){
                current_played_camera.isAudioPlayed = false;
                this.camera_monitor.current_played_room = null;
                this.camera_monitor.action_button_list.place_lock_switch.textContent = ("Play Audio")
                animatronic.visited_place_list = animatronic.visited_place_list.filter((place_item_number)=>
                    place_item_number !== next_current_animatronic_place.next_place_index_list[0]
                );
                animatronic.isMoving = false;
                setTimeout(()=>{
                    animatronic.isMoving = true;
                },this.clock.current_time === 5
                ? 3000
                : next_current_animatronic_place.quantity_visited > onRandomNumber(1,2) 
                    ? 4000
                    : 10000
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

             if(animatronic.visited_place_list.length < onRandomNumber(1,4)
                && 
                prev_current_animatronic_place.number < 12
            ){
                animatronic.visited_place_list.push(prev_current_animatronic_place.number);

                return
             }

             animatronic.visited_place_list = [];
    }
    
    onEnableExit(){
        this.player_room.room_canvas.onclick = ()=>{
            
        }
    }

    onStartNightInterval(){

        this.current_night.running_event_value = (
            this.mode_type === 'prime_mode'
            ? 3000
            :
            this.clock.current_time < 1
            ? (
                (this.player_room.left_door.current_animatronic !== null || this.player_room.right_door.current_animatronic !== null)
                ? 5000
                : onRandomNumber(4000,15000)
            )
            : (
                (this.player_room.left_door.current_animatronic !== null || this.player_room.right_door.current_animatronic !== null)
                ? 2800
                : 3300
            )
        );
        //---//
        //---//

        if(this.clock.current_time >=3 && this.mode_type !== 'prime_mode'){
            this.animatronic_list[0].footstep_cheat.inCheatProcess = true;
        }

        if(this.clock.current_time === 4 && !this.isPlayingAnxietyAudio){
            this.isPlayingAnxietyAudio = true;
            audio_manager.onPlay("anxiety",null,1.2,true);
        }

        // this.onActiveAnimatronic(this.animatronic_list[0]);

        const enable_random_audio = onRandomNumber(0,(
            this.mode_type === 'prime_mode'
            ? 6
            : 8
        ));
        if(enable_random_audio === 0 && !this.isPlayingRandomAudio && !this.animatronic_list[0].isWaitingPlayer){

            const current_random_audio = onRandomNumber(1,4)

            audio_manager.onPlay("random_audio_"+current_random_audio,()=>{
                this.isPlayingRandomAudio = false;
            },0.2)
            this.isPlayingRandomAudio = true;
        }


        this.current_night.event_running_timeout = setTimeout(()=>this.onStartNightInterval(),this.current_night.running_event_value)
    }

    onStartNightEvent(){

        audio_manager.onPlay("knock")
        this.place_list[0].animatronic_list = this.animatronic_list;
        this.place_list[0].onSetAnimatronic(this.animatronic_list[0])
        this.place_list[0].onSetView()

        setTimeout(()=>{
            this.onStartNightInterval();
        },onRandomNumber(5000,10000))

        this.clock.timer_interval = setInterval(()=>{

            
            this.clock.onUpdateTime(()=>{
                this.onClearNightEvent();
                
                    if(this.task_monitor.task_solved_quantity < this.task_monitor.task_list.length){
                        this.onKillPlayer(this.animatronic_list[0],"Seu tempo para preparar a cura acabou",(
                            this.mode_type === 'prime_mode'
                            ? true
                            : false
                        ));
                        
                        if(this.mode_type === 'prime_mode'){
                            return
                        }
                        onSetPlayerStar('bad_ending',true);
                    return
                    }
               
                this.onSavePlayer();
                this.current_night.onNightWin(this.mode_type === 'prime_mode',async ()=>{
                    this.toggle_cam_system_button.style.display = 'none';
                    this.toggle_task_system_button.style.display = 'none';
                    this.camera_monitor.screen_container.parentElement.style.display = 'none';
                    this.task_monitor.screen_container.style.display = 'none';
                    this.onActiveItems(false);
                    this.player_room.onSwitchImage(await onLoadImage("../assets/imgs/end/"+(
                        this.mode_type === 'prime_mode'
                        ?  'prime_ending'
                        : 'true_ending'
                    )+".png"),"any")
                    this.onEnableExit();
                    if(this.mode_type === 'prime_mode'){
                        onSetPlayerStar('prime_ending',true);
                        return
                    }
                    onSetPlayerStar('true_ending',true);
                    onSetPlayerData('all');
                });
            });

        },(this.clock.timer_value+(
            this.mode_type === 'prime_mode'
            ? 15000
            : 0
        )));
    }

    onActiveItems(enable){
        this.player_room.clickIsDisabled = !enable;
        this.player_battery.battery_container.parentElement.style.display = enable ? 'flex': 'none';
        this.clock.time_container.parentElement.parentElement.style.display = enable ? 'block' : 'none';
        this.toggle_cam_system_button.parentElement.style.display = enable? 'flex' : 'none';
        this.toggle_task_system_button.parentElement.style.display = enable? 'flex': 'none';
    }

    onStart(){
        const onEnableStartEvent = ()=>{
            this.isStarted = true;
            this.task_monitor.onChangeVisor('list');
            this.onStartNightEvent();
        }

        if(this.mode_type === 'prime_mode'){
            onEnableStartEvent();
            return
        }
        this.player_telephone.onAnswerCall(()=>{
            onEnableStartEvent();
        });
    }

    onLoadItems(){
        // 4 - 10 - 11
        //
        this.onCheckDisplay();
        this.player_room.onDraw();
        this.player_room.onLockVision = (vision)=>{
            this.x_movement.setIsLocked(!!(
                vision === 'external'
            ),true)
        }

        this.x_movement.onChangeXVision();

        this.task_monitor.onResolveTask = ()=>{

            this.task_monitor.task_solved_quantity+=1;

            // if(to_install === 'flashlight'){
            //     this.player_room.flashlight.isInstalled = true;
            //     return 
            // }
            // if(to_install === 'camera'){
            //     this.camera_monitor.isInstalled = true;
            //     return
            // }

            // if(to_install.slice(0,7) === 'resolve'){
                
            //     const current_resolved_place = this.resolved_place_list.find((resolved_place_item)=>
            //         resolved_place_item.number === Number.parseInt(to_install.slice(8))
            //     )

            //     const current_place_to_resolve_index = this.place_list.findIndex((place_item)=>
            //         place_item.number === Number.parseInt(to_install.slice(8))
            //     )

            //     this.place_list[current_place_to_resolve_index].isResolved = true;

            //     this.place_list[current_place_to_resolve_index].place_view_list = current_resolved_place.place_view_list;
                
            //     this.place_list[current_place_to_resolve_index].onChangeCurrentView()

            //     return
            // }

            return
        }

        this.player_room.onFlashLightCheckout = ()=>{

            if(this.player_room.current_door_vision.current_animatronic === null){
                return
            }
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
                this.toggle_task_system_button.style.display = 'flex';
            return
        }

        this.camera_monitor.onLockCheckout = ()=>{

        }

        this.camera_monitor.onPlayedPlace = (place_number)=>{
            
            if(this.isStarted){
                return
            }

            setTimeout(()=>{
                if(this.camera_monitor.current_played_room !== null){
                    const current_played_camera = this.camera_monitor.onFindPlayedRoom();
                    current_played_camera.isAudioPlayed = false;
                    this.camera_monitor.current_played_room = null;
                    this.camera_monitor.onChangePlayButtonView(false);
                }
            },4000)

        }   

        this.x_movement.onMove(this.player.screen_display);

        if(this.player.screen_display === 'PC'){
            this.camera_monitor.chosen_camera_canvas.addEventListener("mouseenter",()=>{
                this.toggle_cam_system_button.style.display = 'flex';
            });

            this.task_monitor.screen_container.addEventListener("mouseenter",()=>{
                this.toggle_task_system_button.style.display = 'flex';
            });

        }

        this.toggle_task_system_button.addEventListener(
            (this.player.screen_display === 'MOBILE'
                ? 'click'
                : 'mouseenter'
            ),()=>{

                if(this.current_night.playerIsDeath){
                    return
                }

                this.player_room.playerIsMoving = false;

                this.task_monitor.onToggle()
                audio_manager.onPlay('camera_toggle');
                this.x_movement.setIsLocked(this.task_monitor.isOpen || this.current_night.playerIsDeath);
                this.x_movement.onEndMove();
                if(this.task_monitor.isOpen){
                    if(this.player.screen_display === 'PC'){
                    this.toggle_task_system_button.style.display = 'none';

                    }
                    this.toggle_cam_system_button.style.display = 'none';
                    return
                }
                this.toggle_task_system_button.style.display = 'none';
                setTimeout(()=>{
                    if(this.camera_monitor.isOpen || this.player_room.vision !== 'internal' || this.player_room.playerIsMoving){
                        return
                    }
                    this.toggle_task_system_button.style.display = 'flex';
                },800)
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
            if((this.camera_monitor.isOpen || this.player_room.playerIsMoving)){
                setTimeout(()=>{
                    if(this.task_monitor.isOpen){
                        return
                    }

                    this.toggle_cam_system_button.style.display = 'block';
                },500)
            }

            if(this.player_room.flashlight.inUse && !this.player_room.flashlight.battery.isCharging){
                return
            }

            if(this.player_room.vision === 'internal'){

                if(this.current_night.playerIsDeath){
                    return
                }

                if(!this.camera_monitor.isInstalled){
                    return
                }
                this.camera_monitor.onToggle();
                audio_manager.onPlay('camera_toggle');
                this.x_movement.setIsLocked(this.camera_monitor.isOpen || this.current_night.playerIsDeath);
                this.x_movement.onEndMove();
                if(this.camera_monitor.isOpen){
                    this.toggle_task_system_button.style.display = 'none';
                    return
                }
                this.toggle_task_system_button.style.display = 'flex';
                return
            }
            this.player_room.onSwitchVision(this.player_room.image_of_interior_room,"internal",'exit',this.player_room.direction)
            return
        })
        this.camera_monitor.onChangeCurrentCamera();
        this.onActiveItems(true);
    }

}

export {
    Game
}