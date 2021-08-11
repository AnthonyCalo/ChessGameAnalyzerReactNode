import React, {useState} from "react"
import ChessBoardMovesAlready from "./components/ChessBoard2";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import {movesList, theApplause, kasparovDB, carlsen_giri, carlsen_ivanchuk, nakamura_bareev, morphy_anderson} from "./game/moves";
import Description from "./components/Description";
import HomePage from './components/HomePage';
import MovesDisplay from "./components/MovesDisplay";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { WhitePlayerImg, BlackPlayerImg } from "./components/WhitePlayerImg";

function App() {
  const [moveCount, setMoveCount] = useState(0)
  const setMove = (moveNum: any) =>{
    setMoveCount(moveNum)
  }

  return (
    <Router>
     <Sidebar />
      <Switch >
        <Route exact path='/'>
          <Header title="Games List" />
          <HomePage />
        </Route>  
        <Route exact path="/fischer_reuben">
          <Header title="Robert James Fischer vs Reuben Fine" />
          <div className="container">
            <div className="leftSide">
              <div className="blankSpace"></div>
              <BlackPlayerImg alt="Fine" blackPlayer="/playerImgs/ReubenFine.jpg" />
              <WhitePlayerImg alt="Fischer" whitePlayer="/playerImgs/fischer.jpg" />
              <Description description="Bobby Fischer played the evans gambit and destroyed grandmaster Rueben Fine in 17 moves"/>
            </div>
            <div className="middleBoard">
              <ChessBoardMovesAlready  setMove={setMove} movesList={movesList} gameover="Reuben Resigned in this position"/>
            </div>
            <div className="rightSide">
              <MovesDisplay move={moveCount} movesList={movesList}/>
            </div>
          </div>
         
        </Route>
        <Route exact path="/fischer_spassky">
          <Header title="Robert James Fischer vs Boris Spassky" />
          <div className="container">
            <div className="leftSide">
            <div className="blankSpace"></div>
              <BlackPlayerImg alt="Spassky" blackPlayer="/playerImgs/Spassky.png" />
              <WhitePlayerImg alt="Fischer" whitePlayer="/playerImgs/fischer2.jpg" />
              <Description description="This is game 6 of the 1972 world championships. One of the most famous games ever played. Also known as 'The Applause' game. Boris Spassky stoop up and clapped at Fischers the
            beauty of Fischers performance when resigning.
            It is an extra level of intensity because match occured  during the height of the cold war between USSR and The United States.  "/>
            </div>
            <div className="middleBoard">
              <ChessBoardMovesAlready  setMove={setMove} movesList={theApplause} gameover="Spassky Resigned in this position"/>
            </div>
            <div className="rightSide">
              <MovesDisplay move={moveCount} movesList={theApplause}/>
            </div>
          </div>
        </Route>
        <Route exact path="/kasparov_blue">
          <Header title="Garry Kasparov vs. IBM Deep Blue" />
          <div className="container">
            <div className="leftSide">
            <div className="blankSpace"></div>
              <BlackPlayerImg alt="deepBlue" blackPlayer="/playerImgs/deepblue.jpg" />
              <WhitePlayerImg alt="Kasparov" whitePlayer="/playerImgs/kasparov.jpg" />
              <Description description="This game took place in 1997. It is signifcant moment in chess and technology. 
                This is the first time a computer ever beat the human world champion. "/>
            </div>
            <div className="middleBoard">
              <ChessBoardMovesAlready movesList={kasparovDB} setMove={setMove} gameover="Garry Kasparov resigned in this position"/>
            </div>
            <div className="rightSide">
              <MovesDisplay move={moveCount} movesList={kasparovDB}/>
            </div>
          </div>
        </Route>
        <Route exact path="/carlsen_giri">
          <Header title="Magnus Carlsen vs Anish Giri" />
          <div className="container">
            <div className="leftSide">
              <div className="blankSpace"></div>
              <BlackPlayerImg alt="Giri" blackPlayer="/playerImgs/giri.jpg" />
              <WhitePlayerImg alt="Carlsen" whitePlayer="/playerImgs/carlsen.jpg" />
              <Description description="World champion Magnus Carlsen plays against world #4 at the 2019 Gashimov Memorial. Considered by many game of the year."/>
            </div>
            <div className="middleBoard">
            <ChessBoardMovesAlready setMove={setMove} movesList={carlsen_giri} gameover="Anish Giri lost on time. However this was a clearly winning endgame for Magnus"/>
            </div>
            <div className="rightSide">
              <MovesDisplay move={moveCount} movesList={carlsen_giri}/>
            </div>
          </div>
        </Route>
        <Route exact path="/carlsen_ivanchuk">
          <Header title="Magnus Carlsen vs Vassily Ivanchuk" />
          <div className="container">
            <div className="leftSide">
              <div className="blankSpace"></div>
              <BlackPlayerImg alt="Ivanchuk" blackPlayer="/playerImgs/ivanchuk.jpg" />
              <WhitePlayerImg alt="Carlsen" whitePlayer="/playerImgs/carlsen2.jpg" />
              <Description description="World champion Magnus Carlsen loses a game to Vassily Ivanchuk. Ivanchuk was awarded the title of Grandmaster by FIDE in 1988. A leading player since 1988, Ivanchuk has been ranked at No. 2 on the FIDE world rankings three times.
              He has beaten several world champions including Kasparov, Karpov and Carlsen."/>
            </div>
            <div className="middleBoard">
            <ChessBoardMovesAlready setMove={setMove} movesList={carlsen_ivanchuk} gameover="Magnus resigned in this position"/>
            </div>
            <div className="rightSide">
              <MovesDisplay move={moveCount} movesList={carlsen_ivanchuk}/>
            </div>
          </div>
        </Route>
        <Route exact path="/nakamura_bareev">
          <Header title="Evgeny Bareev vs Hikaru Nakamura" />
          <div className="container">
            <div className="leftSide">
              <div className="blankSpace"></div>
              <BlackPlayerImg alt="Bareev" blackPlayer="/playerImgs/bareev.jpg" />
              <WhitePlayerImg alt="Nakamura" whitePlayer="/playerImgs/hikaru.jpg" />
              <Description description="Hikaru Nakamura defeats grandmaster  Evgeny Bareev in 11 moves! Can you find Bareevs Blunder?"/>
            </div>
            <div className="middleBoard">
              <ChessBoardMovesAlready setMove={setMove} movesList={nakamura_bareev} gameover="Bareev resigned in this position"/>
            </div>
            <div className="rightSide">
              <MovesDisplay move={moveCount} movesList={nakamura_bareev}/>
            </div>
          </div>
        </Route>
        <Route exact path="/anderssen_morphy">
          <Header title="Adolf Anderssen vs. Paul Morphy" />
          <div className="container">
            <div className="leftSide">
              <div className="blankSpace"></div>
              <BlackPlayerImg alt="Anderssen" blackPlayer="/playerImgs/anderssen.jpg" />
              <WhitePlayerImg alt="Morphy" whitePlayer="/playerImgs/morphy.jpg" />
              <Description description="Beatiful game played in 1858. After winning the 1st American Chess congress(1857), 
                Morphy went to europe to challenge the best grandmasters in the continent.
                He defeats German grandmaster Anderssen. "
                />
            </div>
            <div className="middleBoard">
              <ChessBoardMovesAlready setMove={setMove} movesList={morphy_anderson} gameover="Anderson resigned in this position"/>
            </div>
            <div className="rightSide">
              <MovesDisplay move={moveCount} movesList={morphy_anderson}/>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
