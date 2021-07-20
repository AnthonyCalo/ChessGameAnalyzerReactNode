import React from "react";
import "./sidebar.css";



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
            <a href="/fischer_reuben"><li>Bobby Fischer vs Daniel Reuben</li></a>
            <a href="/fischer_spassky"><li>Fischer vs Spassky</li></a>
            <a href="/kasparov_blue"><li>Garry Kasparov vs. IBM deep blue</li></a>
            <a href="/about"><li>about</li></a>
            </ul>
            </div>

        </nav>
        )
    }
}


