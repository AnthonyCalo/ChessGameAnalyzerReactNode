import React from 'react';
import EngineBut from './Engine';
import './Movesdis.css';



const MovesDisplay = (props: any)=>{
    const nextMove=()=>{
        var nextMve = document.getElementById("nextBtn");
        nextMve?.click();
    }
    const backMove=()=>{
        var backMve = document.getElementById("backBtn");
        backMve?.click();
    }
    const renderMoves=()=>{
        //returns a white move and black move
        //if index =0 or index is even then that move is white and the next is blacks
        const moves= props.movesList.map((move: any, index: number)=>{
            if((index===0 || index%2===0) &&  move[0]!=="gameOver"){  
                return(
                <>
                    <div className={`white_move ${index===props.move-1 ? "current_move": ""}`}>{move[1]}</div>
                    <div className= {`black_move ${index+1===props.move-1 ? "current_move": ""}`}>{props.movesList[index+1][1]}</div>  
                </>)
            }            
            return null;
            
        });
        var Counter=0;

        let displayMove = moves.map((move: any, index: number)=>{
            if(move){
                Counter+=1;
                return(
                        <div className="move">
                            <div className="number">{Counter}. </div>
                            {move}
                        </div>)
                }
            }
            
        )
        return (displayMove);   
     }

    return(
        <div className="movesDisplay">
            <h2 className="MD_head fixed sticky">Moves List</h2>
            <div className="moves_display">
                {renderMoves()}
            </div>
            <div className="buttons">
                <EngineBut userMoveEngine={props.userMoveEngine} game={props.movesList} moveNum={props.move} />
                <div className="btns">
                    <button className="back_btn MD_btn" onClick={()=>backMove()}>Move back <br/>&#40; &#8592; &#41;</button>
                    <button className="reset__button MD_btn" onClick={()=>window.location.reload()}>ResetBoard</button>
                    <button className="next_btn MD_btn" onClick={()=>nextMove()}>Next move<br/>&#40; &#8594; &#41;</button>
                </div>
            </div>
            
        </div>
        )
}


export default MovesDisplay;










