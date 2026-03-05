import { Task } from "../classes/Task.js"

const task_list = [
    // new Task({
    //     identifier:0,
    //     name:"Flashlight System Modules",
    //     final_progress_value:2,
    //     to_install:"flashlight"
    // }),
    new Task({
        identifier:1,
        name:"Camera System Modules",
        final_progress_value:10,
        to_install:"camera"
    }),
    new Task({
        identifier:2,
        name:"Empty File",
        final_progress_value:5,
        to_install:null
    }),
    new Task({
        identifier:3,
        name:"Empty File",
        final_progress_value:10,
        to_install:null
    })
]

export {
    task_list
}