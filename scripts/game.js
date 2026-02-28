import { Monitor } from "./classes/Monitor.js"
import { Movement } from "./classes/Movement.js"
import { Room } from "./classes/Room.js"
import { place_list } from "./objects/place-list.js"
import { animatronic_list } from "./objects/animatronic-list.js"
import { Game } from "./classes/Game.js"
import { night_list } from "./objects/night-list.js"
import { door_list } from "./objects/door-list.js"
import { Flashlight } from "./classes/Flashlight.js"
import { onLoadImage } from "./functions/image-loader.js"
import { Clock } from "./classes/Clock.js"
import { audio_manager } from "./audio-manager.js"
import { Player } from "./classes/Player.js"
import { generator_room_list } from "./objects/generator-room-list.js"


// const assets = [];

// const carregarImagens = async (lista)=>{

//     for(const url of lista){
//         const img = new Image();
//         img.src = url;
//         await img.decode();
//         assets.push(img);
       
//     }
//     // testarMemoria(assets);
  

// }
// let frame = 0;
// let id = null;
// const loop = ()=>{
//     const current_image = assets[frame % 10];
//     canvas.getContext('2d').drawImage(current_image,0,0);
//     frame+=1;
//     id = requestAnimationFrame(loop);
// }

// setTimeout(()=>{
//     //   loop();
//     // setTimeout(()=>{
//         // cancelAnimationFrame(id)
//         // id = null;
//         // console.log("parou")
//     // },3000)

// },2000)

// const canvas = document.querySelector("#room-canvas");


// const testarMemoria = async(imagens)=>{

//     for(let img of imagens){
//         await img.decode();
//         console.log(img)
//         canvas.getContext('2d').drawImage(img,0,0)
//     }

// }

// carregarImagens([
//     "../car.jpg",
//     "../kaneki.jpg",
//     "../minecraft.png",
//     "../naruto.jpg",
//     "../space.jpg",
//     "../sun.jpg",
//     "../car.jpg",
//     "../kaneki.jpg",
//     "../naruto.jpg",
//     "../minecraft.png"
// ]);

function resizeGame() {
  const gameWrapper = document.querySelector("body");

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const targetRatio = 21 / 9;
  const screenRatio = screenWidth / screenHeight;

  if (screenRatio > targetRatio) {
    // Tela muito larga → limitar pela altura
    gameWrapper.style.height = screenHeight + "px";
    gameWrapper.style.width = (screenHeight * targetRatio) + "px";
    gameWrapper.style.border = '2px solid red'
  } else {
    // Tela muito alta → limitar pela largura
    gameWrapper.style.border = '2px solid blue'
    
    gameWrapper.style.width = screenWidth + "px";
    gameWrapper.style.height = (screenWidth / targetRatio) + "px";
  }
}

// window.addEventListener("resize", resizeGame);
// resizeGame();

const game = new Game({
    player:new Player(),
    clock:new Clock({
        time_container:document.querySelector(".time-span")
    }),
    player_room: new Room({
        room_canvas:document.querySelector("#room-canvas"),
        image_of_interior_room:await onLoadImage('../car.jpg'),
        left_door:door_list[0],
        right_door:door_list[1],
        dark_screen:document.querySelector(".dark-screen-container"),
        flashlight:new Flashlight({
            percent_container:document.querySelector(".percent-container")
        })
    }),
    x_movement: new Movement({
        right_container:document.querySelector(".move-right-container"),
        left_container:document.querySelector(".move-left-container")
    }),
    camera_monitor:new Monitor({
        screen_container: document.querySelector(".screen-container"),
        action_button_list:{
            place_lock_switch:document.querySelector("#place-lock-switch")
        },
        loading_image:await onLoadImage("../assets/imgs/loading.jpg"),
        camera_list_container:document.querySelector(".map-container"),
        camera_list:[...place_list,...generator_room_list],
        choiced_camera_canvas:document.querySelector("#choiced-place-canvas")
    }),
    toggle_cam_system_button:document.querySelector(".toggle-cam-system-button"),
    animatronic_list:animatronic_list,
    place_list:[...place_list,...generator_room_list],
    current_night:night_list.find((night_item)=>!night_item.isCompleted)
});

await audio_manager.onPreload({
    camera_toggle:"../assets/audio/camera/camera_toggle.wav",
    camera_select:"../assets/audio/camera/camera_select.wav",
    action_denied:"../assets/audio/camera/action_denied.wav",
    running_away:"../assets/audio/animatronic/running_away.wav",
    no_battery:"../assets/audio/flashlight/no_battery.wav",
    flash:"../assets/audio/flashlight/flash.wav",
    right_to_left_audio:"../assets/audio/footstep/right_to_left_footstep.wav",
    right_audio:"../assets/audio/footstep/right_footstep.wav",
    left_to_right_audio:"../assets/audio/footstep/left_to_right_footstep.wav",
    left_audio:"../assets/audio/footstep/left_footstep.wav",
},()=>{
    game.onStart();
}); 


