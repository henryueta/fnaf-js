class Task {

    constructor(config){
        this.identifier = config.identifier;
        this.name = config.name;
        this.inProgress = false;
        this.itsFinished = false;
        this.to_install = config.to_install;
        this.current_progress_value = 0;
        this.final_progress_value = config.final_progress_value;
    }

    onProgress(onProcess,onEnd){
        this.current_progress_value+=1;
            console.log("Em processo :",this.current_progress_value)

        if(onProcess){
            onProcess();
        }

        if(this.current_progress_value === this.final_progress_value){
            this.inProgress = false;
            this.itsFinished = true;
            if(onEnd){
                onEnd();
                return
            }
            return
        }
    }

}

export{
    Task
}