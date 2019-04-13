import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'


export class StoreList extends Component {
    constructor(props) {
        super(props)
    }

    handleSearchChange = (e) => {
        this.props.cus.setState({
            searchString: e.target.value,
        })
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
        this.props.cus.setState({
            data: this.props.cus.state.data.filter(cus => cus.name.includes(this.props.cus.state.searchString)),
        });
        this.props.cus.setState({
            searchString: '',
        })
        console.log(this.props.cus.state.data);
    }

    render() {

        const cusNodes = this.props.cus.state.data.map(

            (d) => (

                <Table.Row key={d.id}>
                    <Table.Cell >{d.id}</Table.Cell>
                    <Table.Cell >{d.name}</Table.Cell>
                    <Table.Cell >{d.price}</Table.Cell>
                    <Table.Cell>
                        <Button floated='right' primary onClick={(e) => this.props.cus.edit(d, e)} >Edit</Button>
                        <Button floated='right' color='pink' onClick={this.props.cus.delConfirm}>Delete</Button>
                        <Confirm content={'Are you sure to delete?'} open={this.props.cus.state.delCheck} onCancel={this.props.cus.goback} onConfirm={(e) => this.props.cus.del(d.id, e)} />

                    </Table.Cell>
                </Table.Row>
            )
        )

        return (

            <div className="storeList">
                <div className="ui input menu floated right">
                    <input type="text" placeholder="Search by Name" onChange={this.handleSearchChange} />
                    <i className="search large icon purple" onClick={this.handleSearchSubmit} ></i>

                    <button className="ui button blue" onClick={this.props.cus.loadFromServer} >Back to the full list</button>
                </div>


                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {cusNodes}
                    </Table.Body>
                </Table>
            </div>

        )
    }
}

