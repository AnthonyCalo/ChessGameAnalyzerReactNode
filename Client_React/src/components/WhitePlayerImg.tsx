import React from "react";
import "./playerImg.css";

function WhitePlayerImg(props: any){
    return(
        <>
            <img src={props.whitePlayer}  alt='whitePlayer' className={`${props.whiteClass} player`}></img>
        </>
    )
}
function BlackPlayerImg(props: any){
    return(
        <>
            <img src={props.blackPlayer} alt='blackPlayer' className={`${props.blackClass} player`}></img>
        </>
    )
}


export {WhitePlayerImg, BlackPlayerImg};


