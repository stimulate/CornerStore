// ./src/common/main.component.jsx
import React, { Component } from 'react';
import Home from './Home.jsx'
export default class App extends Component {
    constructor() {
        super();
        this.closeNav = this.closeNav.bind(this);
        this.openNav = this.openNav.bind(this);
    }
    /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
    openNav() {
        document.getElementById("mySidenav").className += " slidbar-in";
        document.getElementById("main").className += " marg-right";
    } 

    /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
    closeNav() {
        document.getElementById("mySidenav").className = "sidenav";
        document.getElementById("main").className = "";
    }

    render() {
        return (
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-sm-12'>
                        <div id="main">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12 col-sm-1">
                                        
                                        <Home />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column"><footer id="footer" >This is Footer</footer></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        );
    }
}
/*
 <div id="mySidenav" className="sidenav">
                            <span onClick={this.openNav}>open</span>
                            <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                            <a href="#">About</a>
                            <a href="#">Services</a>
                            <a href="#">Clients</a>
                            <a href="#">Contact</a>

                        </div>
 
 */