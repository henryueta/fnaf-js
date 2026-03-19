
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

    return (
        type === 'firstPlay'
        ? localStorage.getItem("isFirstTimePlaying").toLowerCase() === 'true'
        :
        type === 'gameCompleted'
        ? localStorage.getItem("gameCompleted").toLowerCase() === 'true'
        : {
        isFirstTimePlaying:localStorage.getItem("isFirstTimePlaying").toLowerCase() === 'true',
        gameCompleted:localStorage.getItem("gameCompleted").toLowerCase() === 'true'
    }

    )

}

const onResetData = ()=>{
    localStorage.removeItem("isFirstTimePlaying");
    localStorage.removeItem("gameCompleted");

    onGetPlayerData('all');
}

export {
    onGetPlayerData,
    onSetPlayerData,
    onResetData
}