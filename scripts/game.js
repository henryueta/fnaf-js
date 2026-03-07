import { CameraMonitor } from "./classes/CameraMonitor.js"
import { Movement } from "./classes/Movement.js"
import { Room } from "./classes/Room.js"
import { place_list } from "./objects/place-list.js"
import { animatronic_list } from "./objects/animatronic-list.js"
import { Game } from "./classes/Game.js"
import { night_list } from "./objects/night-list.js"
import { door_list } from "./objects/door-list.js"
import { Flashlight } from "./classes/Flashlight.js"
import { onLoadImage } from "./functions/image-loader.js"
import { Clock } from "./classes/Clock.js"
import { audio_manager } from "./audio-manager.js"
import { Player } from "./classes/Player.js"
import { audio_room_list } from "./objects/audio_room_list.js"
import { Night } from "./classes/Night.js"
import { Battery } from "./classes/Battery.js"
import { Telephone } from "./classes/Telephone.js"
import { TaskMonitor } from "./classes/TaskMonitor.js"
import { task_list } from "./objects/task-list.js"

const game = new Game({
    player:new Player(),
    clock:new Clock({
        time_container:document.querySelector(".time-span")
    }),
    telephone:new Telephone({
        cancel_call_container:document.querySelector(".cancel-call-container")
    }),
    player_room: new Room({
        room_canvas:document.querySelector("#room-canvas"),
        image_of_interior_room:await onLoadImage('../teste_sala4.png'),
        left_door:door_list[0],
        right_door:door_list[1],
        dark_screen:document.querySelector(".dark-screen-container"),
        flashlight:new Flashlight({
            isInstalled:true,
            percent_container:document.querySelector(".percent-container")
        })
    }),
    player_battery:new Battery({
        percent_container:document.querySelector(".percent-container")
    }),
    x_movement: new Movement({
        right_container:document.querySelector(".move-right-container"),
        left_container:document.querySelector(".move-left-container")
    }),
    task_monitor:new TaskMonitor({
        screen_container:document.querySelector(".task-system-container .screen-container"),
        task_list_container:document.querySelector(".task-list-container"),
        task_list:task_list
    }),
    camera_monitor:new CameraMonitor({
        isInstalled:true,
        screen_container: document.querySelector(".cam-system-container .screen-container"),
        action_button_list:{
            place_lock_switch:document.querySelector("#place-lock-switch")
        },
        loading_image:await onLoadImage("../assets/imgs/loading.jpg"),
        camera_list_container:document.querySelector(".map-container"),
        camera_list:[...place_list,...audio_room_list],
        choiced_camera_canvas:document.querySelector("#choiced-place-canvas")
    }),
    toggle_cam_system_button:document.querySelector(".toggle-cam-system-button"),
    toggle_task_system_button:document.querySelector(".toggle-task-system-button"),
    animatronic_list:animatronic_list,
    place_list:[...place_list,...audio_room_list],
    current_night:new Night({
        number:1,
        running_event_value:5000,
        isCompleted:false,
        game_won_container:document.querySelector(".game-won-container"),
        game_over_container:document.querySelector(".game-over-container")
    })
});

await audio_manager.onPreload({
    clock:"../assets/audio/night/clock.wav",
    knock:"../assets/audio/camera/knock.wav",
    camera_toggle:"../assets/audio/camera/camera_toggle.wav",
    camera_select:"../assets/audio/camera/camera_select.wav",
    action_denied:"../assets/audio/camera/action_denied.wav",
    door:"../assets/audio/camera/door.wav",
    audio_room_exit:"../assets/audio/animatronic/audio_room_exit.wav",
    vent_walk:"../assets/audio/animatronic/vent_walk.wav",
    running_away:"../assets/audio/animatronic/running_away.wav",
    jumpscare:"../assets/audio/animatronic/jumpscare.wav",
    no_battery:"../assets/audio/flashlight/no_battery.wav",
    flash:"../assets/audio/flashlight/flash.wav",
    right_to_left_audio:"../assets/audio/footstep/right_to_left_footstep.wav",
    right_audio:"../assets/audio/footstep/right_footstep.wav",
    left_to_right_audio:"../assets/audio/footstep/left_to_right_footstep.wav",
    left_audio:"../assets/audio/footstep/left_footstep.wav",
},()=>{
    game.onStart();
    document.body.classList.add("loaded");
}); 


