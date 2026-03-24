import { onDisplay } from "./functions/display.js";
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

const player_data = onGetPlayerData('all');

const new_game_option = document.querySelector("#new-game-option-button")

const confirm_reset_container = document.querySelector(".confirm-reset-container")
const menu_antifocus_container = document.querySelector(".menu-antifocus-container")

const reset_confirm_button = confirm_reset_container.querySelector("#reset-confirm-button");
const reset_cancel_button = confirm_reset_container.querySelector("#reset-cancel-button")



reset_cancel_button.onclick = ()=>{
  menu_antifocus_container.style.display = 'none';
  confirm_reset_container.style.display = 'none';
}

new_game_option.onclick = ()=>{

  if(!player_data.isFirstTimePlaying){
    menu_antifocus_container.style.display = 'block';
    confirm_reset_container.style.display = 'flex';
    return
  }
  new_game_option.classList.add("selected");
  option_select_audio.play();
  onResetData();
  onExitPage("./pages/story.html?type=new_game");
}

reset_confirm_button.onclick = ()=>{
  alert("vai resetar")
  menu_antifocus_container.style.display = 'none';
  confirm_reset_container.style.display = 'none';
  new_game_option.classList.add("selected");
  option_select_audio.play();
  onResetData();
  onExitPage("./pages/story.html?type=new_game");
}

const star_quantity = [player_data.bad_ending,player_data.true_ending,player_data.prime_ending].filter((star_item)=>
  star_item === true
)


if(star_quantity.length > 0){

    const star_list = document.querySelectorAll(".star-list-container>div");
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
  continue_option.classList.add("selected");
  option_select_audio.play();
  onExitPage("./pages/game.html?type=continue")
}

const prime_mode_option = document.querySelector("#free-mode-option-button")

if(!player_data.gameCompleted){
  prime_mode_option.style.opacity = '30%';
  prime_mode_option.disabled = true;
}


prime_mode_option.onclick = ()=>{
  prime_mode_option.classList.add("selected");
  if(!player_data.gameCompleted){
    return
  }

  option_select_audio.play();
  onExitPage('./pages/story.html?type=prime_mode')
}



const menu_canvas = document.querySelector("#menu-canvas");
const menu_canvas_context = menu_canvas.getContext("2d");
let time = 0;

const menu_canvas_image = new Image();
menu_canvas_image.src = "../assets/imgs/menu/menu.png";

 const onMenuImageLoop = ()=>{

  menu_canvas_context.clearRect(0,0,menu_canvas.width,menu_canvas.height);

  time += 0.01;

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

  requestAnimationFrame(onMenuImageLoop);
}

const current_display = onDisplay()

const current_game_version_type = document.querySelector("#game-version-type");

current_game_version_type.textContent = (
  current_display === 'PC'
  ? "DESKTOP"
  : "MOBILE"
)

const onDrawMenuImage = ()=>{

  if(current_display === 'PC'){
    onMenuImageLoop()
    return
  }

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

}

const resize = ()=>{
  menu_canvas.width = window.innerWidth;
  menu_canvas.height = window.innerHeight;

  if(current_display === 'PC'){
    return
  }

  onDrawMenuImage();
}
window.addEventListener("resize", resize);
resize();

menu_canvas_image.onload = () => {

 onDrawMenuImage();
 

//   requestAnimationFrame(loop);
};





