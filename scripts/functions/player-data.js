
const onSetPlayerData = (type)=>{

    if(
        (type === 'firstPlay' || type === 'all')
    ){
        localStorage.setItem('isFirstTimePlaying',false);
    }

    if(
        (type === 'gameCompleted' || type === 'all')
    ){
        localStorage.setItem("gameCompleted",true)
    }
    return
}

const onSetPlayerStar = (type,value)=>{

    if(type === 'bad_ending'){
        localStorage.setItem("badEnding",value)
        return
    }

    if(type === 'true_ending'){
        localStorage.setItem("trueEnding",value)
        return
    }

    if(type === ''){
        localStorage.setItem("",value)
        return
    }

}

const onGetPlayerData = (type)=>{

    if(
        (type === 'firstPlay' || type === 'all')
        &&
        localStorage.getItem("isFirstTimePlaying") === null
    ){
        localStorage.setItem('isFirstTimePlaying',true);
        console.log("nao existia firsttime")
    }

    if(
        (type === 'gameCompleted' || type === 'all')
        &&
        localStorage.getItem("gameCompleted") === null
    ){
        localStorage.setItem("gameCompleted",false)
        console.log("nao existia gamecompletd")
    }

    if(
        (
            (type === 'star' || type === 'all')
        )
    ){
       if(localStorage.getItem("badEnding") === null){
        localStorage.setItem("badEnding",false)
       }
       if(localStorage.getItem("trueEnding") === null){
        localStorage.setItem("trueEnding",false)
       }
    }

    return (
        type === 'firstPlay'
        ? localStorage.getItem("isFirstTimePlaying").toLowerCase() === 'true'
        :
        type === 'gameCompleted'
        ? localStorage.getItem("gameCompleted").toLowerCase() === 'true'
        : 
        type === 'star'
        ? {
            bad_ending:localStorage.getItem("badEnding").toLowerCase() === 'true',
            true_ending:localStorage.getItem("trueEnding").toLowerCase() === 'true'
        }
        :{
        isFirstTimePlaying:localStorage.getItem("isFirstTimePlaying").toLowerCase() === 'true',
        gameCompleted:localStorage.getItem("gameCompleted").toLowerCase() === 'true',
        bad_ending:localStorage.getItem("badEnding").toLowerCase() === 'true',
        true_ending:localStorage.getItem("trueEnding").toLowerCase() === 'true'
    }

    )

}

const onResetData = ()=>{
    localStorage.removeItem("isFirstTimePlaying");
    localStorage.removeItem("gameCompleted");
    localStorage.removeItem("badEnding");
    localStorage.removeItem("trueEnding");
    onGetPlayerData('all');
}

export {
    onGetPlayerData,
    onSetPlayerData,
    onResetData,
    onSetPlayerStar
}