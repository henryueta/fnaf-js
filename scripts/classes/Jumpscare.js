
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

        const room_canvas_ratio = this.canvas_width / this.canvas_height;
        const image_ratio = image.width / this.canvas_height;

        let draw_width, draw_height, offset_x, offset_y;

        if (image_ratio > room_canvas_ratio) {
            draw_height = this.canvas_height;
            draw_width = image.width * (this.canvas_width / this.canvas_height);
            offset_x = (canvas.width - draw_width) / 2;
            offset_y = 0;
        } else {
            draw_width = this.canvas_width;
            draw_height = this.canvas_height * (this.canvas_width / image.width);
            offset_x = 0;
            offset_y = (this.canvas_width - draw_height) / 2;
        }

        this.jumpscare_room_context.drawImage(image, offset_x, offset_y, draw_width, draw_height);
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