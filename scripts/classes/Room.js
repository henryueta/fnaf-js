import { Door } from "./Door.js";

class Room {
    constructor(config) {
        this.room_canvas = config.room_canvas;
        this.room_context = this.room_canvas.getContext('2d');
        this.room_image = new Image();
        this.room_image.src = config.room_image;
        this.vision = "internal";
        this.onLockVision = config.onLockVision;
        this.front_door = new Door({
            door_room_context:this.room_context,
            x:config.front_door.x,
            y:config.front_door.y,
            width: config.front_door.width, 
            height: config.front_door.height,
            place_location_number:config.front_door.place_location_number,
            vision_image:config.front_door.image,
            onRectClick: (image)=>{
                this.onSwitchVision(image,"external");
            }
        });
        this.right_door = new Door({
            door_room_context:this.room_context,
            x:config.right_door.x,
            y:config.right_door.y,
            width: config.right_door.width, 
            height: config.right_door.height,
            place_location_number:config.right_door.place_location_number,
            vision_image:config.right_door.image,
            onRectClick: (image)=>{
                this.onSwitchVision(image,"external");
            }
        });
        this.left_door = new Door({
            door_room_context:this.room_context,
            x:config.left_door.x,
            y:config.left_door.y,
            width: config.left_door.width, 
            height: config.left_door.height,
            place_location_number:config.left_door.place_location_number,
            vision_image:config.left_door.image,
            onRectClick: (image)=>{
                this.onSwitchVision(image,"external");
            }
        });

        // this.clickableRect = { x: 1022, y: 440, width: 450, height: 650 };
        // this.onRectClick = config.onRectClick || null;

        this.room_canvas.addEventListener('click', (e) => this.handleClick(e));

    }

    onLoadImage(){
        this.room_image.onload = () => {
            const cw = this.room_canvas.width;
            const ch = this.room_canvas.height;
            const iw = this.room_image.width;
            const ih = this.room_image.height;
            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);
            this.room_context.drawImage(this.room_image, x, y, iw * scale, ih * scale);
            

             if(this.vision === 'internal'){
                this.front_door.onDraw();
                this.left_door.onDraw();
                this.right_door.onDraw();
                return
             }
        };
    }

    onDraw() {
       this.onLoadImage();
    }

    onReset(){
        const cw = this.room_canvas.width;
        const ch = this.room_canvas.height;
        const iw = this.room_image.width;
        const ih = this.room_image.height;
        const scale = Math.max(cw / iw, ch / ih);
        this.room_context.clearRect(0,0,iw * scale, ih * scale);
    }

    onSwitchVision(room_image,vision){
        this.vision = vision
        this.onReset();
        this.room_image.src = room_image;
        this.onLoadImage();
        this.onLockVision(vision);
    }


    handleClick(event) {
        const rect = this.room_canvas.getBoundingClientRect();

        const scaleX = this.room_canvas.width / rect.width;
        const scaleY = this.room_canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        this.front_door.onClick(x,y);
        this.right_door.onClick(x,y);
        this.left_door.onClick(x,y);
        // if (
        //     x >= this.clickableRect.x &&
        //     x <= this.clickableRect.x + this.clickableRect.width &&
        //     y >= this.clickableRect.y &&
        //     y <= this.clickableRect.y + this.clickableRect.height
        // ) {
        //     if (this.onRectClick) this.onRectClick();
        // }
    }
}

export { Room };
