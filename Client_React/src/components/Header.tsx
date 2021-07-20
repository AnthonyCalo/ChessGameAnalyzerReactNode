import React from "react";



function Header(props: any){
    return(
        <div>
            <h1 className="gameHeader">{props.title}</h1>
        </div>    
            )
}


export default Header;
