
class Slider{
    constructor(config){
        this.current_text_index = 0;
        this.char_index = 0;
        this.isWriting = false;
        this.text_list = config.text_list;
        this.current_slider_text_container = config.current_slider_text_container;
        this.next_slider_text_container = config.next_slider_text_container;
        this.cancel_slider_container = config.cancel_slider_container;
        this.write_timeout = null;
        this.isCanceled = false;
        this.onCancel = config.onCancel
        this.onEnd = config.onEnd;
        this.enableClick = config.enableClick
        this.next_slider_text_container.addEventListener("click", () => {

        if (this.isWriting || !this.enableClick) {
            console.log("denied")
            return;
        }

        this.current_text_index++;
        if (this.current_text_index < this.text_list.length) {
            this.onViewStoryText();
            
        } else{
            this.current_slider_text_container.textContent = "";
            this.next_slider_text_container.style.display = "none";
            this.onEnd();
        }
          
        });

        this.cancel_slider_container.addEventListener('click',()=>{

            if(!this.enableClick){
                return
            }

            this.isCanceled = true;
            if(this.write_timeout !== null){
                clearTimeout(this.write_timeout);
                this.write_timeout = null;
            }
            this.current_slider_text_container.textContent = "";
            this.next_slider_text_container.style.display = "none";
            this.onCancel();
        },{once:true})

    }
    onViewStoryText() {
        this.onWriteStoryText(this.text_list[this.current_text_index]);
    }
    onWriteStoryText(text){
        this.isWriting = true;
        this.current_slider_text_container.textContent = "";
        this.char_index = 0;
            
        const onWrite = ()=> {

            if(this.isCanceled){
                clearTimeout(this.write_timeout);
                this.write_timeout = null;
            }

            if (this.char_index < text.length) {
            this.current_slider_text_container.textContent += text.charAt(this.char_index);
            this.char_index++;
            this.write_timeout = setTimeout(onWrite, 40);
            this.current_slider_text_container.style.height = (this.current_slider_text_container.scrollHeight) + 'px';
            return
            } else{
            this.isWriting = false;
            }
            
        }
        onWrite();
    }
}
export {
    Slider
}