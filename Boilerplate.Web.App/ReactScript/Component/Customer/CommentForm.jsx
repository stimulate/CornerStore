﻿import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: this.props.cus.state.formProps1,
            phone: this.props.cus.state.formProps2,
            name: this.props.cus.state.formProps3,
        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    
    handleAddressChange(e) {
        this.setState({ address: e.target.value });
    };

    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    };

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();
        var address = this.state.address.trim();
        var phone = this.state.phone.trim();
        var name = this.state.name.trim();
     
        if (!address || !name || !phone) {
            return;
        }
        this.props.submit({ address: address, phone: phone, name: name, });
        this.setState({ address: '', phone: '', name: '', });
        this.props.back();
    };

    render() {
        return (
        
          <form className="ui form" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <input
                    type="text"
                    placeholder="Your address"
                    value={this.state.address}
                    onChange={this.handleAddressChange}
                />
                <input
                    type="text"
                    placeholder="Your phone number"
                    value={this.state.phone}
                    onChange={this.handlePhoneChange}
                />
                
                <input className="ui button primary" type="submit" value="Post" />
                <button className="violet ui button right floated" onClick={this.props.back}>Cancel</button>
            </form>
                
           
        );
    }
}
