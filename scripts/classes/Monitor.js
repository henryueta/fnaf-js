import { audio_manager } from "../audio-manager.js";
import { onRandomNumber } from "../functions/randomNumber.js";

class Monitor {
    constructor(config){
        this.screen_container = config.screen_container;
        this.isOpen = false;
        this.isRunningOperation = false;
        this.activeLock = true;
        this.camera_list_container = config.camera_list_container;
        this.camera_list = config.camera_list;
        this.action_button_list = config.action_button_list;
        this.choiced_camera_canvas = config.choiced_camera_canvas;
        this.choiced_camera_context = this.choiced_camera_canvas.getContext("2d")
        this.loading_image = config.loading_image;
        this.onLockPlace = config.onLockPlace;
        this.onLockCheckout = config.onLockCheckout;
        this.choiced_camera_info = {
            number:this.camera_list[0].number,
            image:null,
            audio:null,
            repeat_audio:this.camera_list[0].repeat_audio
        }

        this.choiced_camera_info.image =  this.camera_list[0].current_view;
        this.choiced_camera_info.audio = this.camera_list[0].current_audio;
        // this.choiced_camera_info.audio.loop = !!this.choiced_camera_info.repeat_audio;
        this.choiced_camera_info.number =  this.camera_list[0].number;
        
        this.accessible_camera_list =  Array.from(this.camera_list_container.children)
        .filter((camera_item)=>
            camera_item.children.length && Array.from(camera_item.children)[0].id.includes('place-')   
        );

        this.generator_room_camera_list = Array.from(this.camera_list_container.children)
        .filter((camera_item)=>
            camera_item.className.includes('generator-room')
        ).map((camera_item)=>camera_item.children[0])

        this.enabled_generator_room_list = new Set();

      if(!!this.action_button_list){

        const place_lock_switch = this.action_button_list.place_lock_switch;
        place_lock_switch.onclick = ()=>{
                this.onLockCheckout();

                if(!this.activeLock){
                    return
                }
            if(!this.isRunningOperation){

            const choiced_camera =  this.camera_list.find((camera_item)=>
                camera_item.number === this.choiced_camera_info.number
            )
            if(!choiced_camera.onLockSwitch()){
                audio_manager.onPlay('action_denied')
                return
            }

            this.isRunningOperation = true;
            place_lock_switch.textContent = "Running. . .";
            place_lock_switch.classList.add("user-lock-switch");

            setTimeout(()=>{

                place_lock_switch.textContent = (
                    !choiced_camera.isLocked
                    ? "Lock"
                    : "Unlock"
                )
                place_lock_switch.classList.remove("user-lock-switch");
                
                this.choiced_camera_info.image =  choiced_camera.current_view;
                this.choiced_camera_info.audio = choiced_camera.current_audio;
                // this.choiced_camera_info.audio.loop = choiced_camera
                console.log("trancado",choiced_camera.isLocked);
                    this.onLockPlace(choiced_camera.isLocked);
               setTimeout(()=>{
                this.isRunningOperation = false;
               },200)
            },1000)
            }
            
        }
      }

        // this.choiced_camera_info.image.onload = 
        // () => {
            
        // };
        this.onGenerateGeneratorRoomList();
    }

    onLoadView(playAudio){
            const cw = this.choiced_camera_canvas.width;
            const ch = this.choiced_camera_canvas.height;
            const iw = this.choiced_camera_info.image.width;
            const ih = this.choiced_camera_info.image.height;

            const scale = Math.max(cw / iw, ch / ih);

            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);
            this.choiced_camera_context.drawImage(this.choiced_camera_info.image, x, y, iw * scale, ih * scale);
            if(this.isOpen && !!playAudio){
                audio_manager.onPlay(this.choiced_camera_info.audio)
            }
    }

    onViewCurrentCamera(){
        // img.onload = 
    }

    onSelectPlace(){
        return document.querySelector("#place-"+this.choiced_camera_info.number);
    }

    onChangeLockButtonView(canLock,isLocked){

         this.action_button_list.place_lock_switch.textContent = (
                    !isLocked
                    ? "Lock"
                    : "Unlock"
        )

        if(canLock){
            this.action_button_list.place_lock_switch.style.display = 'block';
            return
        }
        this.action_button_list.place_lock_switch.style.display = 'none';
        return
    }

    onToggle(){
    this.screen_container.classList.remove(!!this.isOpen ? 'open-cam-system' : 'close-cam-system')

    this.screen_container.classList.add(!!this.isOpen ? "close-cam-system" : 'open-cam-system')
    
    this.screen_container.parentElement.style.pointerEvents = (!!this.isOpen ? "none" : 'visible')
    const last_choiced_camera_number = this.choiced_camera_info.number;

    // this.onResetCurrentCamera();
    setTimeout(()=>{
        this.screen_container.style.display = (!!this.isOpen ? "block" : "none");
        const choiced_camera = this.camera_list.find((item)=>{
            return item.number === last_choiced_camera_number
        }); 
        this.choiced_camera_info.audio = choiced_camera.current_audio;
        this.choiced_camera_info.image = choiced_camera.current_view;
        this.choiced_camera_info.number = choiced_camera.number;
        if(!!this.isOpen){
            this.onSelectPlace().style.background = 'green';
            audio_manager.onPlay(this.choiced_camera_info.audio);
            this.onLoadView(false);
            this.onChangeLockButtonView(choiced_camera.canLock);
        }
    },300)
        this.isOpen = !this.isOpen;
    }


    onGenerateGeneratorRoomList(){
        
        if(this.enabled_generator_room_list.size){
            this.enabled_generator_room_list.forEach(((generator_room)=>{
                generator_room.style.visibility = 'hidden';
            }))
        }

        this.enabled_generator_room_list.clear();
        
        const current_quantity = onRandomNumber(2,3);

        while (this.enabled_generator_room_list.size < current_quantity) {
            const random_generator_room = onRandomNumber(0,4);
            this.enabled_generator_room_list.add((this.generator_room_camera_list[random_generator_room]));
        }

        this.enabled_generator_room_list.forEach((generator_room)=>{
            const current_room = this.camera_list.find((camera_item)=>camera_item.number === Number.parseInt(generator_room.id.slice(6)))
            current_room.isEnabled = true;
            current_room.isLocked = false;
        });

        this.enabled_generator_room_list.forEach(((generator_room)=>{
                generator_room.style.visibility = 'visible';
        }))

    }

    onChangeCurrentCamera(){

        this.accessible_camera_list.forEach((camera_item)=>{
            const camera_item_container = camera_item.children[0]
            camera_item_container.onclick = ()=>{
                const camera_number = Number.parseInt(camera_item_container.id.replace("place-",""));
                    const choiced_camera = this.camera_list.find((item)=>{
                    return item.number === camera_number
                }) 
                this.onSelectPlace().style.background = 'gray'
                camera_item_container.style.background = 'green';
                if(this.choiced_camera_info.number !== choiced_camera.number){
                    this.choiced_camera_info.audio = choiced_camera.current_audio;
                    this.choiced_camera_info.repeat_audio = choiced_camera.repeat_audio;
                    this.choiced_camera_info.image = choiced_camera.current_view;
                    console.log(choiced_camera.current_view)
                    this.choiced_camera_info.number = choiced_camera.number;
                    this.onLoadView(true);
                }
                this.onChangeLockButtonView(choiced_camera.canLock,choiced_camera.isLocked);
            }
        })

    }

}

export {
    Monitor
}