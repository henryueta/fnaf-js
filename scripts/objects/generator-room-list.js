import { Place } from "../classes/Place.js"
import { onLoadImage } from "../functions/image-loader.js"
import { animatronic_list } from "./animatronic-list.js"

const generator_room_list = [
        new Place({
        number:12,
        canLock:true,
        isEnabled:false,
        isLocked:true,
        hasPowerGenerator:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/one.avif")
            }
        ],
        name:"test2_room",
        next_place_index_list:[0],
        animatronic_list:null
    }),
    new Place({
        number:13,
        canLock:true,
        isEnabled:false,
        isLocked:true,
        hasPowerGenerator:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/one.avif")
            }
        ],
        name:"test2_room",
        next_place_index_list:[1],
        animatronic_list:null
    }),
    new Place({
        number:14,
        canLock:true,
        isEnabled:false,
        isLocked:true,
        hasPowerGenerator:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/one.avif")
            }
        ],
        name:"test2_room",
        next_place_index_list:[2],
        animatronic_list:null
    }),
        new Place({
        number:15,
        canLock:true,
        isEnabled:false,
        isLocked:true,
        hasPowerGenerator:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/one.avif")
            }
        ],
        name:"test2_room",
        next_place_index_list:[3],
        animatronic_list:null
    }),
        new Place({
        number:16,
        canLock:true,
        isEnabled:false,
        isLocked:true,
        hasPowerGenerator:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/one.avif")
            }
        ],
        name:"test2_room",
        next_place_index_list:[4],
        animatronic_list:null
    }),

]

export {
    generator_room_list
}