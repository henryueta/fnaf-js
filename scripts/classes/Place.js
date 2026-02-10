import { onSameList } from "../functions/sameList.js";

class Place {

    constructor(config){
        this.number = config.number;
        this.name = config.name;
        this.hasEnergy = true;
        this.next_place_index_list = config.next_place_index_list;
        this.animatronic_list =  config.animatronic_list ||  [];
        this.place_view_list = config.place_view_list || [];
        this.hasMultipleConnections = config.hasMultipleConnections;
        this.hasSecurityRoomConnection = config.hasSecurityRoomConnection;
        const current_place_info =  this.place_view_list.find((view_item)=>
        {
            return onSameList(this.animatronic_list.map((animatronic_item)=>animatronic_item.identifier),view_item.animatronic_list)
        }
        )
        this.current_view = current_place_info.image;
        this.current_audio = current_place_info.audio;
        this.repeat_audio = current_place_info.repeat_audio;
        
    }

    onPowerSwitch(){
        this.hasEnergy = !this.hasEnergy
        
        const noisy_animatronics = this.animatronic_list.filter((animatronic_item)=>
            animatronic_item.current_mode === 'noisy' && !animatronic_item.isMoving    
        )

        if(noisy_animatronics){
           if(!this.hasEnergy){
            
            noisy_animatronics.forEach((animatronic_item)=> 
            {
                animatronic_item.current_mode = 'default';
                animatronic_item.isMoving = true;
                this.animatronic_list = this.animatronic_list.filter((place_animatronic_item)=>
                    place_animatronic_item.identifier !== animatronic_item.identifier
                )
                setTimeout(()=>{
                    const prev_animatronic_movement_delay = animatronic_item.movement_delay;
                    animatronic_item.movement_delay = prev_animatronic_movement_delay + 1000;
                    setTimeout(()=>{
                    // animatronic_item.onChoicePlace(this.next_place_index_list)

                        animatronic_item.movement_delay = prev_animatronic_movement_delay;
                    },4000)
                },1000)
               
            }
            )
            this.onSetView();
           }
        }

        return this.hasEnergy
    }

    onSetView(isNoisy){
        console.log(this.place_view_list,this.animatronic_list)

        const filtered_place_view_list = (
            isNoisy
            ? this.place_view_list.filter((item)=>typeof item.noisy_animatronic === 'number')
            : this.place_view_list
        )


         this.current_view = filtered_place_view_list.find((view_item)=>
        {
            return onSameList(this.animatronic_list.map((animatronic_item)=>animatronic_item.identifier),view_item.animatronic_list)
        }
        ).image

    }

    onFindAnimatronic(identifier){
        return this.animatronic_list.find((animatronic_item)=>
            animatronic_item.identifier === identifier
        )
    }

    onRemoveAnimatronic(animatronic){

        if(!this.onFindAnimatronic(animatronic.identifier)){
            return
        }   
        this.animatronic_list = this.animatronic_list.filter((animatronic_item)=>
            animatronic_item.identifier !== animatronic.identifier
        )
        
    }

    onSetAnimatronic(animatronic){
        
        if(this.onFindAnimatronic(animatronic.identifier)){
            return
        }

        this.animatronic_list.push(animatronic)

    }

}






export {
    Place
}