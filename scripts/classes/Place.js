import { onSameList } from "../functions/sameList.js";

class Place {

    constructor(config){
        this.number = config.number;
        this.name = config.name;
        this.canLock = config.canLock;
        this.isEnabled = config.isEnabled;
        this.isLocked = config.isLocked || false;
        this.hasPowerGenerator = config.hasPowerGenerator;
        this.next_place_index_list = config.next_place_index_list;
        this.animatronic_list =  config.animatronic_list ||  [];
        this.place_view_list = config.place_view_list || [];
        this.hasMultipleConnections = config.hasMultipleConnections;
        this.isPointOfChoice = config.isPointOfChoice;
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

    onLockSwitch(){
        
        if(!this.canLock){
            return false
        }

        const place_animatronic = this.animatronic_list.find((animatronic_item)=>
            animatronic_item.current_place === this.number  
        )
        if(!!place_animatronic){
            return false;
        }
        this.isLocked = !this.isLocked
        return true;
    }

    onSetView(isNoisy){

        const filtered_place_view_list = (
            isNoisy
            ? this.place_view_list.filter((item)=>typeof item.noisy_animatronic === 'number')
            : this.place_view_list
        )


         this.current_view = filtered_place_view_list.find((view_item)=>
        {
            return onSameList(this.animatronic_list.map((animatronic_item)=>animatronic_item.identifier),view_item.animatronic_list)
        }
        ).image;

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
        console.log("removendo")
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