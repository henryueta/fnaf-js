
const onDisplay = ()=>{

    const userAgent = navigator.userAgent.toLowerCase();
        const isMobileByUA = /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
        const isMobileByWidth = window.innerWidth <= 768;
        return (isMobileByUA || isMobileByWidth) ? "MOBILE" : "PC";

}

export {
    onDisplay
}