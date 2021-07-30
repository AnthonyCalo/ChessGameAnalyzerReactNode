import { any } from "prop-types";
import React from "react";

export default class EngineBut extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        
    };
    
    
    getMoveNum(){
        var moveNum = document.getElementById("moveNumber")?.innerHTML;
        var moveNumber=0
        var moveList = this.props.game;
        if(moveNum!==undefined){
            moveNumber= parseInt(moveNum);
        }
        var moveListForEngine = [];
        for(var i=0; i<moveNumber; i++){
            if(moveList[i][1]==="WK"){
                moveListForEngine.push("e1g1");
            }else if(moveList[i][1]=="BK"){
                moveListForEngine.push("e8g8");
            }else if (moveList[i][1]==="BQ"){
                moveListForEngine.push("e8c8");
            }else{
                moveListForEngine.push(moveList[i][0] + moveList[i][1]);
            }
        }

        console.log("move list engine: " + moveListForEngine.join(' '));
        this.getBest(moveListForEngine.join(' '));
    }
    glowRed(element1: any, element2: any){
        var oldbackground1 = element1.style.backgroundColor;
        var oldbackground2 = element2.style.backgroundColor;

        element1.style.backgroundColor = 'red';
        element2.style.backgroundColor = 'red';
        setTimeout(function(){
            element1.style.backgroundColor=oldbackground1;
            element2.style.backgroundColor=oldbackground2;
       },1000);
    }
    getBest(movesListicle: string){
        var bestMove ="" 
        fetch("http://localhost:3001/", {
                method: "POST",
                headers: {'Content-Type': 'application/json',
                            'Accept': 'application/json'},
                body: JSON.stringify({ "moves": movesListicle})
            })
            .then((response)=>response.json())
            .then(body=> {
                //console.log("Best Move: " + body.bm);
                bestMove=body.bm;
                console.log("best move in then: " + bestMove);
                var bmOldSquare = bestMove.slice(0,2);
                var bmNewSquare = bestMove.slice(2,4);
                var oldSquare= document.getElementById(bmOldSquare);
                var newSquare= document.getElementById(bmNewSquare);
                this.glowRed(oldSquare, newSquare);
            })
            .catch((err)=>{console.log("error: " + err);})
        }
    render(){
        return(
            <div className="engine"> 
                <p className="moveNumber" id="moveNumber">{this.props.ass}</p>
                <button type="submit" onClick={()=>{this.getMoveNum()}}>What would the engine play?</button>
            </div>)    
    }

}
