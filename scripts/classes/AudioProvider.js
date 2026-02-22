
class AudioProvider {

    constructor(config){
        this.context = new AudioContext();
        this.gain_node = this.context.createGain();
        this.audio = config.audio;

        this.gain_node.gain.value = config.volume;
        this.gain_node.connect(this.context.destination);

        // this.panner = this.context.createStereoPanner();
        // this.panner.pan.value = config.pan_value;

        // this.gain_node.connect(this.panner);
        // this.panner.connect(this.context.destination);

        this.buffer = null;
        this.source = null;
        this.start_time = 0;
        this.pause_time = 0;

    }

    async onLoadAudio(){
        const response = await fetch(this.audio);
        const arrayBuffer = await response.arrayBuffer();
        this.buffer =  await this.context.decodeAudioData(arrayBuffer);
    }   

    async onPlayAudio() {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        // this.source.connect(this.context.destination);
        this.source.connect(this.gain_node);
        this.start_time = this.context.currentTime - this.pause_time;
        console.log(this.audio)
        this.source.start();
        //0, this.pause_time
    }

    onPauseAudio(){
        this.pause_time = this.context.currentTime - this.start_time;
        this.source.stop();
    }

}


export {
    AudioProvider
}