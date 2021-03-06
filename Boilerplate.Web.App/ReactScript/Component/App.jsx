// ./src/common/main.component.jsx
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import { Customer } from './Customer/Customer'
import imgsrc from '../../wwwroot/favicon.png'
import { Store } from './Store/Store'
import { Product } from './Product/Product'
import {Sales} from './Sales/Sales'


export default class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
        <div className="ui container">  
            <Router>
                
                <div className="ui inverted segment wide" >
                    <div className="ui inverted secondary pointing menu">
                        <a className="item">
                            <img src={imgsrc} id="logo" className="ui icon left floated" alt='' />
                            </a>
                    <a className="active item">
                        <Link to="/">Home</Link>
                    </a>
                    <a className="item">
                            <Link to='/product'>Product</Link>
                    </a>
                    <a className="item">
                            <Link to='/store'>Store</Link>
                    </a>
                    <a className="item">
                    <Link to='/sales'>Sales</Link>
                    </a>
                    <a className="item">
                        <Link to='/customer'>Customer</Link>
                    </a>
                        
                        <div className="right menu">
                            
                    <div className="item">
                        <span className="ui text">Hi User</span>
                    </div>
                    <div className="item">
                        <div className="ui primary button">Sign Up</div>
                    </div>
                        </div>
                    </div>
            </div>
                    <div>                    
                    <Route exact path="/" component={Home} />
                    <Route path='/product' component={Product} />
                    <Route path='/store' component={Store} />
                    <Route path='/sales' component={Sales} />
                    <Route path='/customer' component={Customer} />
                    </div>
                    </Router>
       
        <span></span>
            
            <div>
                
            </div>

            <footer className="ui footer purple"> <span>&emsp;&emsp;<i className="copyright outline icon"></i>
                2019 - Sleek Store Inc. by Sabrina Yu. All rights reserved.&emsp;&emsp;</span><i className="phone icon"></i>
                <i className="envelope outline icon"></i><i className="slack hash icon"></i><i className="rss icon"></i>
                <br/>
                <i className="map pin icon"></i><span> 111 New North Rd, Mt Albert, Auckland, 1024</span>&emsp;&emsp;
                <i className="github icon"></i><i className="facebook icon"></i><i className="twitter icon"></i>
            </footer>


        </div>
    )
  }
}
