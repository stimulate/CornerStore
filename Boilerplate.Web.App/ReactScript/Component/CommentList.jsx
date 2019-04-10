import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import xmr from '../service'


export class CommentList extends Component {
    constructor(props) {
        super(props)

    }

    edit = (id) => {

    }

    del = async ({ id, name, address, phone }) => {  
        var xhr = new XMLHttpRequest();
        var data = { id, name, address, phone };
        xhr.open('post', "customer/delete/", true);
        xhr.onload = () =>{
            this.props.load;
        };
        xhr.send(data);      
        
    }

    render() {   
        
      const commentNodes = this.props.data.map(

          d => (

              <Table.Row key={d.id}>
              <Table.Cell >{d.id}</Table.Cell>
              <Table.Cell >{d.name}</Table.Cell>
            <Table.Cell >{d.address}</Table.Cell>
            <Table.Cell >{d.phone}</Table.Cell>
              <Table.Cell>
                      <Button floated='right' primary onClick={this.edit}>Edit</Button>
                      <Button floated='right' color='pink' onClick={(e) => this.del(d, e)}>Delete</Button>
                      
            </Table.Cell>
          </Table.Row>
     
      ),
      )        

    console.log(commentNodes)
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
                    {commentNodes}
                </Table.Body>
        </Table>
                </div>
                
    )
  }
}

