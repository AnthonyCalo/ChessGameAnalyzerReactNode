import React from 'react';
import "./HomePage.css";
import { WhitePlayerImg, BlackPlayerImg } from './PlayerImg';


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
            <>
            <div className="container_homepage">
                    <a href="fischer_reuben"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/fischer.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Robert Fischer vs Reuben Fine</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/ReubenFine.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href='fischer_spassky'><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/fischer2.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Robert Fischer vs Borris Spassky</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/Spassky.png" blackClass="black-home"/>
                    </div></ a>
                    <a href='kasparov_blue'><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/deepblue.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">IBM Deep Blue vs Garry Kasparov</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/kasparov.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="carlsen_giri"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/carlsen.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Magnus Carlsen vs Anish Giri</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/giri.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="carlsen_ivanchuk"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/carlsen2.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Magnus Carlsen vs Vassily Ivanchuk</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/ivanchuk.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="nakamura_bareev"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/bareev.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Evgeny Bareev vs Hikaru Nakamura</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/hikaru.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="anderssen_morphy"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/anderssen.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Adolf Anderssen vs Paul Morphy</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/morphy.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="kramnik_kasparov"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/kramnik.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Vladimir Kramnik vs Garry Kasparov</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/kasparov2.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="dubov_simon"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/williams.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Simon Williams vs Daniil Dubov</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/dubov.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="carlsen_duda"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/carlsen3.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Magnus Carlsen vs Jan Krzyztof Duda</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/duda.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="spassky_larsen"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/larsen.png" whiteClass='white-home'/>
                        <div className="LINKGAME">Bent Larsen vs Borris Spassky</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/spassky2.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="caruana_ponomariov"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/caruana.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Fabiano Caruana vs Ruslan Ponomariov</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/ruslan.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="ivanchuk_kasparov"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/kasparov3.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Vassily Ivanchuk vs Garry Kasparov</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/ivanchuk2.jpg" blackClass="black-home"/>
                    </div></ a>
                    <a href="aronian_dubov"><div className='gameListDiv'>
                        <WhitePlayerImg whitePlayer="/playerImgs/aronian.jpg" whiteClass='white-home'/>
                        <div className="LINKGAME">Levon Aronian vs Daniil Dubov</div>
                        <BlackPlayerImg blackPlayer="/playerImgs/dubov2.png" blackClass="black-home"/>
                    </div></ a>
                    
            </div>
            <div className="gitLogoDiv">
            <a href="https://github.com/AnthonyCalo/ChessGameAnalyzerReactNode" target="_blank" rel="noreferrer"><img src="/wallpaper/git_logo2.png" className="gitLogo" alt="gitLogo"></img></a>
            <label className="gitLabel"><a href="https://github.com/AnthonyCalo/ChessGameAnalyzerReactNode" target="_blank" rel="noreferrer">Source Code</a></label>
            </div>
            </>
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



