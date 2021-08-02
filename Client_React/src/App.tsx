import React from "react"
import ChessBoardMovesAlready from "./components/ChessBoard2";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import {movesList, theApplause, kasparovDB, carlsen_giri, carlsen_ivanchuk} from "./game/moves";
import Description from "./components/Description";
import HomePage from './components/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
     <Sidebar />
      <Switch >
        <Route exact path='/'>
          <Header title="Choose a game" />
          <HomePage />
        </Route>  
        <Route exact path="/fischer_reuben">
          <Header title="Robert James Fischer vs Reuben Fine" />
          <Description description="Bobby Fischer played the evans gambit and destroyed grandmaster Rueben Fine in 17 moves"/>
          <ChessBoardMovesAlready whitePlayer="/playerImgs/fischer.jpg" blackPlayer="/playerImgs/ReubenFine.jpg" movesList={movesList} gameover="Reuben Resigned in this position"/>
        </Route>
        <Route exact path="/fischer_spassky">
          <Header title="Robert James Fischer vs Boris Spassky" />
          <ChessBoardMovesAlready whitePlayer="/playerImgs/fischer.jpg" blackPlayer="/playerImgs/Spassky.png" movesList={theApplause} gameover="Spassky Resigned in this position"/>
          <Description description="This is game 6 of the 1972 world championships. One of the most famous games ever played. Also known as 'The Applause' game. Boris Spassky stoop up and clapped at Fischers the
          beauty of Fischers performance when resigning.
            It is an extra level of intensity because match occured  during the height of the cold war between USSR and The United States.  "/>
        </Route>
        <Route exact path="/kasparov_blue">
          <Header title="Garry Kasparov vs. IBM Deep Blue" />
          <ChessBoardMovesAlready whitePlayer="/playerImgs/deepblue.jpg" blackPlayer="/playerImgs/kasparov.jpg" movesList={kasparovDB} gameover="Garry Kasparov resigned in this position"/>
          <Description description="This game is signifcant because it is the first time a computer ever beat the human world championship. "/>
        </Route>
        <Route exact path="/carlsen_giri">
          <Header title="Magnus Carlsen vs Anish Giri" />
          <Description description="World champion Magnus Carlsen plays against world #4 at the 2019 Gashimov Memorial. Considered by many game of the year."/>
          <ChessBoardMovesAlready whitePlayer="/playerImgs/carlsen.jpg" blackPlayer="/playerImgs/giri.jpg" movesList={carlsen_giri} gameover="Anish Giri lost on time. However this was a clearly winning endgame for Magnus"/>
        </Route>
        <Route exact path="/carlsen_ivanchuk">
          <Header title="Magnus Carlsen vs Vassily Ivanchuk" />
          <Description description="World champion Magnus Carlsen loses a game to Vassily Ivanchuk. Although Ivanchuk wasn't world champion he is considers one of the best players in the last several generations. He has beaten several world champions including Kasparov, Karpov and Carlsen."/>
          <ChessBoardMovesAlready whitePlayer="/playerImgs/carlsen.jpg" blackPlayer="/playerImgs/ivanchuk.jpg" movesList={carlsen_ivanchuk} gameover="Magnus resigned in this position"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
