import React from 'react';
import "./HomePage.css";
import { WhitePlayerImg, BlackPlayerImg } from './WhitePlayerImg';


class HomePage extends React.Component {
    render(){
        return(
        <div className="container">
                <div className='gameListDiv'>
                    <WhitePlayerImg whitePlayer="/playerImgs/fischer.jpg" whiteClass='white-home'/>
                    <div className="LINKGAME"><a href='/fischer_reuben'>Robert Fischer vs Reuben Fine</a></div>
                    <BlackPlayerImg blackPlayer="/playerImgs/ReubenFine.jpg" blackClass="black-home"/>
                </div>
                <div className='gameListDiv'>
                    <WhitePlayerImg whitePlayer="/playerImgs/fischer.jpg" whiteClass='white-home'/>
                    <div className="LINKGAME"><a>Robert Fischer vs Borris Spassky</a></div>
                    <BlackPlayerImg blackPlayer="/playerImgs/Spassky.png" blackClass="black-home"/>
                </div>
                <div className='gameListDiv'>
                    <WhitePlayerImg whitePlayer="/playerImgs/kasparov.jpg" whiteClass='white-home'/>
                    <div className="LINKGAME"><a>Garry Kasparov vs IBM DEEP Blue</a></div>
                    <BlackPlayerImg blackPlayer="/playerImgs/deepblue.jpg" blackClass="black-home"/>
                </div>
                <div className='gameListDiv'>d</div>
                <div className='gameListDiv'>e</div>
                
        </div>
            )
    }
}

export default HomePage;



