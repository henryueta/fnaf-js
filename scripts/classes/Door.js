
class Door{

    constructor(config){

        this.door_room_context = config.door_room_context;
        this.x = config.x;
        this.y = config.y;
        this.type = config.type;
        this.height = config.height;
        this.clickableRect = config.clickableRect

        if(this.type === 'front'){
            
            this.door_room_context.fillStyle = 'black';
            this.door_room_context.fillRect(
            this.x,
            this.y,
            this.clickableRect.width,
            this.clickableRect.height
            );

        }

        if(this.type !== 'front'){

            const base_value = (
                this.type === 'right'
                ? 303
                :
                this.type === 'left'
                ? -303
                : null
            )

            if(!base_value){
                throw new Error("Tipo de porta inválida")
            }

            this.door_room_context.beginPath();

            // canto superior esquerdo (mais distante)
            this.door_room_context.moveTo(this.x,this.y);

            // canto superior direito
            this.door_room_context.lineTo(this.x + base_value,this.y + 160);

            // canto inferior direito (mais perto)
            this.door_room_context.lineTo(this.x + base_value,this.y + this.height);

            // canto inferior esquerdo
            this.door_room_context.lineTo(this.x,this.y+970+160);

            this.door_room_context.closePath();

            this.door_room_context.fillStyle = "black"; // cor da porta
            this.door_room_context.fill();

        }

    }

}

export {
    Door
}