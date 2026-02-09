
class Game {

    constructor(config){
        this.player_room = config.player_room;
        this.camera_monitor = config.camera_monitor;
        this.x_moviment = config.x_moviment;
        this.toggle_cam_system_button = config.toggle_cam_system_button;
        this.animatronic_list = config.animatronic_list;
        this.place_list = config.place_list;
        this.current_night = config.current_night;
    }



    onActiveAnimatronic(animatronic){

        if(animatronic.isActive){
            console.log(animatronic,animatronic.isMoving)
            if(!!animatronic.isMoving){

            const prev_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === animatronic.current_place)
            console.log(animatronic)
            
            //apenas o número do local
            console.warn(this.place_list.find((place_item)=>place_item.number === animatronic.current_place))
            const current_animatronic_place =  animatronic.onChoicePlace(this.place_list.find((place_item)=>place_item.number === animatronic.current_place).next_place_index_list)
            
            const next_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === current_animatronic_place)
            
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
            
            if(animatronic.current_mode === 'noisy'){

                if(!!place_for_noisy){
                    animatronic.isMoving = !place_for_noisy;
                    // next_current_animatronic_place.current_view = place_for_noisy.image;
                    next_current_animatronic_place.current_audio = place_for_noisy.audio;
                    next_current_animatronic_place.repeat_audio = place_for_noisy.repeat_audio;
                    
                }
                console.log("moving",place_for_noisy)
            }

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
                        console.log("noisy",place_for_noisy)
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
            return
            }



        }
    }
    
    onStart(){
        // 4 - 10 - 11
        //
        this.player_room.onDraw();
        // setInterval(()=>{
        //     for(const animatronic of this.animatronic_list){
        //         setTimeout(()=>{
        //             this.onActiveAnimatronic(animatronic);
        //         },animatronic.movement_delay)
        //     }
        //     console.log("evento de noite executado")
        // },this.current_night.event_running_interval)

        this.x_moviment.onMove();

        // this.toggle_cam_system_button.addEventListener('mousemove',()=>{
           
        // })

        this.toggle_cam_system_button.addEventListener((
            window.innerWidth <= 1024
            ? 'click'
            : 'mouseenter'
        ),()=>{
            this.camera_monitor.onToggle()
            this.x_moviment.setIsLocked(this.camera_monitor.isOpen)
            this.x_moviment.onEndMove()
        })
        this.camera_monitor.onChangeCurrentCamera()
    }

}

export {
    Game
}