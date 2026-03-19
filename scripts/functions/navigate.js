
const onNavigate = (to)=>{
    document.body.style.pointerEvents = 'none';
    setTimeout(()=>{
        document.body.classList.remove("loaded");
    },1000)
    setTimeout(()=>{
        window.location.replace(to)
    },4000)
    return
}

export {
    onNavigate
}