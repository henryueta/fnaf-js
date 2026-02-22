
class Jumpscare{

    constructor(config){
        this.jumpscare_room_context = config.jumpscare_room_context;
        this.canvas_height = config.canvas_height;
        this.canvas_width = config.canvas_width;
        this.animatronic_identifier = config.animatronic_identifier;
        this.unloaded_frame_list = config.unloaded_frame_list;
        this.loaded_frame_list = []; 
        this.isLoadedFrameList = false;
        this.scream_audio = config.scream_audio;
        this.frame_animation_info = {
            animation_id:null,
            current_index:0,
            next_index:1,
            alpha:0,
            transition_speed:0.5 
        }

    }   

    onLoadFrames(){

        let loaded = 0;
        for (let i = 0; i < this.unloaded_frame_list.length; i++) {
        let image = new Image();
        image.src = this.unloaded_frame_list[i];
        image.onload = () => {
            loaded++;
            if (loaded === this.unloaded_frame_list.length) {
                this.isLoadedFrameList = true;
                this.onAnimate();
                setTimeout(()=>{
                    this.onEnd();
                },2500)
            }
        };
        this.loaded_frame_list.push(image);
        }

    }

    onDraw(image,alpha_value = 1){

        this.jumpscare_room_context.globalAlpha = alpha_value;

        const cw = this.canvas_width;
        const ch = this.canvas_height;
        const iw = image.width;
        const ih = image.height;
        const scale = Math.max(cw / iw, ch / ih);
        const x = (cw / 2) - (iw * scale / 2);
        const y = (ch / 2) - (ih * scale / 2);

        this.jumpscare_room_context.drawImage(image, x, y,iw * scale, ih * scale);
        this.jumpscare_room_context.globalAlpha = 1;

    }

    onAnimate(){
        this.jumpscare_room_context.clearRect(0, 0, this.canvas_width, this.canvas_height);

            this.onDraw(this.loaded_frame_list[this.frame_animation_info.current_index], 1);
            this.onDraw(this.loaded_frame_list[this.frame_animation_info.next_index], this.frame_animation_info.alpha);

            this.frame_animation_info.alpha += this.frame_animation_info.transition_speed;

            if (this.frame_animation_info.alpha >= 1) {
                this.frame_animation_info.alpha = 0;
                this.frame_animation_info.current_index = this.frame_animation_info.next_index;
                this.frame_animation_info.next_index = (this.frame_animation_info.next_index + 1) % this.loaded_frame_list.length;
            }

            this.frame_animation_info.animation_id = requestAnimationFrame(()=>this.onAnimate());
    }

    onStart(){
        this.onLoadFrames();
    }

    onEnd(){    

        if(this.frame_animation_info.animation_id === null){
            throw new Error("Identificador de animação jumpscare inválido")
        }
            cancelAnimationFrame(this.frame_animation_info.animation_id)
            this.frame_animation_info.animation_id = null;
            return
    }

}

export {
    Jumpscare
}