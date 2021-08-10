import React, {useState} from 'react';

const Accordion =({ items })=>{
    const [activeIndex, setActiveIndex]=useState(null);

    const onTitleClick=(index)=>{
        if(activeIndex===index.index){
            setActiveIndex(null);
        }else{
            setActiveIndex(index.index);
        }
        //console.log(index);
    }
    const renderedItems = items.map((item, index)=>{
        if(activeIndex===index){
            return(
            <React.Fragment key={index}>
                <div
                className="accordion_title"
                onClick={()=>{onTitleClick({index})}}
                >
                    Hide Description &nbsp;
                    <i className="arrow up"></i>

                </div>

                <div className="accordion_content">
                    <p>{item.content}</p>
                </div>
            </React.Fragment>)}
        else{
            return(
            <React.Fragment key={index}>
                <div
                    className="accordion_title "
                    onClick={()=>{onTitleClick({index})}}
                >
                    {item.title} &nbsp;
                    <i className="arrow down"></i>

                </div>
            </React.Fragment>)
        }
    })
    return (
        <div className="accordion">
            {renderedItems}
        </div>     
    )
}

export default Accordion;




