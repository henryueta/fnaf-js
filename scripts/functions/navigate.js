
const onEntryPage = (noWindow)=>{
    
    if(noWindow){
        document.querySelector(".page-container").classList.add("loaded");
        document.querySelector(".page-load").classList.add("loaded");
        return
    }

    window.onload = ()=>{
        document.querySelector(".page-container").classList.add("loaded");
        document.querySelector(".page-load").classList.add("loaded");
    }
}

const onExitPage = (to)=>{
    document.body.style.pointerEvents = 'none';
    setTimeout(()=>{
        document.querySelector(".page-container").classList.remove("loaded");
        document.querySelector(".page-load").classList.remove("loaded");
    },1000)
    setTimeout(()=>{
        window.location.replace(to)
    },4000)
    return
}

export {
    onEntryPage,
    onExitPage
}