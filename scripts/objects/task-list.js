import { Task } from "../classes/Task.js"

const task_list = [
    new Task({
        identifier:0,
        name:"Task",
        final_progress_value:2
    }),
    new Task({
        identifier:1,
        name:"Task",
        final_progress_value:10
    }),
    new Task({
        identifier:2,
        name:"Task",
        final_progress_value:5
    }),
    new Task({
        identifier:3,
        name:"Task",
        final_progress_value:10
    })
]

export {
    task_list
}