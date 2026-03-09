import { Task } from "../classes/Task.js"

const task_list = [
    new Task({
        identifier:0,
        name:"Flashlight System Modules",
        final_progress_value:10,
        to_install:"flashlight"
    }),
    // new Task({
    //     identifier:1,
    //     name:"Camera System Modules",
    //     final_progress_value:10,
    //     to_install:"camera"
    // }),
    new Task({
        identifier:2,
        name:"Room 0",
        final_progress_value:2,
        to_install:"resolve-0"
    }),
    new Task({
        identifier:3,
        name:"Room 1",
        final_progress_value:2,
        to_install:"resolve-1"
    }),
    new Task({
        identifier:4,
        name:"Room 2",
        final_progress_value:2,
        to_install:"resolve-2"
    }),
    new Task({
        identifier:5,
        name:"Room 3",
        final_progress_value:2,
        to_install:"resolve-3"
    }),
    new Task({
        identifier:6,
        name:"Room 4",
        final_progress_value:2,
        to_install:"resolve-4"
    }),
    new Task({
        identifier:7,
        name:"Room 5",
        final_progress_value:2,
        to_install:"resolve-5"
    }),
    new Task({
        identifier:8,
        name:"Room 6",
        final_progress_value:2,
        to_install:"resolve-6"
    })
]

export {
    task_list
}