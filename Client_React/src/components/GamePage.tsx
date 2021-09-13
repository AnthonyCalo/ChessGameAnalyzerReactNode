import React, {useState} from 'react';
import Header from "./Header";
import ChessBoardMovesAlready from './ChessBoard';
import { WhitePlayerImg, BlackPlayerImg } from './PlayerImg';
import Description from './Description';
import MovesDisplay from './MovesDisplay';



const Game=(props)=>{
      //both use state hooks are being used to pass info from the chessboard component to the engine
  const [moveCount, setMoveCount] = useState(0);
  const [userMoveEngine, setUserMoveEngine] = useState<String[]>([]);
  const setMove = (moveNum: any) =>{
    setMoveCount(moveNum)
  }
  const passToEngine=(moves)=>{
    if(moves.length === 0 && userMoveEngine.length === 0){
      return;
    }else{
      setUserMoveEngine(moves);
    }
    
  }
    return(
        <>
            <Header title={props.title} />
            <div className="container">
            <div className="leftSide">
                <div className="blankSpace"></div>
                <BlackPlayerImg alt={props.blackName} blackPlayer={props.blackImg} />
                <WhitePlayerImg alt={props.whiteName} whitePlayer={props.whiteImg} />
                <Description description={props.description} />
            </div>
            <div className="middleBoard">
                <ChessBoardMovesAlready  passToEngine={passToEngine} setMove={setMove} movesList={props.movesList} gameover={props.gameOver}/>
            </div>
            <div className="rightSide">
                <MovesDisplay userMoveEngine={userMoveEngine} move={moveCount} movesList={props.movesList}/>
            </div>
            </div>
        </>
        )
}
export default Game;






