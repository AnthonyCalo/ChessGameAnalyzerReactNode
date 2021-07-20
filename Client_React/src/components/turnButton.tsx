import React from "react";

function MoveButton(props: any){
    return(
        <div>
          <button className={props.color} >{props.turn}</button>
        </div>
    )
}

export default MoveButton;



