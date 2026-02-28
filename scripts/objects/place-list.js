import { Place } from "../classes/Place.js"
import { onLoadImage } from "../functions/image-loader.js"
import { animatronic_list } from "./animatronic-list.js"

const place_list = [
    new Place({
        number:0,
        canLock:false,
        isEnabled:true,
        hasPowerGenerator:false,
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

            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:0,
                audio:'camera_select',
                repeat_audio:true,
                image:"../assets/imgs/static.gif"

            },
        ],
        name:"test_room",
        next_place_index_list:[1,4,12],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 0)
    }),
    new Place({
        number:1,
        canLock:false,
        isEnabled:true,
        hasPowerGenerator:false,
        hasMultipleConnections:true,
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
            },
        ],
        name:"test2_room",
        next_place_index_list:[0,2,10,13],
        animatronic_list:null
    }),
     new Place({
        number:2,
        canLock:false,
        isEnabled:true,
        hasPowerGenerator:false,
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
            },
        ],
        name:"test2_room",
        next_place_index_list:[1,3,14],
        animatronic_list:null
    }),
    new Place({
        number:3,
        canLock:false,
        isEnabled:true,
        hasPowerGenerator:false,
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
            },
                        {//alterar depois
                            animatronic_list:[0],
                            noisy_animatronic:0,
                            audio:'camera_select',
                            repeat_audio:true,
                            image:"../assets/imgs/1_sound.jpg"
                                    
                        },
        ],
        name:"test2_room",
        next_place_index_list:[2,4,10,15],
        animatronic_list:null
    }),
    new Place({
        number:4,
        canLock:false,
        isEnabled:true,
        hasPowerGenerator:false,
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
            },
             {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:0,
                audio:'camera_select',
                repeat_audio:true,
                image:"../assets/imgs/1_sound.jpg"
                        
            },
        ],
        name:"test2_room",
        next_place_index_list:[3,0,16],
        animatronic_list:null
    }),
    new Place({
        number:6,
        canLock:false,
        isEnabled:true,
        hasPowerGenerator:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:true,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:""
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
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
        hasPowerGenerator:false,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:true,
        isPointOfChoice:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:!""
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
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
        isLocked:true,
        hasPowerGenerator:false,
        hasMultipleConnections:true,
        hasSecurityRoomConnection:false,
        isPointOfChoice:true,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:"../bedroom_1.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:'camera_select',
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            }
        ],
        name:"test2_room",
        next_place_index_list:[9,6],
        animatronic_list:null
    })

]

export {
    place_list
}