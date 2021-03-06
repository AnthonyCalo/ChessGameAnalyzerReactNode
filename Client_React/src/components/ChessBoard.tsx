import React, {useState, useEffect, useRef} from "react";
import { Modal} from 'react-bootstrap';
import GameModal from "./Modal";
import Square from "./square";
import gameRef from "../game/legalmove";
import MovingImage from "./MovingImage";

enum pieceType {
    PAWN,
    KNIGHT,
    BISHOP,
    ROOK,
    QUEEN,
    KING    
}

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

let gameBeginAudio = new Audio("/sound/start.mp3");
let moveSound = new Audio('/sound/move_sound.mp3')

const verticalAxis = ["8","7","6","5","4", "3","2","1"]
const horizontalAxis = ["a","b","c","d","e","f","g","h"]

var startingPieces: Piece[] = []

function create_start(){
    const pieceArray: Piece[]=[]
    for(var i=0; i<8; i++){
        pieceArray.push({image: "pieces/Wpawn.png", rank: "2", file: horizontalAxis[i], type: pieceType.PAWN, color: Color.WHITE});
    }
    for(i=0; i<8; i++){
        pieceArray.push({image: "pieces/Bpawn.png", rank: "7", file: horizontalAxis[i], type: pieceType.PAWN, color: Color.BLACK});
    }
    
    pieceArray.push({image: "pieces/Wrook.png", rank: "1", file: "a", type: pieceType.ROOK, color: Color.WHITE});
    pieceArray.push({image: "pieces/Wrook.png", rank: "1", file: "h", type: pieceType.ROOK, color: Color.WHITE});
    pieceArray.push({image: "pieces/Brook.png", rank: "8", file: "a", type: pieceType.ROOK, color: Color.BLACK});
    pieceArray.push({image: "pieces/Brook.png", rank: "8", file: "h", type: pieceType.ROOK, color: Color.BLACK});
    pieceArray.push({image: "pieces/Wknight.png", rank: "1", file: "b", type: pieceType.KNIGHT, color: Color.WHITE});
    pieceArray.push({image: "pieces/Wknight.png", rank: "1", file: "g", type: pieceType.KNIGHT, color: Color.WHITE});
    pieceArray.push({image: "pieces/Wbishop.png", rank: "1", file: "c", type: pieceType.BISHOP, color: Color.WHITE});
    pieceArray.push({image: "pieces/Wbishop.png", rank: "1", file: "f", type: pieceType.BISHOP, color: Color.WHITE});
    pieceArray.push({image: "pieces/Bknight.png", rank: "8", file: "b", type: pieceType.KNIGHT, color: Color.BLACK});
    pieceArray.push({image: "pieces/Bknight.png", rank: "8", file: "g", type: pieceType.KNIGHT, color: Color.BLACK});
    pieceArray.push({image: "pieces/Bbishop.png", rank: "8", file: "c", type: pieceType.BISHOP, color: Color.BLACK});
    pieceArray.push({image: "pieces/Bbishop.png", rank: "8", file: "f", type: pieceType.BISHOP, color: Color.BLACK});
    pieceArray.push({image: "pieces/Wqueen.png", rank: '1', file: "d", type: pieceType.QUEEN, color: Color.WHITE});
    pieceArray.push({image: "pieces/Wking.png", rank: '1', file: "e", type: pieceType.KING, color: Color.WHITE});
    pieceArray.push({image: "pieces/Bqueen.png", rank: '8', file: "d", type: pieceType.QUEEN, color: Color.BLACK});
    pieceArray.push({image: "pieces/Bking.png", rank: '8', file: "e", type: pieceType.KING, color: Color.BLACK});
    
    return pieceArray;
}
startingPieces= create_start();

var oldGamePosition: Piece[] = [];
function ChessBoardMovesAlready(props: any){
    
    const referee = new gameRef();
    const [pieces, setPieces] = useState<Piece[]>(startingPieces); 
    const [turn, setTurn] = useState(0);
    const [userMovesEngine, setUME] = useState<String[]>([])
    const [moveCount, setMoveCount] = useState(0);
    const [takenPieces, setTaken]=useState<TakenPiece[]>([]);
    //props for modal
    const [modalOpen, setModalOpen] =useState(false);

    function closeModal(){
        setModalOpen(false)
    }
    const movesList = props.movesList
    //says whether or not user moved a piece
    //important for setting board back to old position
    const [playerMoves, setPM] = useState(false);
    //for after player moves set back turn

    function setMove(moveNum: any){
        setMoveCount(moveNum);
        props.setMove(moveNum);
    }
    //passuser moves to the engine
    useEffect(()=>{
        props.passToEngine(userMovesEngine);
    }, );
    useEffect(()=>{
        gameBeginAudio.play();
        props.passToEngine([]);
    }, [])
    
    const boardRef = useRef<HTMLDivElement>(null);

    let activePiece: HTMLElement | null = null;

    const grabPiece = function(event: any){
        const element = event.target;
        //const currSquare = element.parentNode.id;
        const chessboard = boardRef.current;
        if (chessboard){
            let currentRank = verticalAxis[Math.floor((event.clientY- chessboard?.offsetTop) / 94)];
            let currentFile = horizontalAxis[Math.floor((event.clientX - chessboard?.offsetLeft) / 94)];
            let currentPiece = pieces.find(p => p.file===currentFile && p.rank===currentRank);
            if(element.classList.contains("chess-piece")){
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
            const  x = event.clientX -47;
            const  y = event.clientY-47;
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
            
            if(playerMoves===false){
                setPM(true);
                //pushing each piece into a new piece Array
                //it stores the games position before the player moves the pieces. Required to put pieces back
                //newArray=pieces won't work beauase it will not be a pass by reference not pass by value
                pieces.forEach((piece)=>{
                    const oldPiece: Piece = {
                        image: piece.image,
                        rank: piece.rank,
                        file:piece.file,
                        type:piece.type,
                        color:piece.color}
                    oldGamePosition.push(oldPiece);
                })
                
            }
            var validMove = false; //needed to check if a move is okay


            
            if(chessboard){
                var newRank = verticalAxis[Math.floor((event.clientY- chessboard?.offsetTop) / 94)];  //this gets the new square based on where I release the mouse
                var newFile = horizontalAxis[Math.floor((event.clientX - chessboard?.offsetLeft) / 94)];
                var newSquare = newFile + newRank;



                const parent=activePiece?.parentElement//needed to get original square. Need square to find the original piece on square
                var currentPiece=pieces.find(p=> (p.file===parent?.id[0] && p.rank===parent.id[1]));
                //var rightTurn = currentPiece?.color===turn; //checks if players turn

                
                var attackedPiece = pieces.find(p => p.file===newFile && p.rank===newRank);
                if(currentPiece){
                    validMove = referee.isValidMove(parent?.id, newSquare, currentPiece?.type, currentPiece?.color, pieces);
                }
                if(currentPiece?.type===5 && validMove){
                    if(newSquare==="g1" && validMove ){
                        castle("WK");
                        setTurn(turn===0?1:0);

                    }else if(newSquare==="c1" && validMove){
                        castle("WQ");
                        setTurn(turn===0?1:0);

                    }else if(newSquare==="g8" && validMove){
                        castle("BK");
                        setTurn(turn===0?1:0);

                    }else if(newSquare==="c8" && validMove){
                        castle("BQ");
                        setTurn(turn===0?1:0);

                    }
                }
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
                        moveSound.play();

                        return piecesMinusOne;
                    })  
                }
                setPieces((prev)=>{
                    const pieces=prev.map((selectPiece)=>{
                        const parent=activePiece?.parentElement
                        if(validMove && parent&& selectPiece.file===parent.id[0] && selectPiece.rank===parent.id[1]){
                            var moveEngine = parent.id + newSquare;
                            setUME([...userMovesEngine, moveEngine]);
                            //if the moves valid take the piece on current parent square
                            //then give that piece a new rank/ file
                            selectPiece.rank=newRank;
                            selectPiece.file=newFile;
                            setTurn(turn===0?1:0);
                        }else{
                            activePiece?.style.removeProperty("top");
                            activePiece?.style.removeProperty("left");
                            }
                        moveSound.play();
                        return selectPiece;
                    })
                    activePiece=null;
                    return pieces;
                }
                )
               
            
        }
        }
    //Castle function basically moves two pieces the rook and king
    //has to be a seperate function than normal one piece move functin
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
        }else if(newSquare==="BQ"){
            oldKingSquare="e8";
            newKingSquare="c8";
            oldRookSquare="a8";
            newRookSquare="d8";
        }else if(newSquare==="WQ"){
            oldKingSquare="e1";
            newKingSquare="c1";
            oldRookSquare="a1";
            newRookSquare="d1";
        }
        setPieces((prev)=>{
            const pieces=prev.map((selectPiece)=>{
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
        }else if(newSquare==="BQ"){
            oldKingSquare="c8";
            newKingSquare="e8";
            oldRookSquare="d8";
            newRookSquare="a8";
        }else if(newSquare==="WQ"){
            oldKingSquare="c1";
            newKingSquare="e1";
            oldRookSquare="d1";
            newRookSquare="a1";
        }
        setPieces((prev)=>{
            const pieces=prev.map((selectPiece)=>{
                //castle 1st if moves the king and second moves rook
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

    //called with movewithAn(imation) function below
    function createAnPiece(imgUrl, oldTop, oldLeft, newTop, newLeft){
        const animatedPiece = new MovingImage(imgUrl, oldTop, oldLeft, newTop, newLeft)
        let lastTime=0
        let pieceExists=true
        function update(time){
            if(lastTime!=null && pieceExists===true){
                const delta=time-lastTime
                animatedPiece.update(delta)

            }
            lastTime=time
            window.requestAnimationFrame(update)

        }
        if(pieceExists){
            window.requestAnimationFrame(update)
        }
        setTimeout(()=>{
            pieceExists=false;
        }, 300)
    }
    function moveBackWithAn(){
        // if(moveCount<1){
        //     return
        // }
        const move = movesList[moveCount-1]
        if(!move){
            return
        }
        if(move[0]=="castle"){
            let m1, m2;
            if(move[1]==="WK"){
                m1 = ["e1", "g1"]
                m2 = ["h1", "f1"]
            }else if(move[1]=="WQ"){
                m1 = ["e1", "c1"]
                m2 = ["a1", "d1"]
            }else if(move[1]=="BK"){
                m1 = ["e8", "g8"]
                m2 = ["h8", "f8"]
            }else{
                m1 = ["e8", "c8"]
                m2 = ["a8", "d8"]
            }
            getAnimationInfo(m1, "backward")
            getAnimationInfo(m2, "backward")
        }else{
            getAnimationInfo(move, "backward")
        }
        setTimeout(()=>{
            movePieceBack()
            
        }, 300)
    }
    function getAnimationInfo(move:any, direction:String="forward"){
        let beforeSquare: any;
        let newSquare: any;
        if( direction==="backward"  && move){
            const newid= move[0][0] + move[0][1]
            const id=move[1][0] + move[1][1]
            beforeSquare = document.getElementById(id)
            newSquare= document.getElementById(newid)
        }else if(direction=="forward" && move){
            const id= move[0][0] + move[0][1]
            const newid=move[1][0] + move[1][1]
            beforeSquare = document.getElementById(id)
            newSquare= document.getElementById(newid)
        }

        if(beforeSquare && newSquare){
            //console.log(getComputedStyle(beforeSquare).getPropertyValue("position"));
            //square location for animation function
            var rect = beforeSquare.getBoundingClientRect();
            var newRect= newSquare.getBoundingClientRect();
            if(!beforeSquare.getElementsByClassName("chess-piece")[0]){
                return
            }
            //gets image url from intial square. Need for createAnPiece function
            let imgURL=getComputedStyle(beforeSquare.getElementsByClassName("chess-piece")[0])?.getPropertyValue("background-image")
            //this basically hides the current square so that the piece isn't shown twice during movement
            let befMove= beforeSquare.getElementsByClassName("chess-piece")[0]
            befMove.classList.add("hideBg")
            imgURL = imgURL.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
            //console.log(imgURL)
            createAnPiece(imgURL, rect.y, rect.x, newRect.y, newRect.x);

        }
    }
    function moveWithAn(move: any){
    //move with animation calls the animation of piece
    //waits for animation time: then call move piece game function where react
    //will update stae to re-render pieces on correct square
        if(!move){
            return
        }
        setMove(moveCount+1);            
        
        setTimeout(()=>{
            movePieceGame(move)
  
        }, 300)
        if(move[0]=="castle"){
            let m1, m2;
            if(move[1]==="WK"){
                m1 = ["e1", "g1"]
                m2 = ["h1", "f1"]
            }else if(move[1]=="WQ"){
                m1 = ["e1", "c1"]
                m2 = ["a1", "d1"]
            }else if(move[1]=="BK"){
                m1 = ["e8", "g8"]
                m2 = ["h8", "f8"]
            }else{
                m1 = ["e8", "c8"]
                m2 = ["a8", "d8"]
            }
            getAnimationInfo(m1)
            getAnimationInfo(m2)
        }else{
            getAnimationInfo(move)
        }
    }

    function movePieceGame(move: any){
        //set pieces to old game position from saved oldGamePosition variable
        if(playerMoves){
            setPieces(oldGamePosition);
            setPM(false);
            oldGamePosition=[];
            setUME([]);
        }
        moveSound.play()
        //if(movesList[moveCount+1][0]==="gameOver"){

        if(move[0]==="gameOver"){
            //end of game. BeforeEnd shows this is the end game modal
            setModalOpen(true);

        }else if(move[0]==="castle"){
            castle(move[1]);
            setTurn(turn===0?1:0);
        }else{
            //regular move not castle or game over
            const chessboard=boardRef.current;
            
            if(chessboard){                
                
                var attackedPiece = pieces.find(p => p.file===move[1][0] && p.rank===move[1][1]);

                //moveAnimation(move[0], newSquare);
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
                        if(selectPiece.file===move[0][0] && selectPiece.rank===move[0][1]){
                            if(selectPiece.type==0 && ((move[1][1]=='8' && selectPiece.color==0) || (move[1][1]==='1' && selectPiece.color==1))){
                                selectPiece.type=4;
                                selectPiece.image=("pieces/Bqueen.png")
                            }

                            selectPiece.rank=move[1][1];
                            selectPiece.file=move[1][0];
                            setTurn(turn===0?1:0);
                        }
                        return selectPiece;
                    })
                    return pieces;
                }
                )
            }
        }//else close. else meaning it isn't a castle move
    
    }//movePieceGame close
    //called with backbutton moves back a game move
    function setbackMove(){
        if(moveCount<1){
            return
        }
        setMove(moveCount-1);
        // setTimeout(function(){
        // },200);
    }
    function movePieceBack(){
        const move = movesList[moveCount-1];
        const chessboard=boardRef.current;
        moveSound.play();
        //first checks if user moved pieces from game.
        //same as move forward function
        if(playerMoves){
            setPieces(oldGamePosition);
            setUME([]);
            setPM(false);
            oldGamePosition=[];
        } 
        //set the move count back to do the opposite move
        //function is almost the same as forward function but new and old squares flipped
        if(move[0]==="castle"){
            castleBack(move[1]);
            setTurn(turn===0?1:0);

        }else{
            //not reverting a castle or going back from 0. normal  back move    
            if(chessboard){
                setPieces((prev)=>{
                    const pieces=prev.map((selectPiece)=>{
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
        }
    
    let board: any=[];
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
                //if a pieces position is equal to a square pass that piece into square creation
                //image is either "" blank or has the URL of a piece.image
                if(piece.file===position[0] && piece.rank===position[1]){
                    image=piece.image;
                    //return;
                }
            })
            board.push(<Square key={position} number={counter} image={image} sText={position} />);
            counter++;      
        }//ends second for loop
    }//ends first for loop

    // this function resets the board to starting position and sets move to 0.
    //it's called by the movedisplay component. It .clicks a hidden button 
    const resetBoard=()=>{
        const starting = create_start()
        gameBeginAudio.play();
        setPieces(starting)
        setMove(0)
    }


    //putting pieces in the squares


    
    return(
        <>
        <div className="boardDiv">
        {/* <MoveButton color={buttonClass()} turn={moveTurn}/> */}


        <div className="chessBoard"
            onMouseMove={event => movePiece(event)}
            onMouseDown={event => grabPiece(event)}
            onMouseUp={event => placePiece(event)}
            ref={boardRef}>
            {board}
        </div>      
        </div>
        {/* KChad to use arrow function because onclick won't work with type void */}
        <div className="belowButtons">
        <button id="backBtn" className="backBtn moveBtn" onClick={()=>{setbackMove(); moveBackWithAn()}}>Move back</button>
        <button id="boardReset" className="moveBtn" onClick={()=>resetBoard()}>Reset Board</button>
        <button id="nextBtn" className="nextBtn moveBtn" onClick={()=>{moveWithAn(movesList[moveCount])}}>Next Move</button>
        </div>
        <Modal 
            show={modalOpen}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <GameModal closeModal={setModalOpen} text={props.gameover}/>
        </Modal>
        </>
        )

}//closes chessboard

export default ChessBoardMovesAlready;

export {pieceType, Color};


