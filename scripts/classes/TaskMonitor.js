import { onRandomNumber } from "../functions/randomNumber.js";


class TaskMonitor {

    constructor(config){
        this.screen_container = config.screen_container;
        this.isOpen = false;
        this.task_list_container = config.task_list_container;
        this.temperature_container = config.temperature_container;
        this.temperature_view_container = config.temperature_view_container;
        this.task_solved_quantity = 0;
        this.process_wait_container = config.process_wait_container;
        this.task_list = config.task_list = config.task_list;
        this.current_task_in_progress = null;
        this.task_progress_audio = config.task_progress_audio;
        this.task_resolve_interval = null;
        this.task_resolve_value = 5000;
        this.task_progress_loader_list = [];
        this.task_progress_button_list = [];
        this.onResolveTask = config.onResolveTask;
        this.increase_temperature_interval = null;
        this.decrease_temperature_interval = null;
        this.current_temperature_value = 35;
        this.isRestarting = false;

        this.play_icon = `
            <svg viewBox="0 0 24 24">
            <polygon points="8,5 19,12 8,19" fill="currentColor"/>
            </svg>
        `;

        this.pause_icon = `
            <svg viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" fill="currentColor"/>
            <rect x="14" y="5" width="4" height="14" fill="currentColor"/>
            </svg>
        `;

        this.task_list.forEach((task_item)=>{

            const task_item_container = document.createElement("div");
        task_item_container.setAttribute("class","task-item-container");

        const progress_container = document.createElement("div");
        progress_container.setAttribute('class',"progress-container");

        const progress_loading_container = document.createElement("div");
        progress_loading_container.setAttribute("class","progress-loading-container")
        progress_loading_container.setAttribute("id","progress-loading-"+task_item.identifier)

        this.task_progress_loader_list.push(progress_loading_container)

        progress_container.append(progress_loading_container)

        const name_container = document.createElement("div");
        name_container.setAttribute("class","name-container");
        name_container.innerHTML = "<p></p>";

        const duration_container = document.createElement("div");
        duration_container.setAttribute("class","duration-container");
        duration_container.innerHTML = "<p></p>"

        const actions_container = document.createElement("div");
        actions_container.setAttribute("class","actions-container");

        const progress_button = document.createElement("button");
        progress_button.setAttribute("class","progress-button");
        progress_button.setAttribute("id","progress-button-"+task_item.identifier);

        progress_button.innerHTML = this.play_icon;
        task_item_container.onclick = ()=>{
            console.log(this.current_task_in_progress)
                if(
                    this.current_task_in_progress !== null
                    &&
                    this.current_task_in_progress.identifier !== task_item.identifier){
                    return
                }
                if(this.current_task_in_progress !== null){
                    this.onStop();
                progress_loading_container.style.display = 'none';
                progress_button.innerHTML = this.play_icon;
                    return
                }
                this.current_task_in_progress = task_item;
                 if(
                    this.current_task_in_progress.itsFinished){
                        this.current_task_in_progress = null;
                    return
                }
                this.onResolve(()=>{
                   duration_container.children[0].textContent = this.onConvertTaskProcessValue(this.current_task_in_progress.current_progress_value)+"/"+this.onConvertTaskProcessValue(this.current_task_in_progress.final_progress_value)+"MB"

                },()=>{
                   this.task_list_container.removeChild(task_item_container)
                });
                progress_button.innerHTML = this.pause_icon;
                progress_loading_container.style.display = 'block';
                return
        }
        this.task_progress_button_list.push(progress_button);
        actions_container.append(progress_button);

            name_container.children[0].textContent = task_item.name;
            duration_container.children[0].textContent = "0/"+this.onConvertTaskProcessValue(task_item.final_progress_value)+"MB";
            task_item_container.append(progress_container);
            task_item_container.append(name_container);
            task_item_container.append(duration_container);
            task_item_container.append(actions_container);
            task_item_container.setAttribute("id","task-"+task_item.identifier);
            this.task_list_container.append(task_item_container)           
        });
    }

    onChangeVisor(type){
        this.process_wait_container.style.display = type === 'list' ? 'none' : 'flex';
        this.task_list_container.style.display = type === 'list' ? 'flex' : 'none';
        this.temperature_container.style.display = type === 'list' ? 'block' : 'none';
    }

    onConvertTaskProcessValue(value){

        return ((value * this.task_resolve_value)/1000).toFixed()

    }

    onDisableProgressLoading(){
        if(this.current_task_in_progress !== null){
            this.task_progress_loader_list.find((loader_item)=>
                loader_item.id === "progress-loading-"+this.current_task_in_progress.identifier
            ).style.display = 'none';
            this.task_progress_button_list.find((button_item)=>
                button_item.id === "progress-button-"+this.current_task_in_progress.identifier
            ).innerHTML = this.play_icon;
            if(!!this.current_task_in_progress.itsFinished){
            Array.from(this.task_list_container.children).find((task_item)=>
                    task_item.id === "task-"+this.current_task_in_progress.identifier
                ).style.display = 'none';
            }
            this.onStop();
        }
    }

    onToggle(){
        console.log(this.screen_container)

        this.onDisableProgressLoading();

        this.screen_container.classList.remove(!!this.isOpen ? 'open-cam-system' : 'close-cam-system')

        this.screen_container.classList.add(!!this.isOpen ? "close-cam-system" : 'open-cam-system')
        
        this.screen_container.parentElement.style.pointerEvents = (!!this.isOpen ? "none" : 'visible')

        setTimeout(()=>{
             this.screen_container.style.display = (!!this.isOpen ? "flex" : "none");
        },300)
        this.isOpen = !this.isOpen;

    }

    onResolve(onProcess,onEnd){
        // audio_manager.onPlay("",null,true);

        if(this.current_task_in_progress === null){
            return
        }

        this.current_task_in_progress.inProgress = true;

        this.task_resolve_interval = setInterval(()=>{
            this.current_task_in_progress.onProgress(()=>{
                if(onProcess){
                    onProcess();
                }
            },()=>{
                this.onResolveTask(this.current_task_in_progress.identifier,this.current_task_in_progress.to_install)
                this.current_task_in_progress = null;
                clearInterval(this.task_resolve_interval)
                clearInterval(this.increase_temperature_interval)
                this.increase_temperature_interval = null;
                this.onChangeTemperature('decrease')
                if(onEnd){
                    onEnd()
                }
                
                // audio_manager.onStop("")
            })

        },this.task_resolve_value);

        this.onChangeTemperature('increase')
    }

    onRestartSystem(){
        this.isRestarting = true;
        this.onDisableProgressLoading();
        this.onChangeVisor('restart');
        this.onChangeTemperatureValue(onRandomNumber(28,34))
        this.temperature_view_container.style.color = 'rgb(0, 245, 94)';
        setTimeout(()=>{
            this.onChangeVisor('list');
            this.isRestarting = false;
        },onRandomNumber(8000,10000))
    }

    onChangeTemperatureValue(value){
        this.current_temperature_value = value
        this.temperature_view_container.textContent = this.current_temperature_value+"°"
    }

    onChangeTemperature(type){
        
        if(type === 'increase'){

        if(this.decrease_temperature_interval !== null){
            clearInterval(this.decrease_temperature_interval)
            this.decrease_temperature_interval = null;
        }
        console.log('interv',this.increase_temperature_interval)

        if(this.increase_temperature_interval !== null){
            return
        }

        this.increase_temperature_interval = setInterval(()=>{
            console.log("increase")
            this.onChangeTemperatureValue(this.current_temperature_value+onRandomNumber(3,10))

            if(this.current_temperature_value >=80){
                this.temperature_view_container.style.color = 'red';
            }

            if(this.current_temperature_value >= 100){
                if(this.increase_temperature_interval !== null){
                    clearInterval(this.increase_temperature_interval)
                    this.increase_temperature_interval = null;
                    this.onRestartSystem();
                }
            return
        }

        },onRandomNumber(2500,4500))
        return
        }

        if(type === 'decrease'){
            
        if(this.increase_temperature_interval !== null){
            clearInterval(this.increase_temperature_interval)
            this.increase_temperature_interval = null;
        }   
        if(this.decrease_temperature_interval !== null){
            return
        }

        this.decrease_temperature_interval = setInterval(()=>{
            console.log("decrease")
            this.onChangeTemperatureValue(this.current_temperature_value-onRandomNumber(5,15))

            if(this.current_temperature_value <= 80){
                this.temperature_view_container.style.color = 'rgb(0, 245, 94)';
            }

            if(this.current_temperature_value <= 35){
                if(this.decrease_temperature_interval !== null){
                    clearInterval(this.decrease_temperature_interval)
                    this.decrease_temperature_interval = null;
                    if(this.current_temperature_value < 35){
                        this.onChangeTemperatureValue(onRandomNumber(30,34))
                    }
                }
            return
        }

        },onRandomNumber(1000,2500))
        return

        }
        return
    }

    onStop(){

        if(this.task_resolve_interval === null){
            return
        }

        clearInterval(this.task_resolve_interval);
        clearInterval(this.increase_temperature_interval);
        this.increase_temperature_interval = null;
        this.current_task_in_progress.inProgress = false;
        this.current_task_in_progress = null;

        

        if(this.isRestarting){
            return 
        }
   
        this.onChangeTemperature('decrease');
    }

}

export {
    TaskMonitor
}