
class Moviment{

    constructor(config){
        this.x_value = 0; 
        this.x_move_interval = null;
        this.current_moviment = null;
        this.isLocked = false;
        this.right_container = config.right_container;
        this.left_container = config.left_container;
    }

    onMove(){
        this.right_container.onmouseenter = ()=>{
            this.current_moviment = 'right'
            this.onStartMove()
        }
        this.left_container.onmouseenter = ()=>{
            this.current_moviment = 'left'
            this.onStartMove()

        }
        this.right_container.onmouseleave = ()=>{
            this.onEndMove()
        }
        this.left_container.onmouseleave = ()=>{
            this.onEndMove()
        }

    }

    onStartMove(){
        if(!this.isLocked){
            if(!!this.current_moviment){
                 this.x_move_interval = setInterval(() => {
                    if((
                        this.current_moviment === 'right'
                        ? this.x_value  >= -8.3
                        : 
                        this.current_moviment === 'left'
                        && this.x_value  < 0
                    )){
                        console.log(this.x_value)
                        this.x_value +=(
                            this.current_moviment === 'right'
                            ? -1.2
                            : 1.2
                        );
                    } else{
                        clearInterval(this.x_move_interval)
                    }
                    document.querySelector(".room-container")
                    .style.transform = 'translateX('+this.x_value+'%)'
            }, 10);
            }
        }
    }

    onEndMove(){
        if(!this.isLocked){
            if(!!this.x_move_interval){
                clearInterval(this.x_move_interval)
            }
        }
    }
    setIsLocked(isLocked){
        this.isLocked = isLocked
    }

}

export {
    Moviment
}