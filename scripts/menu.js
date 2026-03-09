import {MenuOption} from "../scripts/classes/MenuOption.js"
import { preference_manager } from "./objects/preference-manager.js";

preference_manager.onStart();

const option_list = [
    new MenuOption({
        title:"New Game",
        option_button:document.querySelector("#new-game-option-button"),
        onHandleChoice:()=>{
            preference_manager.game_preference_choice_container.style.display = 'flex';
        }
    }),
    new MenuOption({
        title:"Continue",
        option_button:document.querySelector("#continue-game-option-button"),
        onHandleChoice:()=>{
            console.log("2");
        }
    }),
    new MenuOption({
        title:"Extra",
        option_button:document.querySelector("#extra-option-button"),
        onHandleChoice:()=>{
            console.log("3");
        }
    }),
]

