import { audio_manager } from "../audio-manager.js";

class TaskMonitor {

    constructor(config){
        this.screen_container = config.screen_container;
        this.isOpen = false;
        this.task_list_container = config.task_list_container;
        this.task_list = config.task_list = config.task_list;
        this.current_task_in_progress = null;
        this.task_progress_audio = config.task_progress_audio;
        this.task_resolve_interval = null;
        this.task_resolve_value = 20000;
        
        

        this.task_list.forEach((task_item)=>{

            const task_item_container = document.createElement("div");
        task_item_container.setAttribute("class","task-item-container");

        const progress_container = document.createElement("div");
        progress_container.setAttribute('class',"progress-container");

        const name_container = document.createElement("div");
        name_container.setAttribute("class","name-container");
        name_container.innerHTML = "<p></p>";

        const duration_container = document.createElement("div");
        duration_container.setAttribute("class","duration-container");
        duration_container.innerHTML = "<p></p>"

        const actions_container = document.createElement("div");
        actions_container.setAttribute("class","actions-container");

        const start_button = document.createElement("button");
        start_button.setAttribute("id","start-task")

        const stop_button = document.createElement("button");
        stop_button.setAttribute("id","stop-task");

        actions_container.append(start_button);
        actions_container.append(stop_button);

            name_container.children[0].textContent = task_item.name;
            duration_container.children[0].textContent = (task_item.final_progress_value * this.task_resolve_value)/1000/60;

            task_item_container.append(progress_container);
            task_item_container.append(name_container);
            task_item_container.append(duration_container);
            task_item_container.append(actions_container);
            task_item_container.setAttribute("id","task-"+task_item.identifier);
            task_item_container.onclick = ()=>{
                console.log(task_item_container.id)
            }
            this.task_list_container.append(task_item_container)           
        });
    }

    onToggle(){
        console.log(this.screen_container)
        this.screen_container.classList.remove(!!this.isOpen ? 'open-cam-system' : 'close-cam-system')

        this.screen_container.classList.add(!!this.isOpen ? "close-cam-system" : 'open-cam-system')
        
        this.screen_container.parentElement.style.pointerEvents = (!!this.isOpen ? "none" : 'visible')

        setTimeout(()=>{
             this.screen_container.style.display = (!!this.isOpen ? "block" : "none");
        },300)
        this.isOpen = !this.isOpen;

    }

    onResolve(){
        // audio_manager.onPlay("",null,true);

        if(this.current_task_in_progress !== null){
            return
        }

        this.current_task_in_progress.inProgress = true;

        this.task_resolve_interval = setInterval(()=>{

            this.current_task_in_progress.onProgress(()=>{
                this.current_task_in_progress = null;
                // audio_manager.onStop("")
            })

        },this.task_resolve_value)
    }

    onStop(){

        if(this.task_resolve_interval === null){
            return
        }

        clearInterval(this.task_resolve_interval);
        this.current_task_in_progress.inProgress = false;
        this.current_task_in_progress = null;

    }

}

export {
    TaskMonitor
}