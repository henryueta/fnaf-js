import { Slider } from "./classes/Slider.js";
import { onNavigate } from "./functions/navigate.js";

window.onload = ()=>{
    document.body.classList.add("loaded");
}

const story_canvas = document.querySelector("#story-canvas");
const story_canvas_context = story_canvas.getContext("2d");

const story_canvas_image = new Image();
story_canvas_image.src = "../assets/imgs/menu/menu.png";

let time = 0;

story_canvas_image.onload = () => {

  story_canvas_context.clearRect(0,0,story_canvas.width,story_canvas.height);
    const moveX = Math.sin(time) * 40;
  const moveY = Math.cos(time * 0.7) * 20;

  const scale = 1.05;

  const w = story_canvas.width * scale;
  const h = story_canvas.height * scale;

  story_canvas_context.drawImage(
    story_canvas_image,
    moveX - (w - story_canvas.width)/2,
    moveY - (h - story_canvas.height)/2,
    w,
    h
  );
//   requestAnimationFrame(loop);
};

const story_text_slider = new Slider({
    enableClick:false,
    current_slider_text_container:document.querySelector("#current-slider-text"),
    next_slider_text_container:document.querySelector(".slider-container .text-container"),
    cancel_slider_container:document.querySelector("#cancel-slider-text"),
    onCancel:()=>{
      onNavigate("../pages/game.html")
    },
    onEnd:()=>{
        onNavigate("../pages/game.html")
    },
    text_list:[
        "Em 32 de agosto de 2026, o famoso streamer Bistecone foi infectado por um virus de origem desconhecida. Sua aparência física e seu estado mental mudaram drasticamente, resultando em um ser de pura maldade.",
        "Tigrão e Tolinho observando a situação de seu pai unem forças para salvá-lo. A dupla se esconde em um laboratório, onde começam a desenvolver uma cura para o vírus."
    ]
})

setTimeout(()=>{
    story_text_slider.onViewStoryText(); 
    story_text_slider.enableClick = true;  
},4000)

// const onWriteStoryText = (text)=> {
//   isWriting = true;
//   current_story_text.textContent = "";
//   char_index = 0;
    
//     const onWrite = ()=> {
//     if (char_index < text.length) {
//       current_story_text.textContent += text.charAt(char_index);
//       char_index++;
//       setTimeout(onWrite, 40);
//     } else {
//       isWriting = false;
//     }
//   }

//   onWrite();
// }

// function onViewStoryText() {
//   onWriteStoryText(story_text_list[current_text_index]);
// }

// next_story_text.addEventListener("click", () => {
//   if (isWriting) {
//     current_story_text.textContent = story_text_list[current_text_index];
//     isWriting = false;
//     return;
//   }

//   current_text_index++;
//   if (current_text_index < story_text_list.length) {
//     onViewStoryText();
//   } else {
//     current_story_text.textContent = "Fim da demonstração.";
//     next_story_text.style.display = "none";
//   }
// });

// onViewStoryText();