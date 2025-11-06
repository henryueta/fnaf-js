
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
            const prev_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === animatronic.current_place)
            console.log(animatronic)
            const current_animatronic_place =  animatronic.onChoicePlace(this.place_list.find((place_item)=>place_item.number === animatronic.current_place).next_place_index_list)
        
            const next_current_animatronic_place = this.place_list.find((place_item)=>place_item.number === current_animatronic_place)
             animatronic.onAction(next_current_animatronic_place);
            if(prev_current_animatronic_place.number !== next_current_animatronic_place.number){
                prev_current_animatronic_place.onRemoveAnimatronic(animatronic);
                prev_current_animatronic_place.onSetView();
                next_current_animatronic_place.onSetAnimatronic(animatronic);
                next_current_animatronic_place.onSetView();
               
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
                            :  next_current_animatronic_place
                        )
                        
                        current_place.onSetView()
                        this.camera_monitor.choiced_camera_info.image.src = current_place.current_view;
                        this.camera_monitor.choiced_camera_info.audio.src = current_place.current_audio;
                    },200)
                }
            }
            }
        
    }
    
    onStart(){
        
        this.player_room.onDraw();
        setInterval(()=>{
            for(const animatronic of this.animatronic_list){
                this.onActiveAnimatronic(animatronic);
            }
            console.log("evento de noite executado")
        },this.current_night.event_running_interval)

        this.x_moviment.onMove();
        this.toggle_cam_system_button.addEventListener('click',()=>{
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