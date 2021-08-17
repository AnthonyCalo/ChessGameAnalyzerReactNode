import React from "react";
import "./engine.css"

const EngineBut = (props)=>{

    const getMoveNum=()=>{
        var moveNumber=props.moveNum;
        var moveList: any = props.game;
        var moveListForEngine:any = [];
        for(var i=0; i<moveNumber; i++){
            if(moveList[i][1]==="WK"){
                moveListForEngine.push("e1g1");
            }else if(moveList[i][1]==="BK"){
                moveListForEngine.push("e8g8");
            }else if (moveList[i][1]==="BQ"){
                moveListForEngine.push("e8c8");
            }else{
                moveListForEngine.push(moveList[i][0] + moveList[i][1]);
            }
        }
        if(props.userMoveEngine.length>0){
            console.log("ENGINE CALLED USER MOVES")
            console.log(moveListForEngine.join(' '), props.userMoveEngine.join(' '));
            let GB_param:any = [];
            if(moveListForEngine.length>0){
                GB_param = (moveListForEngine.join(' ') + " " + props.userMoveEngine.join(' '));
            }else{
                GB_param = (props.userMoveEngine.join(' '));
            }
            getBest(GB_param);
        }else{
            console.log("ENGINE CALLED NO USER MOVES")
            console.log("move list engine: " + moveListForEngine.join(' '));
            getBest(moveListForEngine.join(' '));            
        }
        
    }
    const glowRed=(element1: any, element2: any)=>{        
        element1.classList.add("glowRed");
        element2.classList.add("glowRed");
        //fixed bug. Since white background image can't just add background color red to it
        setTimeout(function(){
            element1.classList.remove("glowRed");
            element2.classList.remove("glowRed");
       },1000);
    }
    const getBest=(movesListicle: string)=>{
        if(movesListicle){
            var bestMove ="" 
            fetch("http://localhost:3001/", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json',
                                'Accept': 'application/json'},
                    body: JSON.stringify({ "moves": movesListicle})
                })
                .then((response)=>response.json())
                .then(body=> {
                    bestMove=body.bm;
                    console.log("best move in then: " + bestMove);
                    var bmOldSquare = bestMove.slice(0,2);
                    var bmNewSquare = bestMove.slice(2,4);
                    var oldSquare= document.getElementById(bmOldSquare);
                    var newSquare= document.getElementById(bmNewSquare);
                    glowRed(oldSquare, newSquare);
                })
                .catch((err)=>{console.log("error: " + err);})
            }else{
                var oldSquare= document.getElementById("e2");
                var newSquare= document.getElementById("e4");
                glowRed(oldSquare, newSquare);
            }
        }

    return(
    <div className="engine"> 
        <button type="submit" onClick={()=>{getMoveNum()}}>What would the engine play?</button>
    </div>)    

}

export default EngineBut;
    
    
