
const game_preferences = {
    item_preference_param:new URLSearchParams(window.location.search),
    onGetItemChoice(){
        const flashlight = this.item_preference_param.get("flashlight");
        const audio_system = this.item_preference_param.get("audio_system");
        return {
            flashlight:flashlight === 'true',
            audio_system:audio_system === 'true'
        }

    }

}

export {
    game_preferences
}