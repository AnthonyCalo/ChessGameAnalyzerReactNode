import React from "react";



export default function Description(props:any){
    return(
        <div className="description">
            <h3>Game Description</h3>
            <p>{props.description}</p>
            </div>)
}