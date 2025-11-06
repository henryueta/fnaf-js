import { Place } from "../classes/Place.js"
import { animatronic_list } from "./animatronic-list.js"

const place_list = [
    new Place({
        number:0,
        place_view_list:[
            {
                animatronic_list:[],
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"

            },
                         {//alterar depois
                            animatronic_list:[1],
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test_room",
        next_place_index_list:[1,2],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 0)
    }),
    new Place({
        number:1,
        place_view_list:[
            {
                animatronic_list:[],
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
             {//alterar depois
                animatronic_list:[1],
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/two.jpg"
            },
             {//alterar depois
                animatronic_list:[0,1],
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/three.png"
            }
        ],
        name:"test2_room",
        next_place_index_list:[2,0],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 1)
    }),
     new Place({
        number:2,
        place_view_list:[
            {
                animatronic_list:[],
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                audio:"../assets/audio/beep_2.mp3",
                repeat_audio:false,
                image:"../assets/imgs/one.avif"
            },
                         {//alterar depois
                            animatronic_list:[1],
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/two.jpg"
                        },
                         {//alterar depois
                            animatronic_list:[0,1],
                            audio:"../assets/audio/beep_2.mp3",
                            repeat_audio:false,
                            image:"../assets/imgs/three.png"
                        }
        ],
        name:"test2_room",
        next_place_index_list:[1,0],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    })

]

export {
    place_list
}