import { Place } from "../classes/Place.js"
import { onLoadImage } from "../functions/image-loader.js"

const audio_room_list = [
        new Place({
        number:12,
        canLock:true,
        canPlayAudio:true,
        isEnabled:false,
        isLocked:false,
        canPlayAudio:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                
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
        number:13,
        canLock:true,
        canPlayAudio:true,
        isEnabled:false,
        isLocked:false,
        canPlayAudio:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                
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
        number:14,
        canLock:true,
        canPlayAudio:true,
        isEnabled:false,
        isLocked:false,
        canPlayAudio:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                
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
        number:15,
        canLock:true,
        canPlayAudio:true,
        isEnabled:false,
        isLocked:false,
        canPlayAudio:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/one.avif")
            }
        ],
        name:"test2_room",
        next_place_index_list:[4],
        animatronic_list:null
    }),
        new Place({
        number:16,
        canLock:true,
        canPlayAudio:true,
        isEnabled:false,
        isLocked:false,
        canPlayAudio:true,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../bedroom_1.jpeg")
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/one.avif")
            }
        ],
        name:"test2_room",
        next_place_index_list:[5],
        animatronic_list:null
    }),

]

export {
    audio_room_list
}