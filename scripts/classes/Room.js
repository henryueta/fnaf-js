import { Door } from "./Door.js";

class Room {
    constructor(config) {
        this.room_canvas = config.room_canvas;
        this.room_context = this.room_canvas.getContext('2d');
        this.room_image = new Image();
        this.room_image.src = config.room_image;
        this.vision = "internal";
        this.playerIsDeath = false;
        this.current_door_vision = null;
        this.dark_screen = config.dark_screen;
        this.flashlight_number_clicks = 0;
        this.direction = null;
        this.onLockVision = config.onLockVision;
        this.front_door = new Door({
            door_room_context:this.room_context,
            x:config.front_door.x,
            y:config.front_door.y,
            type:config.front_door.type,
            width: config.front_door.width, 
            height: config.front_door.height,
            place_location_number:config.front_door.place_location_number,
            animatronic_view_list:config.front_door.animatronic_view_list,
            vision_image:config.front_door.animatronic_view_list.find((animatronic_view)=>animatronic_view.identifier === null).image,
            onRectClick: (image,direction,type)=>{
                this.onSwitchVision(image,"external",type,direction);
            }
        });
        this.right_door = new Door({
            door_room_context:this.room_context,
            x:config.right_door.x,
            y:config.right_door.y,
            type:config.right_door.type,
            width: config.right_door.width, 
            height: config.right_door.height,
            place_location_number:config.right_door.place_location_number,
            animatronic_view_list:config.right_door.animatronic_view_list,
            vision_image:config.right_door.animatronic_view_list.find((animatronic_view)=>animatronic_view.identifier === null).image,
            onRectClick: (image,direction,type)=>{
                this.onSwitchVision(image,"external",type,direction);
            }
        });
        this.left_door = new Door({
            door_room_context:this.room_context,
            x:config.left_door.x,
            y:config.left_door.y,
            type:config.left_door.type,
            width: config.left_door.width, 
            height: config.left_door.height,
            place_location_number:config.left_door.place_location_number,
            animatronic_view_list:config.left_door.animatronic_view_list,
            vision_image:config.left_door.animatronic_view_list.find((animatronic_view)=>animatronic_view.identifier === null).image,
            onRectClick: (image,direction,type)=>{
                this.onSwitchVision(image,"external",type,direction);
            }
        });

        // this.clickableRect = { x: 1022, y: 440, width: 450, height: 650 };
        // this.onRectClick = config.onRectClick || null;

        this.room_canvas.addEventListener('click', (e) => this.handleClick(e));
        this.dark_screen.addEventListener('mousedown',()=> {
            this.onFlashLight();
        })
        this.dark_screen.addEventListener('mouseup',()=> {
           this.onChangeDarkAmbience('100%');
        })
        this.dark_screen.addEventListener('touchstart',()=> {
            this.onFlashLight();
        })
        this.dark_screen.addEventListener('touchend',()=> {
           this.onChangeDarkAmbience('100%');
        })
    }

    onFindAnimatronic(identifier){

        

        return (
            (
                this.front_door.current_animatronic !== null
                 ||
                 this.left_door.current_animatronic !== null
                 ||
                 this.right_door.current_animatronic !== null
            )
            ?
            [
                this.front_door,
                this.left_door,
                this.right_door
                ].find((door_item)=>
                door_item.current_animatronic !== null
                &&
                door_item.current_animatronic.identifier === identifier
            )
            : null
            )
    }

    onChangeDarkAmbience(opacity){
        if(this.vision === 'external' && !this.playerIsDeath){
            this.dark_screen.style.opacity = opacity
            return
        }
        this.dark_screen.style.opacity = '0%'
    }

    onFlashLight(){
        this.onChangeDarkAmbience('0%');
           if(this.vision === 'external' && this.current_door_vision.current_animatronic !== null){
                this.flashlight_number_clicks+=1;
               if(this.flashlight_number_clicks === 10){
                this.current_door_vision.onRemoveAnimatronicView();
                this.room_image.src = this.current_door_vision.vision_image;
                this.onLoadImage();
                this.flashlight_number_clicks = 0;
               }
           }
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

    onSwitchImage(room_image,vision){
        this.vision = vision;
        this.onReset();
        this.room_image.src = room_image;
        this.onLoadImage();
        this.onLockVision(vision);
    }

    onEntraceContainerVision(type,direction){
        this.room_canvas.classList.add('room-'+type+'-'+direction+'-vision');
        
    }

    onExitContainerVision(type,direction){
        this.room_canvas.classList.remove('room-'+type+'-'+direction+'-vision');
        
    }

    onSwitchVision(room_image,vision,type,direction){
        this.direction = direction;

         const current_door_view = [
            this.front_door,
            this.left_door,
            this.right_door
        ].find((door)=>door.type === this.direction);

        this.current_door_vision = current_door_view


        if(!!type || type !== null){
            if(type === 'exit'){

                setTimeout(()=>{
                    this.onSwitchImage(room_image,vision);
                    this.dark_screen.style.display = 'none'
                    this.onEntraceContainerVision(type,direction);
                    setTimeout(()=>{
                        this.onExitContainerVision(type,direction);
                    },200)
                },200)
                
                return 
            }
            this.onEntraceContainerVision(type,direction)
            setTimeout(()=>{
             this.onExitContainerVision(type,direction);
             this.onSwitchImage(room_image,vision);
             this.dark_screen.style.display = 'block'
            },200)

            return
        }
    }


    handleClick(event) {

        if(!this.playerIsDeath){

            const rect = this.room_canvas.getBoundingClientRect();

            const scaleX = this.room_canvas.width / rect.width;
            const scaleY = this.room_canvas.height / rect.height;
            
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            if(this.vision === 'internal'){
                this.front_door.onClick(x,y);
                this.right_door.onClick(x,y);
                this.left_door.onClick(x,y);
                return
            }
            return
        }
    }
}

export { Room };
