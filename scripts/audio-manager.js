
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
    onPlay(name){

        if(this.context.state === 'suspended'){
            this.context.resume();
        }

        const source = this.context.createBufferSource();
        source.buffer = this.buffer_list[name];
        console.log(this.buffer_list)
        source.connect(this.context.destination);
        source.start(0);
        this.active_audio_list[name] = source;
        source.onended = ()=>{
            delete this.active_audio_list[name];
        }
    },
    onStop(name){
        if(!!this.active_audio_list[name]){

            this.active_audio_list[name].stop();
            delete this.active_audio_list[name];

        }
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