
const door_list = [
    {
        x:1022,
        y:440,
        width: 450, 
        height: 650,
        type:'center',
        place_location_number:10,
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
            image:"../testeHall.webp",
        }]
    },
    {
        x:190,
        y:232,
        width: 450, 
        height: 650,
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
            image:"../testeHall.webp",
        }]
    },
        {
        x:2290,
        y:248,
        width: 450, 
        height: 650,
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
            image:"../testeHall.webp",
        }]
    },
]

export {
    door_list
}