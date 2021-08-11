import React from "react";
import "./playerImg.css";

function WhitePlayerImg(props: any){
    if(props.whiteClass!=="white-home"){
        return(
            <>  
                <img src={props.whitePlayer}  alt={props.alt} className={`${props.whiteClass} player`}></img>
            </>
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
            <>
                <img src={props.blackPlayer} alt={props.alt} className={`${props.blackClass} player`}></img>
            </>
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


