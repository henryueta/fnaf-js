
class Monitor {
    constructor(config){
        this.screen_container = config.screen_container;
        this.isOpen = false;
        this.camera_list_container = config.camera_list_container;
        this.camera_list = config.camera_list;
        this.choiced_camera_canvas = config.choiced_camera_canvas;
        this.choiced_camera_context = this.choiced_camera_canvas.getContext("2d")
        
        this.choiced_camera_info = {
            number:this.camera_list[0].number,
            image:new Image(),
            audio:new Audio(),
            repeat_audio:this.camera_list[0].repeat_audio
        }
        this.choiced_camera_info.image.src =  this.camera_list[0].current_view;
        this.choiced_camera_info.audio.src = this.camera_list[0].current_audio;
        this.choiced_camera_info.audio.loop = !!this.choiced_camera_info.repeat_audio;

        this.choiced_camera_info.number =  this.camera_list[0].number;
        
        this.choiced_camera_info.image.onload = 
        () => {
            const cw = this.choiced_camera_canvas.width;
            const ch = this.choiced_camera_canvas.height;
            const iw = this.choiced_camera_info.image.width;
            const ih = this.choiced_camera_info.image.height;

            const scale = Math.max(cw / iw, ch / ih);

            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);

            this.choiced_camera_context.drawImage(this.choiced_camera_info.image, x, y, iw * scale, ih * scale);
            if(this.isOpen){
                this.choiced_camera_info.audio.play();
            }
        };
    }

    onViewCurrentCamera(){
        // img.onload = 
    }

    onToggle(){
    this.screen_container.classList.remove(!!this.isOpen ? 'open-cam-system' : 'close-cam-system')

    this.screen_container.classList.add(!!this.isOpen ? "close-cam-system" : 'open-cam-system')
    
    this.screen_container.parentElement.style.pointerEvents = (!!this.isOpen ? "none" : 'visible')
    const last_choiced_camera_number = this.choiced_camera_info.number;

    this.onResetCurrentCamera();
    setTimeout(()=>{
       
        this.screen_container.style.display = (!!this.isOpen ? "block" : "none");
        const choiced_camera = this.camera_list.find((item)=>{
            return item.number === last_choiced_camera_number
        }); 
        this.choiced_camera_info.audio.src = choiced_camera.current_audio;
        this.choiced_camera_info.image.src = choiced_camera.current_view;
        this.choiced_camera_info.number = choiced_camera.number;
        if(!!this.isOpen){
            console.log(last_choiced_camera_number)
           console.log("repetir",this.choiced_camera_info.repeat_audio)
            this.choiced_camera_info.audio.play();
            // console.log(this.choiced_camera_info.audio.src);
        }
    },300)
        this.isOpen = !this.isOpen;
    }

    onResetCurrentCamera(){
        this.choiced_camera_info.number = null;
        this.choiced_camera_info.audio.src = "../assets/audio/key_insert.mp3";
        this.choiced_camera_info.image.src = "../assets/imgs/loading.jpg";
    }

    onChangeCurrentCamera(){
        const accessible_camera_list =
         Array.from(this.camera_list_container.children).filter((camera_item)=>
            camera_item.className === 'accessible-place'
        );
        
        accessible_camera_list.forEach((camera_item)=>{
            
            camera_item.onclick = ()=>{
                const camera_number = Number.parseInt(camera_item.id.replace("place-",""));
                const choiced_camera = this.camera_list.find((item)=>{
                    return item.number === camera_number
                }) 
                if(this.choiced_camera_info.number !== choiced_camera.number){
                    this.choiced_camera_info.audio.src = choiced_camera.current_audio;
                    this.choiced_camera_info.repeat_audio = choiced_camera.repeat_audio;
                    this.choiced_camera_info.image.src = choiced_camera.current_view;
                    this.choiced_camera_info.number = choiced_camera.number;
                }
            }
        })

    }

}

export {
    Monitor
}