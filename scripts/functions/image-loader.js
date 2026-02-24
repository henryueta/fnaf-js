
const onLoadImage = async (url)=>{
    const img = new Image();
    img.src = url;
    await img.decode();
    console.log(url)
    return img
}

export {
    onLoadImage
}