import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import {movesList, dubov_simon,theApplause, kasparovDB, carlsen_giri, carlsen_ivanchuk, nakamura_bareev, morphy_anderson, kasparov_kramnik} from "./game/moves";
import HomePage from './components/HomePage';
import Game from "./components/GamePage";
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
          <Header title="Games List" />
          <HomePage />
        </Route>  
        <Route exact path="/fischer_reuben">
            <Game 
              title="Reuben Fine vs Robert James Fischer"
              whiteName="Bobby Fischer"
              blackName="Reueben Fine"
              blackImg="/playerImgs/ReubenFine.jpg"
              whiteImg="/playerImgs/fischer.jpg"
              description="Bobby Fischer played the evans gambit and destroyed grandmaster Rueben Fine in 17 moves"
              movesList={movesList}
              gameOver="Reuben Fine resigned in this position"
            /> 
         
        </Route>
        <Route exact path="/fischer_spassky">
            <Game 
              title="Boris Spassky vs Robert James Fischer"
              whiteName="Bobby Fischer"
              blackName="Boris Spassky"
              blackImg="/playerImgs/Spassky.png"
              whiteImg="/playerImgs/fischer2.jpg"
              description="This is game 6 of the 1972 world championships. One of the most famous games ever played. Also known as 'The Applause' game. 
                Boris Spassky stoop up and clapped at the beauty of Fischers play when resigning.
                It is an extra level of intensity because match occured  during the height of the cold war between USSR and The United States.  "
              movesList={theApplause}
              gameOver="Spassky resigned in this position. Then proceeded to stand and clap."
            />
        </Route>
        <Route exact path="/kasparov_blue">
          <Game 
            title="Garry Kasparov vs. IBM Deep Blue"
            whiteName="IBM Deep Blue"
            blackName="Garry Kasparov"
            blackImg="/playerImgs/kasparov.jpg"
            whiteImg="/playerImgs/deepblue.jpg"
            description="This game took place in 1997. It is signifcant moment in chess and technology. 
              This is the first time a computer ever beat the human world champion. "
            movesList={kasparovDB}
            gameOver="Garry Kasparov resigned in this position"
              />
        </Route>
        <Route exact path="/carlsen_giri">
          <Game 
            title="Magnus Carlsen vs Anish Giri"
            whiteName="Magnus Carlsen"
            whiteImg="/playerImgs/carlsen.jpg"
            blackName="Anish Giri"
            blackImg="/playerImgs/giri.jpg"
            description="World champion Magnus Carlsen plays against world #4 at the 2019 Gashimov Memorial. Considered by many game of the year."
            movesList={carlsen_giri}
            gameOver="Anish Giri lost on time. However this was a clearly winning endgame for Magnus"
              />
        </Route>
        <Route exact path="/carlsen_ivanchuk">
          <Game 
            title="Magnus Carlsen vs Vassily Ivanchuk"
            whiteName="Magnus Carlsen"
            blackName="Vasilly Ivanchuk"
            blackImg="/playerImgs/ivanchuk.jpg"
            whiteImg="/playerImgs/carlsen2.jpg"
            description="World champion Magnus Carlsen loses a game to Vassily Ivanchuk. Ivanchuk was awarded the title of Grandmaster by FIDE in 1988. A leading player since 1988, Ivanchuk has been ranked at No. 2 on the FIDE world rankings three times.
              He has beaten several world champions including Kasparov, Karpov and Carlsen."
            movesList={carlsen_ivanchuk}
            gameOver="Magnus resigned in this position"
              />
        </Route>
        <Route exact path="/nakamura_bareev">
          <Game 
            title="Evgeny Bareev vs Hikaru Nakamura"
            whiteName="Hikaru Nakamura"
            blackName="Evgenny Bareev"
            blackImg="/playerImgs/hikaru.jpg"
            whiteImg="/playerImgs/bareev.jpg"
            description="Hikaru Nakamura defeats grandmaster  Evgeny Bareev in 11 moves! Can you find Bareevs Blunder?"
            movesList={nakamura_bareev}
            gameOver="Bareev resigned in this position"
            />
        </Route>
        <Route exact path="/anderssen_morphy">
          <Game 
            title="Adolf Anderssen vs. Paul Morphy"
            whiteName="Paul Morphy"
            whiteImg="/playerImgs/morphy.jpg"
            blackName="Adolf Anderssen"
            blackImg="/playerImgs/Anderssen.jpg"
            description="Beatiful game played in 1858. After winning the 1st American Chess congress(1857), 
              Morphy went to europe to challenge the best players on the continent.
              Here he defeats German grandmaster Anderssen. "
            movesList={morphy_anderson}
            gameOver="Anderssen resigned in this position"
            />          
        </Route>
        <Route exact path="/kramnik_kasparov">
          <Game 
            title="Garry Kasparov vs. Vladimir Kramnik"
            whiteName="Vladimir Kramnik"
            whiteImg="/playerImgs/kramnik.jpg"
            blackName="Garry Kasparov"
            blackImg="/playerImgs/kasparov2.jpg"
            description="Game played at the intel world chess express challenge(1994) in Munich, Germany. This game is unusual and extraordinary because
              Kasparov sacrifices his queen on move 12! Then manages to positionally dominate the rest of the game."
            movesList={kasparov_kramnik}
            gameOver="Kramnik resigned in this position"
              /> 
        </Route>
        <Route exact path="/dubov_simon">
        <Game 
          title="Daniil Dubov vs Simon Williams"
          whiteName="Simon WIlliams"
          whiteImg="/playerImgs/williams.jpg"
          blackName="Daniil Dubov"
          blackImg="/playerImgs/dubov.jpg"
          description="Fun game played at MrDodgy Invitational 2.0, rd 2, May-12 (2021). I chose this game because of the incredible ending.
            Dubov was able to see a forced mate in 9. Beginning on move 23(bishop to a2)"
          movesList={dubov_simon}
          gameOver="Williams resigned in this position"
            /> 
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
