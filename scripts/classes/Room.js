import { Door } from "./Door.js";

class Room {
    constructor(config) {
        this.room_canvas = config.room_canvas;
        this.room_context = this.room_canvas.getContext('2d');
        this.room_image = new Image();
        this.room_image.src = config.room_image;

        this.clickableRect = { x: 1022, y: 440, width: 450, height: 650 };
        this.onRectClick = config.onRectClick || null;

        this.room_canvas.addEventListener('click', (e) => this.handleClick(e));
        this.front_door = null;
        this.right_lateral_door = null;
        this.left_lateral_door = null;
    }


    
    onDraw() {
        this.room_image.onload = () => {
            const cw = this.room_canvas.width;
            const ch = this.room_canvas.height;
            const iw = this.room_image.width;
            const ih = this.room_image.height;

            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);
            this.room_context.drawImage(this.room_image, x, y, iw * scale, ih * scale);

            this.front_door = new Door({
                door_room_context:this.room_context,
                x:1022,
                y:440,
                type:'front',
                clickableRect:{
                    width: 450, height: 650 
                }
            });
            this.right_lateral_door = new Door({
                door_room_context:this.room_context,
                x:190,
                y:232,
                type:'right',
                height:950
            });
            this.left_lateral_door = new Door({
                door_room_context:this.room_context,
                x:2290,
                y:248,
                type:'left',
                height:941
            });
        };
    }

    handleClick(event) {
        const rect = this.room_canvas.getBoundingClientRect();

        const scaleX = this.room_canvas.width / rect.width;
        const scaleY = this.room_canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        if (
            x >= this.clickableRect.x &&
            x <= this.clickableRect.x + this.clickableRect.width &&
            y >= this.clickableRect.y &&
            y <= this.clickableRect.y + this.clickableRect.height
        ) {
            if (this.onRectClick) this.onRectClick();
        }
    }
}

export { Room };
