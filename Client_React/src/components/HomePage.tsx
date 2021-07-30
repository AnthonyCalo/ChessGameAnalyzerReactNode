import React from 'react';
import "./HomePage.css";
import { WhitePlayerImg, BlackPlayerImg } from './WhitePlayerImg';


class HomePage extends React.Component {
    state = {
        loaded: false
    }
    componentDidMount() {
        this.setState({loaded: true})
    }
    render(){
        if(this.state.loaded){
            return(
            <div className="container">
                    <a href="fischer_reuben"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/fischer.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">
                            Robert Fischer vs Reuben Fine
                        </div>
                        <BlackPlayerImg blackPlayer="/playerImgs/ReubenFine.jpg" blackClass="black-home"/>
                    </div></a>
                    <a href='fischer_spassky'><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/fischer2.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME"><a>Robert Fischer vs Borris Spassky</a></div>
                        <BlackPlayerImg blackPlayer="/playerImgs/Spassky.png" blackClass="black-home"/>
                    </div></a>
                    <a href='kasparov_blue'><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/deepblue.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">IBM Deep Blue vs Garry Kasparov</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/kasparov.jpg" blackClass="black-home"/>
                    </div></a>
                    <a href="carlsen_giri"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/carlsen.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Magnus Carlsen vs Anish Giri</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/giri.jpg" blackClass="black-home"/>
                    </div></a>
                    <a href="carlsen_ivanchuk"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/carlsen2.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Magnus Carlsen vs Vassily Ivanchuk</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/ivanchuk.jpg" blackClass="black-home"/>
                    </div></a>
                    <div className='gameListDiv'>d</div>
                    <div className='gameListDiv'>e</div>
                    
            </div>
            )
        }else{
            return(
                <div >
                    Loading...
                </div>)
        }
            
    }
}

export default HomePage;



