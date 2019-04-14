import React, { Component } from 'react'
import { StoreList } from './StoreList'
import { StoreForm } from './StoreForm'
import { Pagination, Icon } from 'semantic-ui-react'
import xmr from '../../service'


export class Store extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            showform: false,
            editform: false,
            formProps1: '',
            formProps2: '',
            editId: '',
            searchString: '',
            totalPage: 1,
            delCheck: false,
            medium: []
        }

        this.loadFromServer = this.loadFromServer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //update & read data
    async loadFromServer() {
        
        const res = await xmr.get('/store')
        await this.setState({
            data: res.data,
            medium: res.data
        }, () => {
            this.setState({
                totalPage: Math.ceil(this.state.data.length / 5) || 1
            }, () => { this.page(); })
        });
    };

    handleSubmit(store) {

        var data = new FormData();
        data.append('Name', store.name);
        data.append('Address', store.address);

        var xhr = new XMLHttpRequest();

        if (!this.state.editform) {
            var stores = this.state.data; //old data
            var newStore = stores.concat([store]); //old data + new obj
           // this.setState.data = newStore
            this.setState({ data: newStore }); //update old data
            xhr.open('post', "/store/new", true);
            xhr.onload = function () {
                //console.log(data);
                this.loadFromServer;
            };
            xhr.send(data);

        }
        else {
            var d = parseInt(this.state.editId);
            data.append('id', d)
            xhr.open('post', "/store/adjust/" + d, true);
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
        console.log(this.state.totalPage)
    }

    show = () => {
        this.setState({ showform: true });
    }

    goback = () => {
        this.setState({ showform: false });
        this.setState({
            formProps1: '',
            formProps2: '',
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
        xhr.open('delete', "/store/delete/" + d, true);
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
            formProps2: cus.address,
            formProps1: cus.name,
            editform: true,
            editId: cus.id,
        })
    }

    page = () => {
        setTimeout(() => {
            var cur = this.refs.pn.state.activePage;
            var arr = this.state.medium;
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
            return (<StoreForm submit={this.handleSubmit} back={this.goback} cus={this} />);
        }

        return (
            <div className="store">
                <h1>Stores</h1>

                <button onClick={this.show} className="ui item button purple">Create</button>

                <StoreList cus={this} />
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
                    nextItem={{ content: <Icon name='angle right'/>, icon: true }}
                    totalPages={this.state.totalPage}
                />
            </div>

        )
    }
}


