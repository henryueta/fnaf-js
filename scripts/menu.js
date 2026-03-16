

document.querySelector("#new-game-option-button").onclick = ()=>{
    document.body.classList.remove("loaded");
    setTimeout(()=>{
        window.location.replace("./pages/game.html")
    },3000)
}

window.onload = ()=>{
    document.body.classList.add("loaded");
}

const canvas = document.getElementById("menu-canvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const img = new Image();
img.src = "../assets/imgs/jumpscare/jumpscare_frame_1.png";

let time = 0;

img.onload = () => {

  ctx.clearRect(0,0,canvas.width,canvas.height);
    const moveX = Math.sin(time) * 40;
  const moveY = Math.cos(time * 0.7) * 20;

  const scale = 1.05;

  const w = canvas.width * scale;
  const h = canvas.height * scale;

  ctx.drawImage(
    img,
    moveX - (w - canvas.width)/2,
    moveY - (h - canvas.height)/2,
    w,
    h
  );
//   requestAnimationFrame(loop);
};

// function loop(){

//   ctx.clearRect(0,0,canvas.width,canvas.height);

//   time += 0.01;

//   const moveX = Math.sin(time) * 40;
//   const moveY = Math.cos(time * 0.7) * 20;

//   const scale = 1.05;

//   const w = canvas.width * scale;
//   const h = canvas.height * scale;

//   ctx.drawImage(
//     img,
//     moveX - (w - canvas.width)/2,
//     moveY - (h - canvas.height)/2,
//     w,
//     h
//   );

//   requestAnimationFrame(loop);
// }


// const option_list = [
//     new MenuOption({
//         title:"New Game",
//         option_button:document.querySelector("#new-game-option-button"),
//         onHandleChoice:()=>{
//         }
//     }),
//     new MenuOption({
//         title:"Continue",
//         option_button:document.querySelector("#continue-game-option-button"),
//         onHandleChoice:()=>{
//             console.log("2");
//         }
//     }),
//     new MenuOption({
//         title:"Extra",
//         option_button:document.querySelector("#extra-option-button"),
//         onHandleChoice:()=>{
//             window.location.replace("./pages/extra.html")
//         }
//     }),
// ]

