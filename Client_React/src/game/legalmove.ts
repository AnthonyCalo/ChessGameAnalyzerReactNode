import  {pieceType, Color}  from "../components/ChessBoard2";

const boardFiles = ["a","b","c","d","e","f","g","h"];
const boardRanks = ["1","2","3","4","5","6","7","8"];

interface Piece{
    image: string
    rank: string
    file: string
    type: pieceType
    color: Color
}
//defining outside gameaRef class so i can use within class
const squareHasPiece = function( file: string, rank: string, currentBoard: Piece[]){
    let hasPiece = false;
    currentBoard.forEach(piece =>{
        let pieceRank = piece.rank;
        let pieceFile = piece.file;
        //console.log("position saught: " + file + rank + "position found: " + piece.rank + piece.file);
        if(rank===pieceRank && pieceFile===file){
            hasPiece=true;
        }
    })
    return hasPiece;
}

const getPieceColor = function( file: string, rank: string, currentBoard: Piece[]){
    let returnedColor = 0;
    currentBoard.forEach(piece => {
        let color = piece.color;
        let pieceRank = piece.rank;
        let pieceFile = piece.file;
        //console.log("position saught: " + file + rank + "position found: " + piece.rank + piece.file);
        if(rank===pieceRank && pieceFile===file){
            returnedColor=color;
        }
    })
    return returnedColor;

}
class gameRef {
    squareHasPiece(file: string, rank: string, currentBoard: Piece[]){
        let hasPiece = false;
        currentBoard.forEach(piece =>{
            let pieceRank = piece.rank;
            let pieceFile = piece.file;
            //console.log("position saught: " + file + rank + "position found: " + piece.rank + piece.file);
            if(rank===pieceRank && pieceFile===file){
                hasPiece=true;
            }
        })
        return hasPiece;
    }
    listOfSquareshavePiece(squares: string[], ){

    }
    
    kingInCheck(color: Color, currentBoard: Piece[]){
        var inCheck = false;
        var king = currentBoard.find(piece=>piece.color===color && piece.type===5);
        //1st find location of king
        if(king){
            var kingSquare = king.file + king.rank
        }
        //check if any of the pieces on the opposite team can reach that square
        currentBoard.forEach(piece=>{
            if(piece.color!==color && this.isValidMove(piece.file+piece.rank, kingSquare, piece.type, piece.color, currentBoard)){
                inCheck=true;
                console.log(color + " is in check!");
            }
        })
        return (inCheck);
    }

    isValidMove(prevSquare: any, newSquare: any, type: pieceType, color: Color, currentBoard: Piece[]){
        var oldY = parseInt(prevSquare[1]);
        var newY = parseInt(newSquare[1]);
        var prevFile = prevSquare[0]
        var newFile = newSquare[0]
        var oldX = boardFiles.indexOf(prevFile);
        var newX = boardFiles.indexOf(newFile);
        var enemyOnSquare: boolean = false;
        var friendlyOnSquare: boolean = false;


        if(squareHasPiece(newFile, `${newY}`, currentBoard) && (getPieceColor(newFile, `${newY}`, currentBoard)!==color)){
            enemyOnSquare=true;
        };
        if(squareHasPiece(newFile, `${newY}`, currentBoard) && (getPieceColor(newFile, `${newY}`, currentBoard)===color)){
            friendlyOnSquare=true;
        };

        //console.log(`${colors[color]} ${pieceNames[type]} moved from ${prevSquare} to ${newSquare}`);
        //function to whether white pawn can move. If it is on 1st rank it can move forward 2
        function whitePawnValidity(){
            if(prevFile===newFile && (newY-oldY===1 || (newY-oldY===2 && oldY===2))){
                return squareHasPiece(newFile, `${newY}`, currentBoard) ? false: true;
            }//take a piece movement
            else if(color===Color.WHITE && (Math.abs(oldX-newX)===1) && newY-oldY===1 && enemyOnSquare){
                return(true);
            }
            else{
                return false;
            }
        }
        function blackPawnValidity(){
            if(prevFile===newFile && (oldY-newY===1 || (oldY-newY===2 && oldY===7))){
                return squareHasPiece(newFile, `${newY}`, currentBoard) ? false: true;
            }//take a piece movement
            else if((Math.abs(newX-oldX)===1) && oldY - newY===1 && enemyOnSquare){
                return(true);
            }
            else{
                return false;
            }

        }
        function RookValidity(){
            var inBetweenSquares: string[] = [];
            let movesValid = true;
            if((newFile===prevFile && newY!==oldY) || (newFile!==prevFile && newY===oldY)){
                //if rooks moving right or left. check the squares in between and make sure they don't have a piece
                // if any piece has a square return false
                if(newX>oldX || newX<oldX){
                    let inBetweenFiles: string[] = [];
                    inBetweenFiles= newX>oldX ? boardFiles.slice(oldX+1, newX): boardFiles.slice(newX+1, oldX)
                    inBetweenFiles.forEach(file =>{
                        inBetweenSquares.push(file + oldY);
                    })
                }else{
                    let inBetweenRanks: string[] = [];
                    inBetweenRanks = newY>oldY ? boardRanks.slice(oldY, newY-1): boardRanks.slice(newY, oldY-1);
                    inBetweenRanks.forEach(rank => {
                        inBetweenSquares.push(prevFile + rank);
                    })
                    // console.log("inbetween squares: " + inBetweenSquares);
                    // console.log("oldY: " + oldY + " newY: " + newY); 
                    //console.log("inbeteween Ranks: " + inBetweenRanks);
                }
                if(inBetweenSquares!==null){
                    inBetweenSquares.forEach(piece => {
                        if(squareHasPiece(piece[0], piece[1], currentBoard)){
                            movesValid=false;
                        }
                    })
                    //returning false because there is a piece in between where the rook is going to and its current square
                    }

                    return movesValid;
            }else{
                return false;
            }
            
        }
        function BishopValidity(){
            let movesValid=true;
            let inBetweenSquares: string[] = [];
            if((newY-oldY===newX-oldX) || (Math.abs(oldY-newY)===Math.abs(oldX-newX))){
                //creating array of ranks/ files inbetween old square and new square then combining into list of
                //squares in between old position and new. THen will check those for a piece
                let inBetweenRanks: string[]=[]
                let inBetweenFiles: string[]=[]
                if(newY>oldY && newX>oldX){
                    //bishop moves up to the right
                    inBetweenFiles=boardFiles.slice(oldX+1, newX);
                    inBetweenRanks=boardRanks.slice(oldY, newY);
                }else if(newY>oldY && newX<oldX){
                    //bishop moves up to the left
                    inBetweenFiles=boardFiles.slice(newX+1, oldX);
                    //reversing because it is going down
                    inBetweenFiles=inBetweenFiles.reverse();
                    inBetweenRanks=boardRanks.slice(oldY, newY); 
                }else if(newY<oldY && newX>oldX){
                    //bishop moves down right
                    inBetweenFiles=boardFiles.slice(oldX+1, newX);
                    inBetweenRanks=boardRanks.slice(newY-1, oldY-1);
                    //reversing the order because it is going down
                    inBetweenRanks=inBetweenRanks.reverse();
                }else{
                    inBetweenFiles=boardFiles.slice(newX+1, oldX);
                    inBetweenRanks=boardRanks.slice(newY, oldY-1);

                }
                    // }else{
                //     //bishop moves downLeft
                //     console.log("bishop moves down right");

                //     inBetweenFiles=boardFiles.slice(oldX+1, newX);
                //     inBetweenRanks=boardRanks.slice(newY-1, oldY-1);
                //     inBetweenFiles=inBetweenFiles.reverse();
                //     inBetweenRanks=boardRanks.slice(oldY, newY);
                // }
                for(var i = 0; i<inBetweenFiles.length; i++){
                    inBetweenSquares.push(inBetweenFiles[i] + inBetweenRanks[i]);
                }
                if(inBetweenSquares!==null){
                    inBetweenSquares.forEach(piece => {
                        if(squareHasPiece(piece[0], piece[1], currentBoard)){
                            movesValid=false;
                            
                        }
                    })
                
                    //returning false because there is a piece in between where the rook is going to and its current square
                    }
            }else{
                movesValid= false;
            }
            return movesValid;
        }
        function KnightValidity(){
            let movesValid=true;
            if(((Math.abs(newX-oldX)===1)&& (Math.abs(newY-oldY)===2)) ||((Math.abs(newX-oldX)===2)&& (Math.abs(newY-oldY)===1)) ){
                console.log("good move");
            }else{
                movesValid=false;
            }
            return movesValid;
        }
        function kingValidity(){
            if((Math.abs(oldX-newX)===1&& oldY===newY) || (Math.abs(oldY-newY)===1&& oldX===newX) || (Math.abs(oldX-newX)===1&&Math.abs(oldY-newY)===1)){
                return true;
            }else{
                return false;
            }
        }
    if(friendlyOnSquare){
        console.log("friend on square! don't take him");
        return false;
    }else{
        if(type===0){
            return(color ? blackPawnValidity(): whitePawnValidity());
        }else if(type===1){
            return(KnightValidity());
        }else if (type===2){
            return(BishopValidity());
        }else if (type===3){
            return(RookValidity());
        }else if (type===4){
            return((RookValidity() || BishopValidity()));
        }else if(type===5){
            return(kingValidity());
        }
        else{
            return(false);
        }

    }    
}
}

export default gameRef;