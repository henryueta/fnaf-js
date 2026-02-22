
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
    {
        x:0,
        y:100,
        width: 180, 
        height: 340,
        type:'left',
        place_location_number:9,
        animatronic_view_list:[{
            identifier:0,
            audio:"../assets/audio/beep_1.mp3",
            repeat_audio:false,
            image:"../teste4.jpeg",
        },
        {
            identifier:null,
            audio:"../assets/audio/beep_1.mp3",
            repeat_audio:false,
            image:"../vinheta.jpeg",
        }]
    },
        {
        x:1000,
        y:170,
        width: 220, 
        height: 450,
        type:'right',
        place_location_number:6,
        animatronic_view_list:[{
            identifier:0,
            audio:"../assets/audio/beep_1.mp3",
            repeat_audio:false,
            image:"../teste4.jpeg",
        },
        {
            identifier:null,
            audio:"../assets/audio/beep_1.mp3",
            repeat_audio:false,
            image:"../vinheta.jpeg",
        }]
    },
]

export {
    door_list
}