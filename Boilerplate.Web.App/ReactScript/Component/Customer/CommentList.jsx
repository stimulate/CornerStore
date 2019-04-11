import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import xmr from '../../service'


export class CommentList extends Component {
    constructor(props) {
        super(props)
    }

    render() {   
        
      const cusNodes = this.props.data.map(

          d => (

              <Table.Row key={d.id}>
              <Table.Cell >{d.id}</Table.Cell>
              <Table.Cell >{d.name}</Table.Cell>
            <Table.Cell >{d.address}</Table.Cell>
            <Table.Cell >{d.phone}</Table.Cell>
              <Table.Cell>
                      <Button floated='right' primary onClick={(e) => this.props.edit(d, e)} >Edit</Button>
                      <Button floated='right' color='pink' onClick={(e) => this.props.del(d.id, e)}>Delete</Button>
                      
            </Table.Cell>
          </Table.Row>
     
      ),
      )        

    console.log(cusNodes)
    console.log(this.props.data)
        return (
            
        <div className="commentList">
                <div className="ui input menu floated right">
                    <input type="text" placeholder="Search" />
                    <i className="search link icon aligned"></i>
                </div>
               
                
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
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

