import React from "react";
import Accordion from "./Accordion";



export default function Description(props:any){
    const items =[
        {
        title: "See Game Description",
        content: props.description
    }
]
    return(
        <div className="description">
            <Accordion items={items} />
            </div>)
}