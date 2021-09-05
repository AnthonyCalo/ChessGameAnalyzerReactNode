import React from "react";
import "./playerImg.css";

function WhitePlayerImg(props: any){
    if(props.whiteClass!=="white-home"){
        return(
            <div className="game-img">
                <img src={props.whitePlayer}  alt={props.alt} className={`${props.whiteClass} player`}></img>
                <span className="playerName">{props.alt}</span>
            </div>
        )
    }
    else{
        return(
            <>
                <img src={props.whitePlayer}  alt='whitePlayer' className={`${props.whiteClass} homePlayer`}></img>
            </>
        )
    }
    
}
function BlackPlayerImg(props: any){
    if(props.blackClass!=="black-home"){
        return(
            <div className="game-img">
                <img src={props.blackPlayer} alt={props.alt} className={`${props.blackClass} player`}></img>
                <span className="playerName">{props.alt}</span>
            </div>
        )
    }
    else{
        return(
            <>
                <img src={props.blackPlayer} alt='blackPlayer' className={`${props.blackClass} homePlayer`}></img>
            </>
        )
    }
    
}


export {WhitePlayerImg, BlackPlayerImg};


