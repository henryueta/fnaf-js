class Room {
    constructor(config) {
        this.room_canvas = config.room_canvas;
        this.room_context = this.room_canvas.getContext('2d');
        this.room_image = new Image();
        this.room_image.src = config.room_image;

        this.clickableRect = { x: 1050, y: 590, width: 400, height: 500 };

        
        this.onRectClick = config.onRectClick || null;

        this.room_canvas.addEventListener('click', (e) => this.handleClick(e));
    }

    onDraw() {
        this.room_image.onload = () => {
            const cw = this.room_canvas.width;
            const ch = this.room_canvas.height;
            const iw = this.room_image.width;
            const ih = this.room_image.height;

            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw / 2) - (iw * scale / 2);
            const y = (ch / 2) - (ih * scale / 2);

            this.room_context.drawImage(this.room_image, x, y, iw * scale, ih * scale);

            this.room_context.fillStyle = 'black';
            this.room_context.fillRect(
                this.clickableRect.x,
                this.clickableRect.y,
                this.clickableRect.width,
                this.clickableRect.height
            );
        };
    }

    handleClick(event) {
        const rect = this.room_canvas.getBoundingClientRect();

        const scaleX = this.room_canvas.width / rect.width;
        const scaleY = this.room_canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        if (
            x >= this.clickableRect.x &&
            x <= this.clickableRect.x + this.clickableRect.width &&
            y >= this.clickableRect.y &&
            y <= this.clickableRect.y + this.clickableRect.height
        ) {
            if (this.onRectClick) this.onRectClick();
        }
        //  else {
        //     console.log("Clique fora do retângulo", x, y);
        // }
    }
}

export { Room };
