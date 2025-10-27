
let isOpen = false;

const onSystemCam = ()=>{
    const screen_container = document.querySelector(".screen-container")
    screen_container.classList.remove(!!isOpen ? 'open-cam-system' : 'close-cam-system')

    screen_container.classList.add(!!isOpen ? "close-cam-system" : 'open-cam-system')
    
    setTimeout(()=>{
        screen_container.style.display = (!!isOpen ? "block" : "none")
    },300)
    isOpen = !isOpen;
}

const toggle_cam_system_button = document.querySelector(".toggle-cam-system-button")

toggle_cam_system_button.addEventListener('click',()=>{
    onSystemCam()
    if(!!x_move_interval){
        clearInterval(x_move_interval)
    }
})

let x_value = -25; 
let x_move_interval = null;

const move_right_container = document.querySelector(".move-right-container")

move_right_container.addEventListener('mouseenter',()=>{
    if(!isOpen)
    x_move_interval = setInterval(() => {
        if(x_value >= -32.3){
            console.log(x_value)
            x_value -= 1.2;
        } else{
            clearInterval(x_move_interval)
        }
        console.log("AA")
         document.querySelector(".room-container")
            .style.transform = 'translateX('+x_value+'%)'
   }, 10);

})

move_right_container.addEventListener('mouseleave',()=>{
    if(!isOpen)
    if(!!x_move_interval){
        clearInterval(x_move_interval)
    }

})

const move_left_container = document.querySelector(".move-left-container")

move_left_container.onmouseenter = ()=>{
    if(!isOpen)
    x_move_interval = setInterval(() => {
        if(x_value < 0){
            console.log(x_value)
            x_value += 1.2;
        }else{
            clearInterval(x_move_interval)
        }
         document.querySelector(".room-container")
            .style.transform = 'translateX('+x_value+'%)'
   }, 10);
}

move_left_container.onmouseleave = ()=>{
    if(!isOpen)
    if(!!x_move_interval){
        clearInterval(x_move_interval)
    }
}
