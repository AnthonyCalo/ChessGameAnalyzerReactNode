import React from "react"
import ChessBoardMovesAlready from "./components/ChessBoard2";
import ChessBoard from "./components/ChessBoard";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import {movesList, theApplause, kasparovDB} from "./game/moves";
import Description from "./components/Description";
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
        <Route exact path="/fischer_reuben">
          <Header title="Robert James Fischer vs Daniel Reuben" />
          <ChessBoardMovesAlready whitePlayer="/playerImgs/fischer.jpg" blackPlayer="/playerImgs/ReubenFine.jpg" movesList={movesList} gameover="Reuben Resigned in this position"/>
          <Description description="Bobby Fischer played the evans gambit and destroyed grandmaster Daniel Rueben in 17 moves"/>
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
      </Switch>
    </Router>
  //   <Router>
  //     <Switch>
  //   <Route path="/about">
  //     <ChessBoard />
  //   </Route>
  //   <Route path="/">
  //   <Header title="Robert James Fischer vs Daniel Reuben" />

  //     <Sidebar />
  //     <PlayerImg whitePlayer="/playerImgs/fischer.jpg" blackPlayer="/playerImgs/ReubenFine.jpg" />
  //     <ChessBoardMovesAlready movesList={movesList}/>
  //   </Route>
  // </Switch>
  //   </Router>
  );
}

export default App;
