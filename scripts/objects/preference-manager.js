
const preference_manager = {
    game_preference_choice_container:document.querySelector(".game-preference-choice-container"),
    cancel_game_preference_container:document.querySelector(".cancel-game-preference-container"),
    confirm_game_preference_container:document.querySelector(".confirm-game-preference-container"),
    flash_light_option:document.querySelector("#flashlight-choice-button"),
    camera_option:document.querySelector("#camera-choice-button"),
    choosen_option:null,
    isStarted:false,
    onStart(){
    
        if(!!this.isStarted){
            return
        }
        this.isStarted = true;

        this.flash_light_option.addEventListener("click",()=>{
            this.choosen_option = 'flashlight';
        })

        this.camera_option.addEventListener("click",()=>{
            this.choosen_option = 'camera';
        })

        this.cancel_game_preference_container.addEventListener('click',()=>{
            this.game_preference_choice_container.style.display = 'none';
        })
        this.confirm_game_preference_container.addEventListener("click",()=>{
            console.log(this.choosen_option)
        })
    }
}

export {
    preference_manager
}