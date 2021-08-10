import React from 'react'
import './Movesdis.css';



const MovesDisplay = (props: any)=>{
    const nextMove=()=>{
        var nextMve = document.getElementById("nextBtn");
        nextMve?.click();
    }
    const renderMoves=()=>{
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
        let displayMove = moves.map((move: any, index: number)=>{
            if(move){
                return(
                    <div className="move">
                        <div className="number">{index+1}. </div>
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
            <div className="MD_background">
            <div className="moves_display">
                {renderMoves()}
            </div>
            </div>
            <div className="btns">
                <button className="back_btn MD_btn">Move back</button>
                <button className="reset__button MD_btn" onClick={()=>window.location.reload()}>ResetBoard</button>
                <button className="next_btn MD_btn" onClick={()=>nextMove()}>Next move</button>
            </div>
        </div>
        )
}


export default MovesDisplay;










