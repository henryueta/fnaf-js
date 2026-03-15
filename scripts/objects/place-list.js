import { Place } from "../classes/Place.js"
import { onLoadImage } from "../functions/image-loader.js"
import { animatronic_list } from "./animatronic-list.js"

const place_list = [
    new Place({
        number:0,
        canLock:false,
        isEnabled:true,
        canPlayAudio:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_0.png")
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_0_enemy.png")

            },
        ],
        name:"test_room",
        next_place_index_list:[1,5,12,13,16],
        animatronic_list:animatronic_list
    }),
    new Place({
        number:1,
        canLock:false,
        isEnabled:true,
        canPlayAudio:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_1.png")
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_1_enemy.png")

            },
        ],
        name:"test_room",
        next_place_index_list:[0,2,12,13],
        animatronic_list:null
    }),
    new Place({
        number:2,
        canLock:false,
        isEnabled:true,
        canPlayAudio:false,
        hasMultipleConnections:true,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_2.png")
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_2_enemy.png")
            },
        ],
        name:"test2_room",
        next_place_index_list:[1,3,12,14,10],
        animatronic_list:null
    }),
     new Place({
        number:3,
        canLock:false,
        isEnabled:true,
        canPlayAudio:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_3.png")
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_3_enemy.png")
            },
        ],
        name:"test2_room",
        next_place_index_list:[2,4,14],
        animatronic_list:null
    }),
    new Place({
        number:4,
        canLock:false,
        isEnabled:true,
        canPlayAudio:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_4.png")
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_4_enemy.png")
            },
        ],
        name:"test2_room",
        next_place_index_list:[3,5,15,10,14,16],
        animatronic_list:null
    }),
    new Place({
        number:5,
        canLock:false,
        isEnabled:true,
        canPlayAudio:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_5.png")
            },
            {//alterar depois
                animatronic_list:[0],
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/place/camera_5_enemy.png")
            },
        ],
        name:"test2_room",
        next_place_index_list:[4,0,13,16,15],
        animatronic_list:null
    }),
    new Place({
        number:6,
        canLock:false,
        isEnabled:true,
        canPlayAudio:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:true,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:""
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:""
            }
        ],
        name:"test2_room",
        next_place_index_list:[11],
        animatronic_list:null
    }),
    new Place({
        number:9,
        canLock:false,
        isEnabled:true,
        canPlayAudio:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:true,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:""
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:""
            }
        ],
        name:"test2_room",
        next_place_index_list:[11],
        animatronic_list:null
    }),
    new Place({
        number:10,
        canLock:false,
        isEnabled:true, 
        isLocked:false,
        canPlayAudio:false,
        hasMultipleConnections:true,
        hasSecurityRoomConnection:false,
        isPointOfChoice:true,
        place_view_list:[
            {
                animatronic_list:[],
                
                audio:'camera_select',
                repeat_audio:false,
                image:"../bedroom_1.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                
                audio:'camera_select',
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            }
        ],
        name:"test2_room",
        next_place_index_list:[9,6,12,13,14,15,16],
        animatronic_list:null
    })

]

export {
    place_list
}