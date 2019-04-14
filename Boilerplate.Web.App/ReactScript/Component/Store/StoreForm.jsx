import React, { Component } from 'react'

export class StoreForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: this.props.cus.state.formProps2,
            name: this.props.cus.state.formProps1,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAddressChange(e) {
        this.setState({ address: e.target.value });
    };

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();
        var address = this.state.address.trim();
        var name = this.state.name.trim();

        if (!name || !address) {
            return;
        }
        this.props.submit({ address: address, name: name, });
        this.setState({ address: '', name: '', });
        this.props.back();
    };

    render() {
        return (

            <form className="ui form" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="The Store's Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <input
                    type="text"
                    placeholder="The Store's Address"
                    value={this.state.address}
                    onChange={this.handleAddressChange}
                />

                <input className="ui button primary" type="submit" value="Post" />
                <button className="violet ui button right floated" onClick={this.props.back}>Cancel</button>
            </form>


        );
    }
}
