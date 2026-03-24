import { Slider } from "./classes/Slider.js";
import { onEntryPage, onExitPage } from "./functions/navigate.js";
import { game_preferences } from "./objects/game-preferences.js";

onEntryPage();

const story_text_slider = new Slider({
    enableClick:false,
    enableCancelButton:true,
    current_slider_text_container:document.querySelector("#current-slider-text"),
    next_slider_text_container:document.querySelector(".slider-container .text-container"),
    cancel_slider_container:document.querySelector("#cancel-slider-text"),
    onCancel:()=>{
      onExitPage("../pages/game.html?type="+
            (game_preferences.onGetItemChoice().mode_type === 'prime_mode'
                ? 'prime_mode'
                : 'new_game'
            ));
    },
    onEnd:()=>{
        onExitPage("../pages/game.html?type="+
            (game_preferences.onGetItemChoice().mode_type === 'prime_mode'
                ? 'prime_mode'
                : 'new_game'
            )
        );
    },
    text_list:(
        game_preferences.onGetItemChoice().mode_type === 'prime_mode'
        ? [
            "Você escolheu o modo PRIME.",
            "Bistecone não tentará te enganar com passos FALSOS nos corredores.",
            "No entanto, ele está mais rápido.",
            "Se escutar algum barulho em um dos corredores não hesite! Use sua lanterna o mais rápido que puder!",
            "É isso, te desejo sorte."
        ]
        :
        [
            "Em 32 de agosto de 2026, o famoso streamer Bistecone foi infectado por um virus de origem desconhecida. Sua aparência física e seu estado mental mudaram drasticamente, resultando em um ser de pura maldade.",
            "Tigrão e Tolinho observando a situação de seu pai unem forças para salvá-lo. A dupla se esconde em um laboratório, onde começam a desenvolver uma cura para o vírus."
        ]
        )
})

setTimeout(()=>{
    story_text_slider.onViewStoryText(); 
    story_text_slider.enableClick = true;  
},4000)
