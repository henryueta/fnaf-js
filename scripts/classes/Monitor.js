
class Monitor {
    constructor(config){
        this.screen_container = config.screen_container;
        this.isOpen = false;
    }

    onToggle(){
    this.screen_container.classList.remove(!!this.isOpen ? 'open-cam-system' : 'close-cam-system')

    this.screen_container.classList.add(!!this.isOpen ? "close-cam-system" : 'open-cam-system')
    
    setTimeout(()=>{
        this.screen_container.style.display = (!!this.isOpen ? "block" : "none")
    },300)
        this.isOpen = !this.isOpen;
    }

}

export {
    Monitor
}