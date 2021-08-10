import React from 'react';
import "./HomePage.css";
import { WhitePlayerImg, BlackPlayerImg } from './WhitePlayerImg';
import {Link} from 'react-router-dom';


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
            <div className="container_homepage">
                    <Link to="fischer_reuben"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/fischer.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">
                            Robert Fischer vs Reuben Fine
                        </div>
                        <BlackPlayerImg blackPlayer="/playerImgs/ReubenFine.jpg" blackClass="black-home"/>
                    </div></ Link>
                    <Link to='fischer_spassky'><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/fischer2.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Robert Fischer vs Borris Spassky</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/Spassky.png" blackClass="black-home"/>
                    </div></ Link>
                    <Link to='kasparov_blue'><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/deepblue.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">IBM Deep Blue vs Garry Kasparov</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/kasparov.jpg" blackClass="black-home"/>
                    </div></ Link>
                    <Link to="carlsen_giri"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/carlsen.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Magnus Carlsen vs Anish Giri</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/giri.jpg" blackClass="black-home"/>
                    </div></ Link>
                    <Link to="carlsen_ivanchuk"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/carlsen2.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Magnus Carlsen vs Vassily Ivanchuk</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/ivanchuk.jpg" blackClass="black-home"/>
                    </div></ Link>
                    <Link to="nakamura_bareev"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/bareev.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Evgeny Bareev vs Hikaru Nakamura</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/hikaru.jpg" blackClass="black-home"/>
                    </div></ Link>
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



