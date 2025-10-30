import { Animatronic } from "./classes/Animatronic.js"
import { Monitor } from "./classes/Monitor.js"
import { Moviment } from "./classes/Moviment.js"
import { Place } from "./classes/Place.js"
import { Room } from "./classes/Room.js"

const player_room = new Room({
    room_canvas:document.querySelector("#room-canvas"),
    room_image:"../teste5.jpeg"
})

player_room.onDraw()

const camera_monitor = new Monitor({
    screen_container: document.querySelector(".screen-container"),
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

const place_list = [
    new Place({
        index:0,
        name:"test_room",
        next_place_index_list:[1,2]
    }),
    new Place({
        index:1,
        name:"test2_room",
        next_place_index_list:[2,3,4,5]
    })
]

const enemy = new Animatronic({
    current_place:0,
})

// setInterval(()=>{

//     const teste = enemy.onChoicePlace(place_list.find((item)=>item.index === enemy.current_place).next_place_index_list)

//     console.log(teste)

// },2000)