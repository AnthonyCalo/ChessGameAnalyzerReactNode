const express = require('express');
const { Engine } =require("./wukong/wukong");
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

const engine = new Engine();


app.get('/', function(req, res){
    engine.loadMoves("d2d4 b8c6");
    
    var best = engine.search(8);
    // engine.printBoard();
    res.send(best);

})

function bestMove(moves){
    engine.loadMoves(moves);
    return(engine.search(8))
}

app.post("/", async function(req, res){
    try{
        moves = req.body.moves;
        BM = await bestMove(moves);
        const bestMovie = {
            "bm": BM
        };
        
        res.send(bestMovie);
        engine.setBoard(engine.START_FEN);
    }catch(err){
        console.log(err);
    }
})


app.listen(process.env.PORT || 3001, function(){
    console.log("Server listening on port 3001")
})
