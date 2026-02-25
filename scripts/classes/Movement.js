
class Movement{

    constructor(config){
        this.x_value = -7; 
        this.x_move_interval = null;
        this.current_movement = null;
        this.isLocked = false;
        this.right_container = config.right_container;
        this.left_container = config.left_container;
        this.mobile_movement = null;
    }



    onMove(screen_display){

        if(screen_display === 'MOBILE'){

            this.mobile_movement = {
                timeout:null,
                timer_value:50,
                isLongPress:false
            }

            this.right_container.addEventListener('touchstart',(e)=>{
                this.onMobileMove('start','right',e);
            });
            this.right_container.addEventListener('touchend',()=>{
                this.onMobileMove('end','right');
            });
            this.right_container.addEventListener('touchcancel',()=>{
                this.onMobileMove('cancel','right');
            });
            this.left_container.addEventListener('touchstart',(e)=>{
                this.onMobileMove('start','left',e);
            });
            this.left_container.addEventListener('touchend',()=>{
                this.onMobileMove('end','left');
            });
            this.left_container.addEventListener('touchcancel',()=>{
                this.onMobileMove('cancel','left');
            });

            return
        }

        this.right_container.onmouseenter = ()=>{
            this.onStartMove('right');
        }
        this.left_container.onmouseenter = ()=>{
            this.onStartMove('left');
        }
        this.right_container.onmouseleave = ()=>{
            this.onEndMove();
        }
        this.left_container.onmouseleave = ()=>{
            this.onEndMove();
        }
    }

    onChangeXVision(){
        document.querySelector(".room-container")
        .style.transform = 'translateX('+this.x_value+'%)';
    }

    onMobileMove(type,movement,touch_event){
        
        if(type === 'start'){
            touch_event.preventDefault();
            this.mobile_movement.isLongPress = false;
            this.mobile_movement.timeout = setTimeout(()=>{
                this.mobile_movement.isLongPress = true;
                this.onStartMove(movement);
            },this.mobile_movement.timer_value);
            return
        }
        if(type === 'end'){
            if(!this.mobile_movement.isLongPress){
                this.onStartMove(movement);
            }
            clearTimeout(this.mobile_movement.timeout);
             this.mobile_moviment_timeout = null;
             return
        }
        if(type === 'cancel'){
            clearTimeout(this.mobile_movement.timeout);
            return
        }
    }

    onStartMove(movement){

        this.current_movement = movement;

            if(this.isLocked){
                return
            }
            if(!this.current_movement){
                return
            }
                 this.x_move_interval = setInterval(() => {
                    
                    if(!this.isLocked && (
                        this.current_movement === 'right'
                        ? this.x_value  >= -8.3
                        : 
                        this.current_movement === 'left'
                        && this.x_value  < 0
                    )){
                        this.x_value +=(
                            this.current_movement === 'right'
                            ? -1.2
                            : 1.2
                        );
                    } else{
                        this.left_container.style.display = (this.x_value.toFixed() == 0 ? 'none' : 'block')
                        this.right_container.style.display = (this.x_value.toFixed() == -9 ? 'none' : 'block')
                        clearInterval(this.x_move_interval);
                    }
                    this.onChangeXVision();
            }, 30);
    }

    onEndMove(){
        if(!this.isLocked){
            if(!!this.x_move_interval){
                clearInterval(this.x_move_interval)
            }
        }
    }
    setIsLocked(isLocked,resetX){
        this.isLocked = isLocked;
        this.right_container.style.display = (!!isLocked ? "none" : "block");
        this.left_container.style.display = (!!isLocked ? "none" : "block");
        this.onEndMove();

        if(resetX){
            this.x_value = -4.5;
            this.onChangeXVision();
        }

       
    }

}

export {
    Movement
}