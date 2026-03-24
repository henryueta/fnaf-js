
const audio_manager = {

    context: new AudioContext(),
    buffer_list:{},
    active_audio_list:{},
    async onPreload(audio_list,onEnd){
        for(const [name,url] of Object.entries(audio_list)){

            const response = await fetch(url);
            const array_buffer = await response.arrayBuffer();
            this.buffer_list[name] = await this.context.decodeAudioData(array_buffer);

        }   
        if(onEnd){
            onEnd();
        }
    },
    onPlay(name,onEnd,volume = 1,loop = false){


        if(this.context.state === 'suspended'){
            this.context.resume();
        }

        const source = this.context.createBufferSource();
        source.buffer = this.buffer_list[name];
        const gain_node = this.context.createGain();
        gain_node.gain.value = volume;
        source.connect(gain_node) 
        gain_node.connect(this.context.destination);
        source.loop = loop;
        source.start(0);
        
        this.active_audio_list[name] = source;
        source.onended = ()=>{

            if(!!onEnd){
                onEnd();
            }

            delete this.active_audio_list[name];
        }
    },
    onStop(name){

        if(!this.active_audio_list[name]){
            return
        }
        this.active_audio_list[name].stop();
        delete this.active_audio_list[name];
        return
    },
    onPlayJustOneAudio(name){
        for(const audio_name in this.active_audio_list){
            try {
                this.onStop(audio_name);
            } catch (error) {
                console.log("audio_error",error);
            }   
            delete this.active_audio_list[audio_name];
        }
        this.onPlay(name);
    }   

}

window.addEventListener('click',()=>{
    if(audio_manager.context.state === 'suspended'){
        audio_manager.context.resume();
    }
},{once:true});

export {
    audio_manager
}