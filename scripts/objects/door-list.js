import { Door } from "../classes/Door.js"
import { onLoadImage } from "../functions/image-loader.js"

const left_door_default_image = await onLoadImage("../teste_tamanho1.png");
const right_door_default_image = await onLoadImage("../teste_tamanho1.png");

const door_list = [
    new Door({
        x:220,
        y:220,
        type:'left',
        width: 350, 
        height: 980,
        place_location_number:9,
        animatronic_view_list:[{
            identifier:0,
            forTransition:false,
            audio:"../assets/audio/camera_select_1.mp3",
            repeat_audio:false,
            image:await onLoadImage("../assets/imgs/enemy_teste1.png"),
        },
        {
            identifier:0,
            forTransition:true,
            audio:"../assets/audio/camera_select_1.mp3",
            repeat_audio:false,
            image:await onLoadImage("../assets/imgs/enemy_teste2.png"),
        },
        {
            identifier:null,
            forTransition:false,
            audio:"../assets/audio/camera_select_1.mp3",
            repeat_audio:false,
            image:left_door_default_image,
        }],
        vision_image:left_door_default_image
    }),
    new Door({
        x:1980,
        y:220,
        type:'right',
        width: 350, 
        height: 980,
        place_location_number:6,
        animatronic_view_list:[{
                identifier:0,
                forTransition:false,
                audio:"../assets/audio/camera_select_1.mp3",
                repeat_audio:false,
                image:await onLoadImage("../assets/imgs/enemy_teste1.png"),
            },
            {
            identifier:0,
            forTransition:true,
            audio:"../assets/audio/camera_select_1.mp3",
            repeat_audio:false,
            image:await onLoadImage("../assets/imgs/enemy_teste2.png"),
            },
            {
                identifier:null,
                forTransition:false,
                audio:"../assets/audio/camera_select_1.mp3",
                repeat_audio:false,
                image:right_door_default_image,
        }],
        vision_image:right_door_default_image
    })
]

export {
    door_list
}