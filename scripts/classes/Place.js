import { onSameList } from "../functions/sameList.js";

class Place {

    constructor(config){
        this.number = config.number;
        this.name = config.name;
        this.next_place_index_list = config.next_place_index_list;
        this.animatronic_list =  config.animatronic_list ||  [];
        this.place_view_list = config.place_view_list || [];
        this.hasMultipleConnections = config.hasMultipleConnections;
        const current_place_info =  this.place_view_list.find((view_item)=>
        {
            return onSameList(this.animatronic_list.map((animatronic_item)=>animatronic_item.identifier),view_item.animatronic_list)
        }
        )
        this.current_view = current_place_info.image;
        this.current_audio = current_place_info.audio;
        this.repeat_audio = current_place_info.repeat_audio;
        
    }

    onSetView(){

         this.current_view = this.place_view_list.find((view_item)=>
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