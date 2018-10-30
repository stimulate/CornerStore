// ./src/common/main.component.jsx
import React, { Component } from 'react';

export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (<div className="container-fluid">
            <div className='row'>
                <div className='col-sm-12'>
                    <div className="main-nav"><nav>
                        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                            <div className="container">


                                <div className="collapse navbar-collapse" id="navbarResponsive">
                                    <ul className="nav nav-pills navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a className="nav-link"><i className="fa fa-home fa-fw"></i>Home<span className="sr-only">(current)</span></a>
                                        </li>

                                    </ul>

                                    <ul className="nav navbar-nav ml-auto">

                                        <span><li className="nav-link">Hi User <button >Logout</button></li> </span>

                                    </ul>

                                </div>
                            </div>
                        </div>
                    </nav>

                    </div>
                </div>
            </div>
            <div className='container-fluid' id="body-cover">
                <div className="row">
                    <div className="col-md-1 hidden-xs">
                    </div>
                    <div className="col-md-3 col-xs-4">
                        <div className="col">
                            <div className="card border-primary mb-4">
                                <img className="card-img-top" alt="Card image cap" src="https://semantic-ui.com/images/avatar/large/joe.jpg" />
                                <div className="card-body">
                                    <h4 className="card-title"><a>Mirani</a></h4>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Button</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 col-xs-8">
                        <div className="jumbotron col">
                            <h1>This is body </h1>
                         </div>
                        <div className="jumbotron col">
                            This is body
                         </div>
                        <div className="jumbotron col">
                            This is body
                         </div>
                    </div>
                    <div className="col-md-1 hidden-xs">

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column"><footer id="footer" >This is Footer</footer></div>
            </div>
        </div>);
    }
}