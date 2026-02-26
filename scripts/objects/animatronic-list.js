import { Animatronic } from "../classes/Animatronic.js";
import { onLoadImage } from "../functions/image-loader.js";

const animatronic_list = [
    new Animatronic({
    current_place:0,
    identifier:0,
    isActive:true,
    isMoving:true,
    current_mode:'hunter',
    waiting_player_value:4000,
    movement_delay:1500,
    action_list:[
        // {
        //     place_number:0,
        //     isMovementCancelled:false,
        //     onAction:()=>{
        //         console.log("mudou bee");
        //         place_list.find((item)=>item.number === 0).current_audio = "../assets/audio/camera_select_3.mp3"
        //     }
        // }
    ],
    jumpscare_frame_list:[
        "../teste4.jpeg",
        "../teste3.jpeg",
        "../teste2.jpeg"
    ]    
    }),

]

export {
    animatronic_list
}