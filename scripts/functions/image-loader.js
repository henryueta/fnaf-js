
const onLoadImage = async (url)=>{
    const img = new Image();
    img.src = url;
    await img.decode();
    return img
}

export {
    onLoadImage
}