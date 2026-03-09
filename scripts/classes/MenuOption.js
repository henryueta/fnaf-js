
class MenuOption {

    constructor(config){
        this.title = config.title;
        this.option_button = config.option_button;
        this.isChosen = false;
        this.onHandleChoice = config.onHandleChoice;
        console.log(this.option_button)
        this.option_button.onclick = ()=>{
            this.onChoice();
        };
    }
    
    onChoice(){
        this.isChosen = true;
        if(!!this.onHandleChoice){
            this.onHandleChoice();
        }

    }

}

export {
    MenuOption
}