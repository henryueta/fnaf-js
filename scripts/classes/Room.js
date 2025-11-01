class Room {

    constructor(config){
        this.room_canvas = config.room_canvas;
        this.room_context = this.room_canvas.getContext('2d');
        this.room_image = new Image();
        this.room_image.src = config.room_image; 
    }

    onDraw(){
        this.room_image.onload = () => {
            const cw = this.room_canvas.width;
            const ch = this.room_canvas.height;
            const iw = this.room_image.width;
            const ih = this.room_image.height;
      
            // Calcula proporção de escala para "cover"
            const scale = Math.max(cw / iw, ch / ih);
      
            // Calcula posição centralizada
            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);
      
            // Desenha a imagem cobrindo todo o canvas
            this.room_context.drawImage(this.room_image, x, y, iw * scale, ih * scale);
            this.room_context.fillRect(1050, 590, 400, 500); // Desenha um quadrado azul de 100x100px
            
          };
          this.room_canvas.onclick = ()=>{console.log("A")}
          console.log(this.room_canvas)
    }

}

export {
    Room
}