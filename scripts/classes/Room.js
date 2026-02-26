import { audio_manager } from "../audio-manager.js";

class Room {
    constructor(config) {
        this.room_canvas = config.room_canvas;
        this.room_context = this.room_canvas.getContext('2d');
        // this.room_image = new Image();
        this.image_of_interior_room = config.image_of_interior_room
        this.room_image = config.image_of_interior_room;
        this.vision = "internal";
        this.clickIsDisabled = false;
        this.playerIsMoving = false;
        this.current_door_vision = null;
        this.dark_screen = config.dark_screen;
        this.onFlashLightCheckout = null;
        this.onFlashLightEnd = null;
        this.onFlashLightProcess = null;
        this.flashlight = config.flashlight;
        this.direction = null;
        this.onLockVision = config.onLockVision;
        // this.front_door = new Door({
        //     door_room_context:this.room_context,
        //     x:config.front_door.x,
        //     y:config.front_door.y,
        //     type:config.front_door.type,
        //     width: config.front_door.width, 
        //     height: config.front_door.height,
        //     place_location_number:config.front_door.place_location_number,
        //     animatronic_view_list:config.front_door.animatronic_view_list,
        //     vision_image:config.front_door.animatronic_view_list.find((animatronic_view)=>animatronic_view.identifier === null).image,
        //     onRectClick: (image,direction,type)=>{
        //         this.onSwitchVision(image,"external",type,direction);
        //     }
        // });
        this.right_door = config.right_door;
        this.right_door.door_room_context = this.room_context;
        this.right_door.onRectClick = (image,direction,type)=>this.onSwitchVision(image,"external",type,direction);
       
        this.left_door = config.left_door;
        this.left_door.door_room_context = this.room_context;
        this.left_door.onRectClick = (image,direction,type)=>this.onSwitchVision(image,"external",type,direction);

        this.room_canvas.addEventListener('click', (e) => !this.clickIsDisabled ?  this.handleClick(e) : ()=>console.log("player está morto"));
        this.dark_screen.addEventListener('mousedown',()=> {
            this.onFlashLight();
        });
        // this.dark_screen.addEventListener('mouseup',()=> {
        //    this.onChangeDarkAmbience('100%');
        // });
        this.dark_screen.addEventListener('touchstart',()=> {
            this.onFlashLight();
        });
        // this.dark_screen.addEventListener('touchend',()=> {
        //    this.onChangeDarkAmbience('100%');
        // });
    }

    onFindAnimatronic(identifier){

        return (
            (
                // this.front_door.current_animatronic !== null
                //  ||
                 this.left_door.current_animatronic !== null
                 ||
                 this.right_door.current_animatronic !== null
            )
            ?
            [
                // this.front_door,
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

    onChangeDarkAmbience(noFlash){
        if(this.vision === 'external' && !this.clickIsDisabled && !noFlash){
            // this.dark_screen.style.opacity = opacity
            this.dark_screen.classList.remove('flash-light-fadeout');
            this.dark_screen.classList.add('flash-light-fadein');
            return
        }
        this.dark_screen.classList.remove('flash-light-fadein');
        this.dark_screen.classList.add('flash-light-fadeout');
        setTimeout(()=>{
            this.dark_screen.classList.remove('flash-light-fadeout')
        },500)
    }

    onUpdatePlayerView(){
        this.room_image = this.current_door_vision.vision_image;
        this.onLoadImage();   
    }

    onFlashLight(){

        if(!this.flashlight.inUse && this.flashlight.current_battery_value === 100){
                audio_manager.onPlay('flash');
                this.onChangeDarkAmbience(false);
                if(this.vision === 'external' && this.current_door_vision.current_animatronic !== null){
                        if(!!this.onFlashLightCheckout){
                            this.onFlashLightCheckout();
                        }
                }
                this.flashlight.onUse('discharge',()=>{

                    if(this.onFlashLightProcess){
                        this.onFlashLightProcess();
                    }

                    if(this.flashlight.current_battery_value < 30){
                        if(!!this.onFlashLightEnd){
                            this.onFlashLightEnd();
                        }   
                        this.current_door_vision.onRemoveAnimatronicView();
                        this.onUpdatePlayerView(); 
                        
                    }
                },()=>{this.onChangeDarkAmbience(true)
                    
                })
            }
    }

    onLoadImage(){
        // this.room_image.onload = () => {
            const cw = this.room_canvas.width;
            const ch = this.room_canvas.height;
            const iw = this.room_image.width;
            const ih = this.room_image.height;
            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);
            this.room_context.drawImage(this.room_image, x, y, iw * scale, ih * scale);
             if(this.vision === 'internal'){
                console.log("aaa")
                // this.front_door.onDraw();
                this.left_door.onDraw();
                this.right_door.onDraw();
                return
             }
        // };
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
        this.room_image = room_image;
        this.onLoadImage();
        this.onLockVision(vision);
    }

    onEntraceContainerVision(type,direction){
        this.room_canvas.classList.add('room-'+type+'-'+direction+'-vision');
    }

    onExitContainerVision(type,direction){
        this.room_canvas.classList.remove('room-'+type+'-'+direction+'-vision');
        
    }

    onVisionTransition(transition_type,type,direction){

        this.playerIsMoving = !!(transition_type === 'entrace');
        console.log(this.playerIsMoving)
        if(transition_type === 'entrace'){
            this.onEntraceContainerVision(type,direction);
            return
        }
        this.onExitContainerVision(type,direction);
        return
    }

    onSwitchVision(room_image,vision,type,direction){
        this.direction = direction;
            
         const current_door_view = (
            vision === 'external'
            ? [
            // this.front_door,
            this.left_door,
            this.right_door
            ].find((door)=>door.type === this.direction)
            : null
         )

        this.current_door_vision = current_door_view


        if(
            vision === 'internal' 
            && 
            this.flashlight.current_battery_value !== 100
        ){
            this.flashlight.onUse('charge',()=>{
                
                console.log("carregando",this.flashlight.current_battery_value)

            });
        }

        if(vision === 'external' && this.flashlight.isCharging){
            console.log("limpou interval")
            clearInterval(this.flashlight.batery_use_interval);
        }


        if(!!type || type !== null){
            if(type === 'exit'){
                setTimeout(()=>{
                    this.onSwitchImage(room_image,vision);
                    this.dark_screen.style.display = 'none'
                    this.onVisionTransition('entrace',type,direction);
                    setTimeout(()=>{
                        this.onVisionTransition('exit',type,direction);
                    },200)
                },200)
                return 
            }
            this.onVisionTransition('entrace',type,direction);
            setTimeout(()=>{
                this.onVisionTransition('exit',type,direction);
                this.onSwitchImage(room_image,vision);
                this.dark_screen.style.display = 'block'
            },200)
            return
        }
    }


    handleClick(event) {

            const rect = this.room_canvas.getBoundingClientRect();

            const scaleX = this.room_canvas.width / rect.width;
            const scaleY = this.room_canvas.height / rect.height;
            
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            if(this.vision === 'internal'){
                // this.front_door.onClick(x,y);
                this.right_door.onClick(x,y);
                this.left_door.onClick(x,y);
                return
            }
            return
        
    }
}

export { Room };
