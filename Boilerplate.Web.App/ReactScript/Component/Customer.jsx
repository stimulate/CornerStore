import React, { Component } from 'react';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const list = this.props.customerData.map(c => {
            
        })
        return (
            <div class="col-lg-4">
                <h1>{c.Name}</h1>
                
            </div>        
        );
    }
}

export default Customer;