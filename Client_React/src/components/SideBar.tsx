import React from "react";
import "./sidebar.css";
import {Link} from 'react-router-dom';



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
        <nav className="navbar-min" id="sidebar">
            <button className="nav-toggle" id="toggler">
                <i className='fa fa-bars'> Games</i>
            </button>
            <div className="navbar-minimized" id="sidebar-text">
            <ul>
            <Link to="/fischer_reuben"><li>Bobby Fischer vs Daniel Reuben</li></Link>
            <Link to="/fischer_spassky"><li>Fischer vs Spassky</li></Link>
            <Link to="/kasparov_blue"><li>Garry Kasparov vs. IBM deep blue</li></Link>
            <Link to="/carlsen_giri"><li>Magnus Carlsen vs Anish Giri</li></Link>
            <Link to="/carlsen_ivanchuk"><li>Magnus Carlsen vs Vassily Ivanchuk</li></Link>
            <Link to="/nakamura_bareev"><li>Evgeny Bareev vs Hikaru Nakamura</li></Link>
            </ul>
            </div>

        </nav>
        )
    }
}


