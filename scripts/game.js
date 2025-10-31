import { Animatronic } from "./classes/Animatronic.js"
import { Monitor } from "./classes/Monitor.js"
import { Moviment } from "./classes/Moviment.js"
import { Place } from "./classes/Place.js"
import { Room } from "./classes/Room.js"
import { onSameList } from "./functions/sameList.js"

const player_room = new Room({
    room_canvas:document.querySelector("#room-canvas"),
    room_image:"../teste5.jpeg"
})

player_room.onDraw()


// const enemy = new Animatronic({
//     current_place:0,
// })

const animatronic_list = [
    new Animatronic({
    current_place:0,
    identifier:0
    })
]

const place_list = [
    new Place({
        number:0,
        place_view_list:[
            {
                animatronic_list:[],
                src:"../teste5.jpeg"
            },
            {//alterar depois
                animatronic_list:[0],
                src:"../teste4.jpeg"

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
                src:"../teste5.jpeg"
            },
                        {//alterar depois
                animatronic_list:[0],
                src:"../teste4.jpeg"

            }
        ],
        name:"test2_room",
        next_place_index_list:[2,3,4,5],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 1)
    }),
     new Place({
        number:2,
        place_view_list:[
            {
                animatronic_list:[],
                src:"../teste5.jpeg"
            },
                        {//alterar depois
                animatronic_list:[0],
                src:"../teste4.jpeg"

            }
        ],
        name:"test2_room",
        next_place_index_list:[1,3],
        animatronic_list:animatronic_list.filter((animatronic_item)=>animatronic_item.current_place === 2)
    })

]


// setInterval(()=>{

//     const teste = enemy.onChoicePlace(place_list.find((item)=>item.index === enemy.current_place).next_place_index_list)
//     console.log("current_place",enemy.current_place)
//     console.log(teste)

for(const animatronic of animatronic_list){

    const prev_current_animatronic_place = place_list.find((place_item)=>place_item.number === animatronic.current_place)
   
    const current_animatronic_place =  animatronic.onChoicePlace(place_list.find((place_item)=>place_item.number === animatronic.current_place).next_place_index_list)

    const next_current_animatronic_place = place_list.find((place_item)=>place_item.number === current_animatronic_place)
   
    if(prev_current_animatronic_place.number !== next_current_animatronic_place.number){
        prev_current_animatronic_place.onRemoveAnimatronic(animatronic);
        prev_current_animatronic_place.onSetView();
        next_current_animatronic_place.onSetAnimatronic(animatronic);
        next_current_animatronic_place.onSetView();

        if(
            camera_monitor.choiced_camera_number === prev_current_animatronic_place.number
            ||
            camera_monitor.choiced_camera_number === next_current_animatronic_place.number
        ){

            camera_monitor.choiced_camera_image.src = "../assets/imgs/static.gif";
            setTimeout(()=>{

                camera_monitor.choiced_camera_image.src = (
                    camera_monitor.choiced_camera_number === prev_current_animatronic_place.number
                    ?  prev_current_animatronic_place.current_view
                    :  next_current_animatronic_place.current_view
                )

            },200)

        }

    }

}

// },2000)


const camera_monitor = new Monitor({
    screen_container: document.querySelector(".screen-container"),
    camera_list_container:document.querySelector(".map-container"),
    camera_list:place_list,
    choiced_camera_canvas:document.querySelector("#choiced-place-canvas")
})

const x_moviment = new Moviment({
    right_container:document.querySelector(".move-right-container"),
    left_container:document.querySelector(".move-left-container")
})

x_moviment.onMove()
const toggle_cam_system_button = document.querySelector(".toggle-cam-system-button")

toggle_cam_system_button.addEventListener('click',()=>{
    camera_monitor.onToggle()
    x_moviment.setIsLocked(camera_monitor.isOpen)
    x_moviment.onEndMove()
})

camera_monitor.onChangeCurrentCamera()

