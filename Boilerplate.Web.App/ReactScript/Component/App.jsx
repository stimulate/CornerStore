// ./src/common/main.component.jsx
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import { Customer } from './Customer/Customer'
import imgsrc from '../../wwwroot/favicon.png'
import { CommentForm } from './Customer/CommentForm'

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
                            <img src={imgsrc} id="logo" className="ui icon left floated" />
                            </a>
                    <a className="active item">
                        <Link to="/">Home</Link>
                    </a>
                    <a className="item">
                        <Link to='/staff/index'>Staff</Link>
                    </a>
                    <a className="item">
                        <Link to="/cus">Role</Link> 
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
                    <Route path='/customer/create' component={CommentForm} />
                    </div>
                    </Router>
       
        <span></span>
            
            <div>
          <Customer url="comments" />
            </div>

            <footer className="ui footer purple"> <span>&emsp;&emsp;<i className="copyright outline icon"></i> 2019 - Sleek Store Inc. by Sabrina Yu. All rights reserved.&emsp;&emsp;</span><i className="phone icon"></i><i className="envelope outline icon"></i><i className="slack hash icon"></i><i className="rss icon"></i>
                <br/>
                <i className="map pin icon"></i><span> 111 New North Rd, Mt Albert, Auckland, 1024</span>&emsp;&emsp;<i className="github icon"></i><i className="facebook icon"></i><i className="twitter icon"></i>
            </footer>


        </div>
    )
  }
}
