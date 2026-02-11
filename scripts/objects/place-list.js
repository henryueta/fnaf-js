import { Place } from "../classes/Place.js"
import { animatronic_list } from "./animatronic-list.js"

const place_list = [
    new Place({
        number:0,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"

            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:0,
                audio:"../assets/audio/beep_3.mp3",
                repeat_audio:true,
                image:"../assets/imgs/1_sound.jpg"

            },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test_room",
        next_place_index_list:[1],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 0)
    }),
    new Place({
        number:1,
        hasMultipleConnections:true,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
             {//alterar depois
                animatronic_list:[1],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/two.jpg"
            },
             {//alterar depois
                animatronic_list:[0,1],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/three.png"
            }
        ],
        name:"test2_room",
        next_place_index_list:[0,3,4,5],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 1)
    }),
     new Place({
        number:2,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[1,0],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    }),
    new Place({
        number:3,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                        {//alterar depois
                            animatronic_list:[0],
                            noisy_animatronic:0,
                            audio:"../assets/audio/beep_3.mp3",
                            repeat_audio:true,
                            image:"../assets/imgs/1_sound.jpg"
                                    
                        },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[1],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    }),
    new Place({
        number:4,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
             {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:0,
                audio:"../assets/audio/beep_3.mp3",
                repeat_audio:true,
                image:"../assets/imgs/1_sound.jpg"
                        
            },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[1],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    }),
    new Place({
        number:5,
        hasMultipleConnections:true,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                        {//alterar depois
                            animatronic_list:[0],
                            noisy_animatronic:0,
                            audio:"../assets/audio/beep_3.mp3",
                            repeat_audio:true,
                            image:"../assets/imgs/1_sound.jpg"
                        
                        },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[1,7],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    }),
    new Place({
        number:6,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:true,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[11],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    }),
    new Place({
        number:7,
        hasMultipleConnections:true,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[5,10,6,9],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    }),
    new Place({
        number:8,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:false,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[7],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    }),
    new Place({
        number:9,
        hasMultipleConnections:false,
        hasSecurityRoomConnection:true,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[11],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    }),
    new Place({
        number:10,
        hasMultipleConnections:true,
        hasSecurityRoomConnection:true,
        place_view_list:[
            {
                animatronic_list:[],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                noisy_animatronic:null,
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                         {//alterar depois
                            animatronic_list:[1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            noisy_animatronic:null,
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[11],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    })

]

export {
    place_list
}