import { Door } from "../classes/Door.js"
import { onLoadImage } from "../functions/image-loader.js"

const left_door_default_image = await onLoadImage("../teste_tamanho1.png");
const right_door_default_image = await onLoadImage("../teste_tamanho1.png");

const door_list = [
    // {
    //     x:721,
    //     y:210,
    //     width: 175, 
    //     height: 340,
    //     type:'center',
    //     place_location_number:10,
    //     animatronic_view_list:[{
    //         identifier:0,
    //         audio:"../assets/audio/beep_1.mp3",
    //         repeat_audio:false,
    //         image:"../teste4.jpeg",
    //     },
    //     {
    //         identifier:null,
    //         audio:"../assets/audio/beep_1.mp3",
    //         repeat_audio:false,
    //         image:"../vinheta.jpeg",
    //     }]
    // },
    new Door({
        x:0,
        y:100,
        type:'left',
        width: 180, 
        height: 340,
        place_location_number:9,
        animatronic_view_list:[{
            identifier:0,
            audio:"../assets/audio/beep_1.mp3",
            repeat_audio:false,
            image:await onLoadImage("../teste_tamanho2.png"),
        },
        {
            identifier:null,
            audio:"../assets/audio/beep_1.mp3",
            repeat_audio:false,
            image:left_door_default_image,
        }],
        vision_image:left_door_default_image
    }),
    new Door({
        x:1000,
        y:170,
        type:'right',
        width: 220, 
        height: 450,
        place_location_number:6,
        animatronic_view_list:[{
                identifier:0,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:await onLoadImage("../teste_tamanho2.png"),
            },
            {
                identifier:null,
                audio:"../assets/audio/beep_1.mp3",
                repeat_audio:false,
                image:right_door_default_image,
        }],
        vision_image:right_door_default_image
    })
]

export {
    door_list
}