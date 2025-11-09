import { Animatronic } from "../classes/Animatronic.js";
import { place_list } from "./place-list.js";

const animatronic_list = [
    new Animatronic({
    current_place:1,
    identifier:0,
    isActive:true,
    isMoving:true,
    current_mode:'noisy',
    movement_delay:1500,
    action_list:[
        // {
        //     place_number:0,
        //     isMovementCancelled:false,
        //     onAction:()=>{
        //         console.log("mudou bee");
        //         place_list.find((item)=>item.number === 0).current_audio = "../assets/audio/beep_3.mp3"
        //     }
        // }
    ]    
    }),
    // new Animatronic({
    //     current_place:1,
    //     identifier:1,
    //     isActive:true    
    //     })
]

export {
    animatronic_list
}