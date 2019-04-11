import React, { Component } from 'react'
import { CommentList } from './CommentList'
import { CommentForm } from './CommentForm'
import { Icon, Pagination } from 'semantic-ui-react'
import { BrowserRouter as  Link } from 'react-router-dom'
import xmr from '../../service'


export class Customer extends Component {
    constructor(props) {
        super(props)       
        this.state = {
            data: [],
            showform: false,
            editform: false,
            formProps1: '',
            formProps2: '',
            formProps3: '',
            editId:'',
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
       this.setState({data: res.data})        
    };

    handleSubmit(customer){
       
        var data = new FormData();
        
        data.append('name', customer.name);
        data.append('phone', customer.phone);
        data.append('address', customer.address);
        var xhr = new XMLHttpRequest();
     
        if (!this.state.editform) {
            var customers = this.state.data; //old data
            var newCustomer = customers.concat([customer]); //old data + new obj
            this.setState.data = newCustomer 
            this.setState({ data: newCustomer }); //update old data
            xhr.open('post', "customer/new", true);
            xhr.onload = function () {
                this.loadFromServer;
            };
            xhr.send(data);
        }
        else {      
            var d = parseInt(this.state.editId);
            data.append('id', d)
            xhr.open('post', "/customer/adjust/" + d, true);
            xhr.onload = function () {
                this.setState({
                    data: this.state.data.filter(cus => cus.id != d).concat([data]),
                });
                this.loadFromServer;
            };
            xhr.send(data);        
        }        
    };

    componentDidMount() {      
        this.loadFromServer();        
    }

    show = () => {
        this.setState({ showform: true });
    }

    goback = () => {
        this.setState({ showform: false });
        this.setState({
            formProps1: '',
            formProps2: '',
            formProps3: '',
        });
        this.loadFromServer()
    }

    del = (d) => {       
        var xhr = new XMLHttpRequest();
        var data = parseInt(d);
        xhr.open('delete', "customer/delete/" + d, true);
        xhr.onload = () => {
            this.setState({
                data: this.state.data.filter(cus => cus.id != d)
            });
            this.loadFromServer;
        };        
        xhr.send(data);
    } 

    edit = (cus) => {
             
        this.setState({
            showform: true,
            formProps1: cus.address,
            formProps2: cus.phone,
            formProps3: cus.name,
            editform: true,
            editId: cus.id,
        });
        
    }
       
    render() {
        if (this.state.showform) {
            return (<CommentForm submit={this.handleSubmit} back={this.goback} cus={this} />);
        }
      
        return (
            <div className="customer">
                <h1>Customers</h1>
                
                <Link to="/customer/create"> <button onClick={this.show} className="ui item button purple">Create</button> </Link>

                <CommentList data={this.state.data} del={this.del} edit={this.edit} />  
                <br/>
                <Pagination className="fluid" color='blue'
                    defaultActivePage={1}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={1}
                />
            </div>
            
        );
    }
}


