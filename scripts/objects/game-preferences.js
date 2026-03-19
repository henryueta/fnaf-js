
const game_preferences = {
    item_preference_param:new URLSearchParams(window.location.search),
    onGetItemChoice(){
        const mode_type = this.item_preference_param.get("type");
        return {
            mode_type:mode_type.toLowerCase()
        }

    }

}

export {
    game_preferences
}