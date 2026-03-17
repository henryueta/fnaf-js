import { audio_manager } from "../audio-manager.js";
import { onRandomNumber } from "../functions/randomNumber.js";

class CameraMonitor {
    constructor(config){
        this.screen_container = config.screen_container;
        this.isOpen = false;
        this.isRunningOperation = false;
        this.activeLock = true;
        this.camera_list_container = config.camera_list_container;
        this.camera_list = config.camera_list;
        this.action_button_list = config.action_button_list;
        this.chosen_camera_canvas = config.chosen_camera_canvas;
        this.chosen_camera_context = this.chosen_camera_canvas.getContext("2d");
        this.current_played_room = null;
        this.loading_image = config.loading_image;
        this.onPlayedPlace = config.onPlayedPlace;
        this.onLockCheckout = config.onLockCheckout;
        this.chosen_camera_info = {
            number:this.camera_list[0].number,
            image:null,
            audio:null,
            repeat_audio:this.camera_list[0].repeat_audio
        }
        this.isInstalled = config.isInstalled;

        this.chosen_camera_info.image =  this.camera_list[0].current_view;
        this.chosen_camera_info.audio = this.camera_list[0].current_audio;
        // this.chosen_camera_info.audio.loop = !!this.chosen_camera_info.repeat_audio;
        this.chosen_camera_info.number =  this.camera_list[0].number;
        
        this.accessible_camera_list =  Array.from(this.camera_list_container.children)
        .filter((camera_item)=>
            camera_item.children.length && Array.from(camera_item.children)[0].id.includes('place-')   
        );

        this.generator_room_camera_list = Array.from(this.camera_list_container.children)
        .filter((camera_item)=>
            camera_item.className.includes('generator-room')
        ).map((camera_item)=>camera_item.children[0])

        this.enabled_audio_room_list = new Set();

      if(!!this.action_button_list){

        const place_lock_switch = this.action_button_list.place_lock_switch;
        place_lock_switch.onclick = ()=>{
                this.onLockCheckout();

                // if(!this.activeLock){
                //     audio_manager.onPlay('action_denied')
                //     return
                // }
                
            if(!this.isRunningOperation){

            const chosen_camera = this.onFindChoiceCamera();
            
            if(this.current_played_room === null){
                this.current_played_room = chosen_camera.number;
            }
            
            if(!chosen_camera.onPlayAudio(this.current_played_room)){
                audio_manager.onPlay('action_denied')
                return
            }

            this.isRunningOperation = true;
            place_lock_switch.textContent = "Running. . .";
            place_lock_switch.classList.add("user-lock-switch");

            chosen_camera.hearable_place_list.forEach((hearable_place_item)=>{
                const current_hearable_place = document.querySelector("#place-"+hearable_place_item)
                current_hearable_place.classList.add("hearable-place")
                setTimeout(()=>{
                    current_hearable_place.classList.remove("hearable-place")
                },800)
            })

            setTimeout(()=>{
                audio_manager.onPlay('cat_voice_'+onRandomNumber(1,7));
                place_lock_switch.textContent = (
                    !chosen_camera.isAudioPlayed
                    ? "Play Audio"
                    : ". . ."
                )
                place_lock_switch.classList.remove("user-lock-switch");
                
                this.chosen_camera_info.image =  chosen_camera.current_view;
                this.chosen_camera_info.audio = chosen_camera.current_audio;
                // this.chosen_camera_info.audio.loop = chosen_camera
                console.log("chamado",chosen_camera.isAudioPlayed);
                    this.onPlayedPlace(chosen_camera.number);

               setTimeout(()=>{
                this.isRunningOperation = false;
               },200)
            },500)
            }
            
        }
      }

        // this.chosen_camera_info.image.onload = 
        // () => {
            
        // };
        this.onGenerateGeneratorRoomList();
    }


    onFindChoiceCamera(){
        return  this.camera_list.find((camera_item)=>
                camera_item.number === this.chosen_camera_info.number
            )
    }

    onFindPlayedRoom(){
        return this.camera_list.find((camera_item)=>
                camera_item.number === this.current_played_room
            )
    }

    onLoadView(playAudio){
            
            const cw = this.chosen_camera_canvas.width;
            const ch = this.chosen_camera_canvas.height;
            const iw = this.chosen_camera_info.image.width;
            const ih = this.chosen_camera_info.image.height;

            const scale = Math.max(cw / iw, ch / ih);

            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);
            this.chosen_camera_context.drawImage(this.chosen_camera_info.image, x, y, iw * scale, ih * scale);
            if(this.isOpen && !!playAudio){
                audio_manager.onPlay(this.chosen_camera_info.audio)
            }
    }

    onViewCurrentCamera(){
        // img.onload = 
    }

    onSelectPlace(){
        return document.querySelector("#place-"+this.chosen_camera_info.number);
    }

    onChangePlayButtonView(canPlayAudio,isAudioPlayed){
        console.log(isAudioPlayed)
         this.action_button_list.place_lock_switch.textContent = (
            this.current_played_room !== null
            ? '. . .'
            : 'Play Audio'
         )

        if(canPlayAudio){
            this.action_button_list.place_lock_switch.style.display = 'block';
            return
        }
        this.action_button_list.place_lock_switch.style.display = 'none';
        return
    }

    onToggle(){
         if(!this.isInstalled){
            return
        }

    this.screen_container.classList.remove(!!this.isOpen ? 'open-cam-system' : 'close-cam-system')

    this.screen_container.classList.add(!!this.isOpen ? "close-cam-system" : 'open-cam-system')
    
    this.screen_container.parentElement.style.pointerEvents = (!!this.isOpen ? "none" : 'visible')
    const last_chosen_camera_number = this.chosen_camera_info.number;

    // this.onResetCurrentCamera();
    setTimeout(()=>{
        this.screen_container.style.display = (!!this.isOpen ? "block" : "none");
        const chosen_camera = this.camera_list.find((item)=>{
            return item.number === last_chosen_camera_number
        }); 
        this.chosen_camera_info.audio = chosen_camera.current_audio;
        this.chosen_camera_info.image = chosen_camera.current_view;
        this.chosen_camera_info.number = chosen_camera.number;
        if(!!this.isOpen){
            this.onSelectPlace().style.background = 'green';
            audio_manager.onPlay(this.chosen_camera_info.audio);
            this.onLoadView(false);
            this.onChangePlayButtonView(chosen_camera.canPlayAudio,chosen_camera.isAudioPlayed);
        }
    },300)
        this.isOpen = !this.isOpen;
    }


    onUpdateGeneratorRoomList(type){

            if(!!this.enabled_audio_room_list.size){

            this.enabled_audio_room_list.forEach(((generator_room)=>{
                generator_room.parentElement.style.visibility = (
                    type === 'start'
                    ? 'visible'
                    : 'hidden'
                );
            }))


            this.enabled_audio_room_list.forEach((generator_room)=>{
                const current_room = this.camera_list.find((camera_item)=>camera_item.number === Number.parseInt(generator_room.id.slice(6)))
                current_room.isEnabled = !!(type === 'start');
                current_room.isAudioPlayed = !!(type === 'reset');
            });

            }


            if(type === 'reset'){
                
                this.enabled_audio_room_list.clear();
                return
            }
            return
    }

    onGenerateGeneratorRoomList(){

        this.onUpdateGeneratorRoomList('reset');
        
        const current_quantity = 5;

        while (this.enabled_audio_room_list.size < current_quantity) {
            const random_generator_room = onRandomNumber(0,4);
            this.enabled_audio_room_list.add((this.generator_room_camera_list[random_generator_room]));
        }

        this.onUpdateGeneratorRoomList('start');

    }

    onChangeCurrentCamera(){

        this.accessible_camera_list.forEach((camera_item)=>{
            const camera_item_container = camera_item.children[0]
            camera_item_container.onclick = ()=>{
                const camera_number = Number.parseInt(camera_item_container.id.replace("place-",""));
                    const chosen_camera = this.camera_list.find((item)=>{
                    return item.number === camera_number
                }) 
                this.onSelectPlace().style.background = 'gray'
                camera_item_container.style.background = 'green';
                if(this.chosen_camera_info.number !== chosen_camera.number){
                    this.chosen_camera_info.audio = chosen_camera.current_audio;
                    this.chosen_camera_info.repeat_audio = chosen_camera.repeat_audio;
                    this.chosen_camera_info.image = chosen_camera.current_view;
                    console.log(chosen_camera.current_view)
                    this.chosen_camera_info.number = chosen_camera.number;
                    this.onLoadView(true);
                }
                this.onChangePlayButtonView(chosen_camera.canPlayAudio,chosen_camera.isAudioPlayed);
            }
        })

    }

}

export {
    CameraMonitor
}