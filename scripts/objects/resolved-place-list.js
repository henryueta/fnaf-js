import { onLoadImage } from "../functions/image-loader.js"

const resolved_place_list = [
    {
        number:0,
        place_view_list:[
            {
                animatronic_list:[],
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../teste_sala4.png")
            },
            {//alterar depois
                animatronic_list:[0],
                audio:'camera_select',
                repeat_audio:false,
                image:await onLoadImage("../teste_sala2.jpeg")
            },
        ],
    }

]

export {
    resolved_place_list
}