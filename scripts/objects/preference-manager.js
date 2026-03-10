
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
            if(this.choosen_option === 'camera'){
                this.camera_option.classList.remove("choosen");
            }
            this.choosen_option = 'flashlight';
            this.flash_light_option.classList.add("choosen");
        })

        this.camera_option.addEventListener("click",()=>{
            if(this.choosen_option === 'flashlight'){
                this.flash_light_option.classList.remove("choosen");
            }
            this.choosen_option = 'camera';
            this.camera_option.classList.add("choosen");
        })

        this.cancel_game_preference_container.addEventListener('click',()=>{
            this.game_preference_choice_container.style.display = 'none';
            if(this.choosen_option === 'flashlight'){
                this.flash_light_option.classList.remove("choosen");
            }
            if(this.choosen_option === 'camera'){
                this.camera_option.classList.remove("choosen");
            }
            this.choosen_option = null;
        })
        this.confirm_game_preference_container.addEventListener("click",()=>{
            

            window.location.replace("./pages/security-room.html"
                +"?flashlight="+(this.choosen_option === 'flashlight'
                    ? 'true'
                    : 'false'
                )
                +'&audio_system='+(
                    this.choosen_option === 'camera'
                    ? 'true'
                    : 'false'
                )
            );

        })
    }
}

export {
    preference_manager
}