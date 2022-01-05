import React from "react";
import "./sidebar.css";
import {Link} from "react-router-dom";



export default class Sidebar extends React.Component {

    componentDidMount(){
        let sidebar = document.getElementById("sidebar");
        let sidebartext = document.getElementById("sidebar-text");
        var navtoggle= document.getElementById("toggler");
        navtoggle?.addEventListener("click", function(){
        //.toggle an option too
        if(sidebar?.classList.contains('side-expand')){
            navtoggle?.classList.remove("nav-toggleMax");
            sidebar?.classList.remove('side-expand');
            sidebartext?.classList.remove('textVisible');
        }
        else{
            console.log("Here should be adding class");
            navtoggle?.classList.add("nav-toggleMax");
            sidebar?.classList.add('side-expand');
            sidebartext?.classList.add('textVisible');

        }
    })

    }
    
    render(){
        return(
        <>
        <div className="homebutton">
            <Link to="/">
                <img className="homeImg" alt="home-button" src="/wallpaper/home_icon.png"></img>
            </Link>
        </div>
        <nav className="navbar-min" id="sidebar">
            <button className="nav-toggle" id="toggler">
                <i className='fa fa-bars'> Games</i>
            </button>
            <div className="navbar-minimized" id="sidebar-text">
            <ul>
            <a href="/fischer_reuben"><li>Bobby Fischer vs Daniel Reuben</li></a>
            <a href="/fischer_spassky"><li>Fischer vs Spassky</li></a>
            <a href="/kasparov_blue"><li>Garry Kasparov vs. IBM deep blue</li></a>
            <a href="/carlsen_giri"><li>Magnus Carlsen vs Anish Giri</li></a>
            <a href="/carlsen_ivanchuk"><li>Magnus Carlsen vs Vassily Ivanchuk</li></a>
            <a href="/nakamura_bareev"><li>Evgeny Bareev vs Hikaru Nakamura</li></a>
            <a href="/anderssen_morphy"><li>Adolf Anderssen vs Paul Morphy</li></a>
            <a href="/kramnik_kasparov"><li>Vladimir Kramnik vs Garry Kasparov</li></a>
            <a href="/dubov_simon"><li>Simon Williams vs Daniil Dubov</li></a>
            <a href="/carlsen_duda"><li>Magnus Carlsen vs Jan Krzysztof Duda</li></a>
            <a href="/spassky_larsen"><li>Bent Larsen vs Borris Spassky</li></a>
            <a href="/caruana_ponomariov"><li>Fabiano Caruana vs Ruslan Ponomariov</li></a>
            <a href="/ivanchuk_kasparov"><li>Garry Kasparov vs Vassily Ivanchuk</li></a>
            <a href="/aronian_dubov"><li>Levon Aronian vs Daniil Dubov</li></a>

            
            </ul>
            </div>

        </nav>
        </>
        )
    }
}


