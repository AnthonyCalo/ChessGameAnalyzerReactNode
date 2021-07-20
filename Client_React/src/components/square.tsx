import "./square.css";

interface Props{
    number: number;
    image: string;
    sText: string;
}

function Square({number, image, sText}: Props){
    //goes back forth on black white squares
    //adds the class of chesspiece and the background image if there is a piece on the square
    //we can tell by whether or not an image for a piece is added to square
    var label="";
    if(sText[0]==="a"){
        label=sText[1]
    }else if(sText[1]==="1"){
        label=sText[0]
    }
    if(number%2===0){
        if(image!==""){
            return(
                <div className={"black-square square"} id={sText} >{label}
                    <div className="chess-piece" style={{backgroundImage: `url(${image})`}}></div>
                </div>)
        }
        else{
        return(
            <div className={"black-square square"} id={sText} >
                {label}
            </div>)       
        }
    }
    else{  
        if(image!==""){  
            return(
                <div className={"white-square square"} id={sText} >{label}
                    <div className="chess-piece" style={{backgroundImage: `url(${image})`}}></div>

                </div>)}
        else{
            return(
                <div className={"white-square square"} id={sText} >
                {label}</div>) 
        }
        }
}

export default Square

