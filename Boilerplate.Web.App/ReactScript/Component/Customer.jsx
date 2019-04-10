import React, { Component } from 'react'
import { CommentList } from './CommentList'
import { CommentForm } from './CommentForm'
import { Icon, Pagination } from 'semantic-ui-react'
import { BrowserRouter as  Link } from 'react-router-dom'
import xmr from '../service'

export class Customer extends Component {
    constructor(props) {
        super(props)
        //this.state = { data: this.props.initialData };
        this.state = {
            data: [],
            showform: false
        }
        this.loadFromServer = this.loadFromServer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }      
   async loadFromServer(){     
        
        //var url = this.props.url;     
        //axios.get('/customers')
        //    .then((response) =>{
                
        //        this.setState({ data: response.data })
        //        console.log(this.state.data)
        //    })
        //    .catch(function (error) {
        //        console.log(error);
        //    });
       const res = await xmr.get('/customer')
       console.log(res)
       this.setState({data: res.data})        
    };

    handleSubmit(customer){
        var customers = this.state.data;
        
        var newCustomer = customers.concat([customer]);
        this.setState.data = newCustomer

        var data = new FormData();
        data.append('name', customer.name);
        data.append('phone', customer.phone);
        data.append('address', customer.address);
        
        //const res = await xmr.post('/customer/new', data);
        //console.log(res)
        var xhr = new XMLHttpRequest();
        xhr.open('post', "customer/new", true);
        xhr.onload = function () {
            this.loadFromServer;
        };
        xhr.send(data);
    };

    componentDidMount() {
        //const timer = window.setInterval(this.loadFromServer, 2000);
        this.loadFromServer();
        
    }
    componentWillUnmount() {
       //window.clearInterval(timer);        
    }
    show = () => {
        this.setState({ showform: true });
    }

    goback = () => {
        this.setState({ showform: false });
        this.loadFromServer();
    }
    
    render() {
        if (this.state.showform) {
            return (<CommentForm submit={this.handleSubmit} back={this.goback} />);
        }
        console.log(this.state.data)
        return (
            <div className="customer">
                <h1>Customers</h1>
                
                <Link to="/customer/create"> <button onClick={this.show} className="ui item button purple">Create</button> </Link>

                <CommentList data={this.state.data} load={this.loadFromServer} />  
                <br/>
                <Pagination className="fluid" color='blue'
                    defaultActivePage={1}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={10}
                />
            </div>
            
        );
    }
}


