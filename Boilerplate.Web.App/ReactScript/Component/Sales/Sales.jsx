import React, { Component } from 'react'
import { SalesList } from './SalesList'
import { SalesForm } from './SalesForm'
import { Pagination, Icon } from 'semantic-ui-react'
import xmr from '../../service'


export class Sales extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            showform: false,
            editform: false,
            formProps1: '',
            formProps2: '',
            formProps3: '',
            formProps4: '',
            formProps5: '',
            editId: '',
            searchString: '',
            totalPage: 1,
            delCheck: false,
            store: [],
            list:[],
        }

        this.loadFromServer = this.loadFromServer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //update & read data
    async loadFromServer() {

        //var url = this.props.url;     
        //axios.get('/saless')
        //    .then((response) =>{

        //        this.setState({ data: response.data })
        //        console.log(this.state.data)
        //    })
        //    .catch(function (error) {
        //        console.log(error);
        //    });
        const res = await xmr.get('/sales');
        const res2 = await xmr.get('/sales/data');   
        
        await this.setState({
            data: res.data,
            store: res.data,
            list: res2.data
        }, () => {
            this.setState({
                totalPage: Math.ceil(this.state.data.length / 5) || 1
            }, () => {
                this.page();                               
            })
            }); 
//        console.log();
    };

    handleSubmit(sales) {

        var data = new FormData();
        data.append('Date', sales.date);
        data.append('ProductID', sales.product);
        data.append('CustomerID', sales.customer);
        data.append('StaffID', sales.staff);
        data.append('StoreID', sales.store);

        var xhr = new XMLHttpRequest();

        if (!this.state.editform) {
            var saless = this.state.data; //old data
            var newSales = saless.concat([sales]); //old data + new obj
            this.setState.data = newSales
            this.setState({ data: newSales }); //update old data
            xhr.open('post', "/sales/new", true);
            xhr.onload = function () {
                //console.log(data);
                this.loadFromServer;
            };
            xhr.send(data);

        }
        else {
            var d = parseInt(this.state.editId);
            data.append('id', d)
            xhr.open('post', "/sales/adjust/" + d, true);
            xhr.onload = function () {
                this.setState({
                    data: this.state.data.filter(cus => cus.id != d).concat([data]),
                })
                this.loadFromServer;
            }
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
            formProps4: '',
            formProps5: '',
            delCheck: false
        })
        this.loadFromServer()
    }

    delConfirm = () => {
        this.setState({
            delCheck: true,
        })
    }

    del = (d) => {
        var xhr = new XMLHttpRequest()
        var data = parseInt(d);
        xhr.open('delete', "/sales/delete/" + d, true);
        xhr.onload = () => {
            this.setState({
                data: this.state.data.filter(cus => cus.id != d)
            })
            this.loadFromServer
        };
        xhr.send(data)
    }

    edit = (cus) => {

        this.setState({
            showform: true,
            formProps2: cus.staff,
            formProps1: cus.customer,
            formProps3: cus.store,
            formProps4: cus.date,
            formProps5: cus.product,
            editform: true,
            editId: cus.id,
        })       
    }

    page = () => {
        setTimeout(() => {
            var cur = this.refs.pn.state.activePage;
            var arr = this.state.store;
            if (arr.length > 5) {
                var arr_filter = (cur == 1) ? arr.filter(c => arr.indexOf(c) < 5) : arr.filter(c => arr.indexOf(c) > (cur - 1) * 5 - 1 && arr.indexOf(c) < cur * 5)
                this.setState({
                    data: arr_filter,
                })
            }
            console.log(cur)
        }, 0)
    }

    render() {

        if (this.state.showform) {
            return (<SalesForm submit={this.handleSubmit} back={this.goback} cus={this} />);
        }

        return (
            <div className="sales">
                <h1>Sales</h1>

                <button onClick={this.show} className="ui item button purple">Create</button>

                <SalesList cus={this} />
                <br />
                <Pagination
                    className="fluid"
                    color="blue"
                    ref="pn"
                    onClick={(e) => this.page(e)}
                    defaultActivePage={1}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={this.state.totalPage}
                />
            </div>

        )
    }
}


