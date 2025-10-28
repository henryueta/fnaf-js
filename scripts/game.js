import { Monitor } from "./classes/Monitor.js"
import { Moviment } from "./classes/Moviment.js"

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
