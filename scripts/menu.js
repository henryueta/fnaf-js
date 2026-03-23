import { onEntryPage, onExitPage } from "./functions/navigate.js";
import { onGetPlayerData, onResetData } from "./functions/player-data.js";


onEntryPage();

const warning_container = document.querySelector(".warning-container") 

const option_select_audio = new Audio("../assets/audio/menu/option_select.wav");
const option_hover_audio = new Audio("../assets/audio/menu/option_hover.wav");
const menu_audio = new Audio("../assets/audio/menu/menu.wav");
menu_audio.loop = true;

warning_container.addEventListener('click',()=>{
  option_select_audio.play();
  warning_container.classList.add("warning-close");
  menu_audio.play();
},{once:true})

document.querySelectorAll('.option-list-container button').forEach((option_item)=>
 {
   option_item.onmouseenter = ()=>option_hover_audio.play();
  // option_item.onclick = ()=>option_select_audio.play();
 }
)


document.querySelector("#new-game-option-button").onclick = ()=>{
  option_select_audio.play();
  onResetData()
  onExitPage("./pages/story.html")
}

const player_data = onGetPlayerData('all');

const star_quantity = [player_data.bad_ending,player_data.true_ending].filter((star_item)=>
  star_item === true
)


if(star_quantity.length > 0){

    const star_list = document.querySelectorAll(".star-list-container>div")
    for(let star = 0;star < star_quantity.length;star++){
      star_list[star].style.display = 'block';
    }

}

const continue_option = document.querySelector("#continue-option-button")

if(player_data.isFirstTimePlaying){
  continue_option.style.opacity = '30%';
  continue_option.disabled = true;
}

continue_option.onclick = ()=>{
  option_select_audio.play();
  onExitPage("./pages/game.html?type=continue")
}

const prime_mode_option = document.querySelector("#free-mode-option-button")

if(!player_data.gameCompleted){
  prime_mode_option.style.opacity = '30%';
  prime_mode_option.disabled = true;
}


prime_mode_option.onclick = ()=>{

  if(!player_data.gameCompleted){
    return
  }

  option_select_audio.play();
  onExitPage('./pages/game.html?type=prime_mode')
}



const menu_canvas = document.querySelector("#menu-canvas");
const menu_canvas_context = menu_canvas.getContext("2d");

const resize = ()=>{
  menu_canvas.width = window.innerWidth;
  menu_canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const menu_canvas_image = new Image();
menu_canvas_image.src = "../assets/imgs/menu/menu.png";

let time = 0;

menu_canvas_image.onload = () => {

  menu_canvas_context.clearRect(0,0,menu_canvas.width,menu_canvas.height);
    const moveX = Math.sin(time) * 40;
  const moveY = Math.cos(time * 0.7) * 20;

  const scale = 1.05;

  const w = menu_canvas.width * scale;
  const h = menu_canvas.height * scale;

  menu_canvas_context.drawImage(
    menu_canvas_image,
    moveX - (w - menu_canvas.width)/2,
    moveY - (h - menu_canvas.height)/2,
    w,
    h
  );
//   requestAnimationFrame(loop);
};

// function loop(){

//   menu_canvas_context.clearRect(0,0,canvas.width,canvas.height);

//   time += 0.01;

//   const moveX = Math.sin(time) * 40;
//   const moveY = Math.cos(time * 0.7) * 20;

//   const scale = 1.05;

//   const w = canvas.width * scale;
//   const h = canvas.height * scale;

//   menu_canvas_context.drawImage(
//     menu_canvas_image,
//     moveX - (w - canvas.width)/2,
//     moveY - (h - canvas.height)/2,
//     w,
//     h
//   );

//   requestAnimationFrame(loop);
// }


// const option_list = [
//     new MenuOption({
//         title:"New Game",
//         option_button:document.querySelector("#new-game-option-button"),
//         onHandleChoice:()=>{
//         }
//     }),
//     new MenuOption({
//         title:"Continue",
//         option_button:document.querySelector("#continue-game-option-button"),
//         onHandleChoice:()=>{
//             console.log("2");
//         }
//     }),
//     new MenuOption({
//         title:"Extra",
//         option_button:document.querySelector("#extra-option-button"),
//         onHandleChoice:()=>{
//             window.location.replace("./pages/extra.html")
//         }
//     }),
// ]

