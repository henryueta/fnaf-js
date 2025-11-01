
class Monitor {
    constructor(config){
        this.screen_container = config.screen_container;
        this.isOpen = false;
        this.camera_list_container = config.camera_list_container;
        this.camera_list = config.camera_list;
        this.choiced_camera_canvas = config.choiced_camera_canvas;
        this.choiced_camera_context = this.choiced_camera_canvas.getContext("2d")
        this.choiced_camera_number =  this.camera_list[0].number;
        this.choiced_camera_image = new Image();
        this.choiced_camera_image.src = this.camera_list[0].current_view;
        this.choiced_camera_image.onload = 
        () => {
            const cw = this.choiced_camera_canvas.width;
            const ch = this.choiced_camera_canvas.height;
            const iw = this.choiced_camera_image.width;
            const ih = this.choiced_camera_image.height;

            const scale = Math.max(cw / iw, ch / ih);

            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);

            this.choiced_camera_context.drawImage(this.choiced_camera_image, x, y, iw * scale, ih * scale);
        };
    }

    onViewCurrentCamera(){
        // img.onload = 
    }

    onToggle(){
    this.screen_container.classList.remove(!!this.isOpen ? 'open-cam-system' : 'close-cam-system')

    this.screen_container.classList.add(!!this.isOpen ? "close-cam-system" : 'open-cam-system')
    
    this.screen_container.parentElement.style.pointerEvents = (!!this.isOpen ? "none" : 'visible')

    setTimeout(()=>{
        this.screen_container.style.display = (!!this.isOpen ? "block" : "none")
    },300)
        this.isOpen = !this.isOpen;
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
                this.choiced_camera_image.src = choiced_camera.current_view;
                this.choiced_camera_number = choiced_camera.number;
            }
        })

    }

}

export {
    Monitor
}