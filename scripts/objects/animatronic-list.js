import { Animatronic } from "../classes/Animatronic.js";

const animatronic_list = [
    new Animatronic({
    current_place:0,
    identifier:0,
    isActive:true,
    isMoving:true,
    current_mode:'hunter',
    running_away_audio:'running_away',
    jumpscare_scream_audio:'',
    waiting_player_value:4500,
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
        "../assets/imgs/jumpscare/jumpscare_frame_1.png",
        "../assets/imgs/jumpscare/jumpscare_frame_2.png",
        "../assets/imgs/jumpscare/jumpscare_frame_3.png"
    ]    
    }),

]

export {
    animatronic_list
}