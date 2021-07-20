import React, {useState, useEffect, useRef} from "react";
import Square from "./square";
import ReactDOM from "react-dom";
import { kStringMaxLength } from "node:buffer";
import gameRef from "../game/legalmove";
import MoveButton from "./turnButton";
import SideBar from "./SideBar";
import {WhitePlayerImg, BlackPlayerImg} from "./WhitePlayerImg";
import { isPropertySignature } from "typescript";
import EngineBut from "./Engine";

enum pieceType {
    PAWN,
    KNIGHT,
    BISHOP,
    ROOK,
    QUEEN,
    KING    
}
const pieceNames = ["PAWN", "KNIGHT","BISHOP","ROOK","QUEEN","KING"];

enum Color{
    WHITE,
    BLACK
}

interface Piece{
    image: string
    rank: string
    file: string
    type: pieceType
    color: Color
}

interface TakenPiece{
    piece: any
    moveNumber: number
}
interface Move {
    OS: string
    NS: string
}


const verticalAxis = ["8","7","6","5","4", "3","2","1"]
const horizontalAxis = ["a","b","c","d","e","f","g","h"]

const startingPieces: Piece[] = []
for(var i=0; i<8; i++){
    startingPieces.push({image: "pieces/Wpawn.png", rank: "2", file: horizontalAxis[i], type: pieceType.PAWN, color: Color.WHITE});
}
for(i=0; i<8; i++){
    startingPieces.push({image: "pieces/Bpawn.png", rank: "7", file: horizontalAxis[i], type: pieceType.PAWN, color: Color.BLACK});
}

startingPieces.push({image: "pieces/Wrook.png", rank: "1", file: "a", type: pieceType.ROOK, color: Color.WHITE});
startingPieces.push({image: "pieces/Wrook.png", rank: "1", file: "h", type: pieceType.ROOK, color: Color.WHITE});
startingPieces.push({image: "pieces/Brook.png", rank: "8", file: "a", type: pieceType.ROOK, color: Color.BLACK});
startingPieces.push({image: "pieces/Brook.png", rank: "8", file: "h", type: pieceType.ROOK, color: Color.BLACK});
startingPieces.push({image: "pieces/Wknight.png", rank: "1", file: "b", type: pieceType.KNIGHT, color: Color.WHITE});
startingPieces.push({image: "pieces/Wknight.png", rank: "1", file: "g", type: pieceType.KNIGHT, color: Color.WHITE});
startingPieces.push({image: "pieces/Wbishop.png", rank: "1", file: "c", type: pieceType.BISHOP, color: Color.WHITE});
startingPieces.push({image: "pieces/Wbishop.png", rank: "1", file: "f", type: pieceType.BISHOP, color: Color.WHITE});
startingPieces.push({image: "pieces/Bknight.png", rank: "8", file: "b", type: pieceType.KNIGHT, color: Color.BLACK});
startingPieces.push({image: "pieces/Bknight.png", rank: "8", file: "g", type: pieceType.KNIGHT, color: Color.BLACK});
startingPieces.push({image: "pieces/Bbishop.png", rank: "8", file: "c", type: pieceType.BISHOP, color: Color.BLACK});
startingPieces.push({image: "pieces/Bbishop.png", rank: "8", file: "f", type: pieceType.BISHOP, color: Color.BLACK});
startingPieces.push({image: "pieces/Wqueen.png", rank: '1', file: "d", type: pieceType.QUEEN, color: Color.WHITE});
startingPieces.push({image: "pieces/Wking.png", rank: '1', file: "e", type: pieceType.KING, color: Color.WHITE});
startingPieces.push({image: "pieces/Bqueen.png", rank: '8', file: "d", type: pieceType.QUEEN, color: Color.BLACK});
startingPieces.push({image: "pieces/Bking.png", rank: '8', file: "e", type: pieceType.KING, color: Color.BLACK});



function ChessBoardMovesAlready(props: any){
    const referee = new gameRef();
    const [pieces, setPieces] = useState<Piece[]>(startingPieces); 
    const [turn, setTurn] = useState(0);
    var moveTurn = turn ? "Blacks Move": "Whites Move";
    const [moveCount, setMoveCount] = useState(0);
    const [takenPieces, setTaken]=useState<TakenPiece[]>([])
    const movesList = props.movesList
    
    //const pieces: Piece[] = []
    function buttonClass(){
        if (turn===0){
            return("moveIndicator whiteButton");

        }else{
            return("moveIndicator blackButton")
        }
    }
    
    const moves = []

    const boardRef = useRef<HTMLDivElement>(null);
    var PiecesRef = useRef<Piece[]>(pieces);


    function kingInCheck(color: Color, currentBoard: Piece[]){
        var inCheck = false;
        var king = pieces.find(piece=>piece.color===color && piece.type===5);
        //1st find location of king
        if(king){
            var kingSquare = king.file + king.rank
        }
        //check if any of the pieces on the opposite team can reach that square
        pieces.forEach(piece=>{
            if(piece.color!==color && referee.isValidMove(piece.file+piece.rank, kingSquare, piece.type, piece.color, pieces)){
                inCheck=true;
                console.log(color + " is in check!");
            }
        })
        return (inCheck);
    }

    let activePiece: HTMLElement | null = null;

    const grabPiece = function(event: any){
        const element = event.target;
        //const currSquare = element.parentNode.id;
        const chessboard = boardRef.current;
        if (chessboard){
            let currentRank = verticalAxis[Math.floor((event.clientY- chessboard?.offsetTop) / 75)];
            let currentFile = horizontalAxis[Math.floor((event.clientX - chessboard?.offsetLeft) / 75)];
            let currentPiece = pieces.find(p => p.file===currentFile && p.rank===currentRank);
            if(element.classList.contains("chess-piece") && currentPiece?.color===turn){
                element.style.position="absolute";
                activePiece= element;
            }


        }
 
    }
    function movePiece(event: any){
        const board = boardRef.current;
        if(activePiece && board){
            const boardSideLeft= board.offsetLeft;
            const boardTop= board.offsetTop;
            const boardSideRight = boardSideLeft + board.clientWidth-70;
            const boardBottom =boardTop + board.clientHeight - 70;
            activePiece.style.position="absolute";
            const  x = event.clientX -37.5;
            const  y = event.clientY-37.5;
            //series of if else if keeps piece movement within boards area
            //1st if else if is horizontally and second is vertically
            if( x<boardSideLeft){    
                activePiece.style.left = `${boardSideLeft}px`;
            }else if(x>boardSideRight){
                activePiece.style.left=`${boardSideRight}px`;
            }else{
                activePiece.style.left=`${x}px`;
            }

            if( y<boardTop){    
                activePiece.style.top = `${boardTop}px`;
            }else if(y>boardBottom){
                activePiece.style.top=`${boardBottom}px`;
            }else{
                activePiece.style.top=`${y}px`;
            }
        }
    }
    function placePiece(event: any){
            const chessboard=boardRef.current;
            var validMove = false; //needed to check if a move is okay

            
            if(chessboard){
                var newRank = verticalAxis[Math.floor((event.clientY- chessboard?.offsetTop) / 75)];  //this gets the new square based on where I release the mouse
                var newFile = horizontalAxis[Math.floor((event.clientX - chessboard?.offsetLeft) / 75)];
                var newSquare = newFile + newRank;



                const parent=activePiece?.parentElement//needed to get original square. Need square to find the original piece on square
                var currentPiece=pieces.find(p=> (p.file===parent?.id[0] && p.rank===parent.id[1]));
                
                var attackedPiece = pieces.find(p => p.file===newFile && p.rank===newRank);

                if(currentPiece){
                    //console.log("Parent ID: " + parent?.id);
                    //console.log("New Square: " + newSquare);
                    //console.log("PIECE TYPE: " + pieceNames[currentPiece?.type]);

                    validMove = referee.isValidMove(parent?.id, newSquare, currentPiece?.type, currentPiece?.color, pieces);
                    // console.log(validMove);
                }
                //console.log(newFile+newRank);
                if(attackedPiece && validMove){
                    //console.log("here attacking")
                    const attackSquare = attackedPiece?.file + attackedPiece.rank;

                    setPieces((value)=>{        
                        const piecesMinusOne = value.reduce((results, piece)=>{
                            const pieceSquare=piece.file + piece.rank;
                            
                            if(pieceSquare!==attackSquare){
                                results.push(piece)
                            }
                            return results
                        }, []as Piece[]);
                        return piecesMinusOne;
                    })
                    
                    
                }
                setPieces((prev)=>{
                    const pieces=prev.map((selectPiece)=>{
                        const parent=activePiece?.parentElement
                        if(validMove && parent&& selectPiece.file===parent.id[0] && selectPiece.rank===parent.id[1]){
                            selectPiece.rank=newRank;
                            selectPiece.file=newFile;
                            setTurn(turn===0?1:0);
                        }else{
                            activePiece?.style.removeProperty("top");
                            activePiece?.style.removeProperty("left");
                            }
                        return selectPiece;
                    })
                    return pieces;
                    activePiece=null;
                }
                )
               
            
        }
        }
    function castle(newSquare: string){
        let oldKingSquare ="";
        let newKingSquare="";
        let oldRookSquare="";
        let newRookSquare="";
        if(newSquare==="WK"){
            oldKingSquare="e1";
            newKingSquare="g1";
            oldRookSquare="h1";
            newRookSquare="f1";
        }else if(newSquare==="BK"){
            oldKingSquare="e8";
            newKingSquare="g8";
            oldRookSquare="h8";
            newRookSquare="f8";
        }
        setPieces((prev)=>{
            const pieces=prev.map((selectPiece)=>{
                const parent=activePiece?.parentElement
                if(selectPiece.file===oldKingSquare[0] && selectPiece.rank===oldKingSquare[1]){
                    selectPiece.rank=newKingSquare[1];
                    selectPiece.file=newKingSquare[0];
                }else if(selectPiece.file===oldRookSquare[0] && selectPiece.rank===oldRookSquare[1]){
                    selectPiece.rank=newRookSquare[1];
                    selectPiece.file=newRookSquare[0];
                }
                return selectPiece;
            })
            return pieces;
        }
        )
    }
    function castleBack(newSquare: string){
        let oldKingSquare ="";
        let newKingSquare="";
        let oldRookSquare="";
        let newRookSquare=""; 
        if(newSquare==="WK"){
            oldKingSquare="g1";
            newKingSquare="e1";
            oldRookSquare="f1";
            newRookSquare="h1";
        }else if(newSquare==="BK"){
            oldKingSquare="g8";
            newKingSquare="e8";
            oldRookSquare="f8";
            newRookSquare="h8";
        }
        setPieces((prev)=>{
            const pieces=prev.map((selectPiece)=>{
                const parent=activePiece?.parentElement
                if(selectPiece.file===oldKingSquare[0] && selectPiece.rank===oldKingSquare[1]){
                    selectPiece.rank=newKingSquare[1];
                    selectPiece.file=newKingSquare[0];
                }else if(selectPiece.file===oldRookSquare[0] && selectPiece.rank===oldRookSquare[1]){
                    selectPiece.rank=newRookSquare[1];
                    selectPiece.file=newRookSquare[0];
                }
                return selectPiece;
            })
            return pieces;
        }
        )
        
    } 
    function moveAnimation(oldSquare: string, newSquare: string){
        let os = document.getElementById(oldSquare);
        let ns = document.getElementById(newSquare);
        var oldPiece = os?.getElementsByClassName("chess-piece") as HTMLCollectionOf<HTMLElement>;;
        oldPiece[0].style.position="absolute";
        console.log(oldPiece[0].style.position);
        return true;
    }
    function movePieceGame(move: any){
        if(move[0]==="gameOver"){
            window.alert("Game Over, " + props.gameover);

        }else if(move[0]==="castle"){
            castle(move[1]);
            setMoveCount((prev)=>prev+1);
            setTurn(turn===0?1:0);
        }else{
            //regular move not castle or game over
            const chessboard=boardRef.current;
            var validMove = false; //needed to check if a move is okay
            
            if(chessboard){

                var newSquare = move[1]

                var currentPiece=pieces.find(p=> (p.file===move[0][0] && p.rank===move[0][1]));
                
                
                var attackedPiece = pieces.find(p => p.file===move[1][0] && p.rank===move[1][1]);

                moveAnimation(move[0], newSquare);
                if(attackedPiece){
                    //console.log("here attacking")
                    var taken:TakenPiece={piece: attackedPiece, moveNumber: moveCount}
                    setTaken(prev=>{
                        return [...prev, taken]
                    });
                    const attackSquare = attackedPiece?.file + attackedPiece.rank;

                    setPieces((value)=>{        
                        const piecesMinusOne = value.reduce((results, piece)=>{
                            const pieceSquare=piece.file + piece.rank;
                            
                            if(pieceSquare!==attackSquare){
                                results.push(piece)
                            }
                            return results
                        }, []as Piece[]);
                        return piecesMinusOne;
                    })
                    
                }
                setPieces((prev)=>{
                    const pieces=prev.map((selectPiece)=>{
                        const parent=activePiece?.parentElement
                        if(selectPiece.file===move[0][0] && selectPiece.rank===move[0][1]){
                            selectPiece.rank=move[1][1];
                            selectPiece.file=move[1][0];
                            setTurn(turn===0?1:0);
                        }
                        return selectPiece;
                    })
                    return pieces;
                }
                )
                setMoveCount(prev=> prev+1);            
            }
        }//else close. else meaning it isn't a castle move
    
    }//movePieceGame close
    //called with backbutton moves back a game move
    function setbackMove(){
        setMoveCount(prev=>prev-1);
        setTimeout(function(){
        },200);
    }
    function movePieceBack(){
        const move = movesList[moveCount-1];
        const chessboard=boardRef.current;
        var validMove = false; 
        //set the move count back to do the opposite move
        //function is almost the same as forward function but new and old squares flipped
        if(moveCount===0 || moveCount < 0){
            window.alert("Cant move back from move 0!");
            setMoveCount(0);
        }else if(move[0]==="castle"){
            castleBack(move[1]);
            setTurn(turn===0?1:0);

        }else{
       //needed to check if a move is okay
            
            if(chessboard){

                var newSquare = move[1];
                var oldSquare=move.OS;

                var currentPiece=pieces.find(p=> (p.file===move[1][0] && p.rank===move[1][1]));
                


                setPieces((prev)=>{
                    const pieces=prev.map((selectPiece)=>{
                        const parent=activePiece?.parentElement
                        if(selectPiece.file===move[1][0] && selectPiece.rank===move[1][1]){
                            selectPiece.rank=move[0][1];
                            selectPiece.file=move[0][0];
                            setTurn(turn===0?1:0);
                        }
                        return selectPiece;
                    })
                    return pieces;
                }
                )
                var tookPiece= takenPieces.find(take=>(take.moveNumber===moveCount-1));
                if (tookPiece){
                    setPieces((prev)=>{
                        return [...prev, tookPiece?.piece];
                    })
                }  
            }      
    }
//PROBLEM NEED TO KNOW: AT THE END OF THE NEXT MOVE IT SAYS NEXT MOVE

        
        

        }
    
    let board=[];
    let counter=0;
    //nested loop to create board w/ black/white squares
    //j is x and i is Y
    
    for(var i=0; i<8; i++){
        for(var j=0; j<8; j++){
            if(j===0){
                counter++;
            }
            let position = horizontalAxis[j] + verticalAxis[i]; 

            let image="";
            pieces.forEach(function(piece){
                //if a pieces starting position is equal to a square pass that piece into square creation
                //image is either "" blank or has the URL of a piece.image
                if(piece.file===position[0] && piece.rank===position[1]){
                    image=piece.image;
                }
            })
            board.push(<Square key={position} number={counter} image={image} sText={position} />);
            counter++;      
        }//ends second for loop
    }//ends first for loop



    //putting pieces in the squares


    
    return(
        <>
        <div className="boardDiv">
        <BlackPlayerImg blackPlayer={props.blackPlayer}/>
        <MoveButton color={buttonClass()} turn={moveTurn}/>

        <div className="chessBoard"
            onMouseMove={event => movePiece(event)}
            onMouseDown={event => grabPiece(event)}
            onMouseUp={event => placePiece(event)}
            ref={boardRef}>
            {board}
        </div>
        <WhitePlayerImg whitePlayer={props.whitePlayer} />
        <EngineBut ass={moveCount} game={movesList}/>

        
        </div>

        {/* KChad to use arrow function because onclick won't work with type void */}
        <div className="belowButtons">
        <button id="backBtn" className="backBtn moveBtn" onClick={()=>{setbackMove(); movePieceBack()}}>Move back</button>
        <button id="boardReset" className="moveBtn" onClick={()=>window.location.reload()}>Reset Board</button>
        <button id="nextBtn" className="nextBtn moveBtn" onClick={()=>{movePieceGame(movesList[moveCount])}}>Next Move</button>
        </div>
        </>
        )

}//closes chessboard

export default ChessBoardMovesAlready;

export {pieceType, Color};


//onClick={()=>{movePieceGame(movesList[moveCount])}}
//onClick={()=>{setbackMove(); movePieceBack()}}