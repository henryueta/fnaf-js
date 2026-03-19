
const game_preferences = {
    item_preference_param:new URLSearchParams(window.location.search),
    onGetItemChoice(){
        const free_mode = this.item_preference_param.get("freeMode");
        return {
            free_mode:free_mode.toLowerCase() === 'true'
        }

    }

}

export {
    game_preferences
}