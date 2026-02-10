import { Animatronic } from "./classes/Animatronic.js"
import { Monitor } from "./classes/Monitor.js"
import { Movement } from "./classes/Movement.js"
import { Place } from "./classes/Place.js"
import { Room } from "./classes/Room.js"
import { place_list } from "./objects/place-list.js"
import { animatronic_list } from "./objects/animatronic-list.js"
import { Game } from "./classes/Game.js"
import { night_list } from "./objects/night-list.js"
import { door_list } from "./objects/door-list.js"

const game = new Game({
    player_room: new Room({
        room_canvas:document.querySelector("#room-canvas"),
        room_image:"../teste5.jpeg",
        front_door:door_list[0],
        left_door:door_list[1],
        right_door:door_list[2],
        dark_screen:document.querySelector(".dark-screen-container")
    }),
    x_moviment: new Movement({
        right_container:document.querySelector(".move-right-container"),
        left_container:document.querySelector(".move-left-container")
    }),
    camera_monitor:new Monitor({
        screen_container: document.querySelector(".screen-container"),
        action_button_list:{
            place_power_switch:document.querySelector("#place-power-switch")
        },
        camera_list_container:document.querySelector(".map-container"),
        camera_list:place_list,
        choiced_camera_canvas:document.querySelector("#choiced-place-canvas")
    }),
    toggle_cam_system_button:document.querySelector(".toggle-cam-system-button"),
    animatronic_list:animatronic_list,
    place_list:place_list,
    current_night:night_list.find((night_item)=>!night_item.isCompleted)
})

game.onStart();


const timeouts = [
    {
        timeout:2000,
        action:()=>{
            console.log(1)
        }
    },
    {
        timeout:5000,
        action:()=>{
            console.log(2)
        }
    }
];
// const interval = setInterval(() => {
    
//     timeouts.forEach((item)=>
//         setTimeout(()=>{
//             item.action()
//         },item.timeout)
//     )

// }, 5000);

// Parar tudo:

// setTimeout(()=>{
//     console.log("limpo")
//     clearInterval(interval);
// timeouts.forEach(clearTimeout);
// },15000)




// const camera_monitor = new Monitor({
//     screen_container: document.querySelector(".screen-container"),
//     camera_list_container:document.querySelector(".map-container"),
//     camera_list:place_list,
//     choiced_camera_canvas:document.querySelector("#choiced-place-canvas")
// })
// setInterval(()=>{

//     const teste = enemy.onChoicePlace(place_list.find((item)=>item.index === enemy.current_place).next_place_index_list)
//     console.log("current_place",enemy.current_place)
//     console.log(teste)



// for(const animatronic of animatronic_list){
//     const prev_current_animatronic_place = place_list.find((place_item)=>place_item.number === animatronic.current_place)
//     console.log(animatronic)
//     const current_animatronic_place =  animatronic.onChoicePlace(place_list.find((place_item)=>place_item.number === animatronic.current_place).next_place_index_list)

//     const next_current_animatronic_place = place_list.find((place_item)=>place_item.number === current_animatronic_place)
//      animatronic.onAction(next_current_animatronic_place);
//     if(prev_current_animatronic_place.number !== next_current_animatronic_place.number){
//         prev_current_animatronic_place.onRemoveAnimatronic(animatronic);
//         prev_current_animatronic_place.onSetView();
//         next_current_animatronic_place.onSetAnimatronic(animatronic);
//         next_current_animatronic_place.onSetView();
       
//         if(
//             camera_monitor.choiced_camera_info.number === prev_current_animatronic_place.number
//             ||
//             camera_monitor.choiced_camera_info.number === next_current_animatronic_place.number
//         ){

//             camera_monitor.choiced_camera_info.image.src = "../assets/imgs/static.gif";
//             setTimeout(()=>{

//                 // camera_monitor.choiced_camera_info.image.src = (
//                 //     camera_monitor.choiced_camera_info.number === prev_current_animatronic_place.number
//                 //     ?  prev_current_animatronic_place.current_view
//                 //     :  next_current_animatronic_place.current_view
//                 // )
//                 const current_place = (
//                     camera_monitor.choiced_camera_info.number === prev_current_animatronic_place.number
//                     ?  prev_current_animatronic_place
//                     :  next_current_animatronic_place
//                 )
                
//                 current_place.onSetView()

//                 camera_monitor.choiced_camera_info.image.src = current_place.current_view;
//                 camera_monitor.choiced_camera_info.audio.src = current_place.current_audio;

//             },200)

//         }

//     }

// }

// },2000)




// const x_moviment = new Movement({
//     right_container:document.querySelector(".move-right-container"),
//     left_container:document.querySelector(".move-left-container")
// })

// x_moviment.onMove()
// const toggle_cam_system_button = document.querySelector(".toggle-cam-system-button")

// toggle_cam_system_button.addEventListener('click',()=>{
//     camera_monitor.onToggle()
//     x_moviment.setIsLocked(camera_monitor.isOpen)
//     x_moviment.onEndMove()

// })

// camera_monitor.onChangeCurrentCamera()

