import React, { Component } from 'react'
import { ProductList } from './ProductList'
import { ProductForm } from './ProductForm'
import { Icon, Pagination } from 'semantic-ui-react'
import { BrowserRouter as  Link } from 'react-router-dom'
import xmr from '../service'


export class Product extends Component {
    constructor(props) {
        super(props)
        //this.state = { data: this.props.initialData };
        this.state = {
            data: [],
            showform: false,
            editform: false,
            formProps1: '',
            formProps2: '',
            formProps3: '',
            editId:'',
        }
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.loadFromServer = this.loadFromServer.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }      
   
    handleSubmit(product) {

        var data = new FormData();
        
        data.append('name', product.name);
        data.append('phone', product.phone);
        data.append('address', product.address);
        var xhr = new XMLHttpRequest();
        //const res = await xmr.post('/product/new', data);
        //console.log(res)
        if (!this.state.editform) {
            var products = this.state.data //old data
            var newproduct = products.concat([product]) //old data + new obj
            this.setState.data = newproduct 
            this.setState({ data: newproduct }) //update old data
            xhr.open('post', "product/new", true)
            xhr.onload = function () {
                this.loadFromServer
            };
            xhr.send(data)
        }
        else {      
            var d = parseInt(this.state.editId)
            data.append('id', d)
            xhr.open('post', "product/adjust/" + d, true)
            xhr.onload = function () {
                this.loadFromServer
            };
            xhr.send(data)
        }
    }

     handleEditSubmit(product) {
        var d = parseInt(this.state.editId)
        var ndata = new FormData()
        ndata.append('id', d)
        ndata.append('name', product.name)
        ndata.append('phone', product.phone)
        ndata.append('address', product.address)

        //var xhr = new XMLHttpRequest();
        //xhr.open('put', "product/edit", true);
        //xhr.onload = function () {
        //    this.loadFromServer;
        //};
        //var data = {d,ndata}
        // xhr.send(ndata);  
    }

    componentDidMount() {
        //const timer = window.setInterval(this.loadFromServer, 2000);
        this.loadFromServer();        
    }
    //componentWillUnmount() {
    //   //window.clearInterval(timer);        
    //}
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
        //event.preventDefault();
        var xhr = new XMLHttpRequest();
        var data = parseInt(d);
        xhr.open('delete', "product/delete/" + d, true);
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

    async loadFromServer() {

        //var url = this.props.url;     
        //axios.get('/products')
        //    .then((response) =>{

        //        this.setState({ data: response.data })
        //        console.log(this.state.data)
        //    })
        //    .catch(function (error) {
        //        console.log(error);
        //    });
        const res = await xmr.get('/product')
        // console.log(res)
        this.setState({ data: res.data })
    };
       
    render() {
        if (this.state.showform) {
            return (<ProductForm submit={this.handleSubmit} back={this.goback} cus={this} />);
        }
        return (
            <div className="product">
                <h1>products</h1>
                
                <Link to="/product/create"> <button onClick={this.show} className="ui item button purple">Create</button> </Link>

                <ProductList data={this.state.data} del={this.del} edit={this.edit} />  
                <br />

                <Pagination
                    className="fluid"
                    color="blue"
                    defaultActivePage={1}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={10}
                />
            </div>            
        )
    }
}
