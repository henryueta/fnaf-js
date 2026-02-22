
class Door{

    constructor(config){
        this.door_room_context = config.door_room_context;
        this.x = config.x;
        this.y = config.y;
        this.type = config.type;
        this.height = config.height;
        this.width = config.width;
        this.place_location_number = config.place_location_number;
        this.current_animatronic = null;
        this.animatronic_view_list = config.animatronic_view_list;
        this.vision_image = config.vision_image;
        this.onRectClick = config.onRectClick;
    }

    onDraw(){
        // this.door_room_context.fillStyle = 'black';
        // this.door_room_context.fillRect(
        // this.x,
        // this.y,
        // this.width,
        // this.height
        // );
    }
    
    onClick(client_x,client_y){
        if(!!this.onRectClick){
            if (
            client_x >= this.x &&
            client_x <= this.x + this.width &&
            client_y >= this.y &&
            client_y <= this.y + this.height
        ) {
                this.onRectClick(this.vision_image,this.type,'entrace');
          
          }
        }

    }

    onFindAnimatronicView(identifier){
        return this.animatronic_view_list.find((animatronic_view)=>
            animatronic_view.identifier === identifier
        )
    }

    onRemoveAnimatronicView(){
        this.current_animatronic = null;
        this.vision_image = this.animatronic_view_list.find((animatronic_view)=>
            animatronic_view.identifier === null
        ).image
    }

    onSetAnimatronicView(identifier){

        this.current_animatronic = this.onFindAnimatronicView(identifier);
        this.vision_image = this.current_animatronic.image

    }   

}

export {
    Door
}