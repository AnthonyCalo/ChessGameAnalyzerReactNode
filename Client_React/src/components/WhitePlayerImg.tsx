import React from "react";
import "./playerImg.css";

function WhitePlayerImg(props: any){
    return(
        <>
            <img src={props.whitePlayer} className="white-player player"></img>
        </>
    )
}
function BlackPlayerImg(props: any){
    return(
        <>
            <img src={props.blackPlayer} className="black-player player"></img>
        </>
    )
}


export {WhitePlayerImg, BlackPlayerImg};


