import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class StoreForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: this.props.cus.state.formProps2,
            name: this.props.cus.state.formProps1,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePriceChange(e) {
        this.setState({ phone: e.target.value });
    };

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();
        var price = this.state.price.trim();
        var name = this.state.name.trim();

        if (!name || !price) {
            return;
        }
        this.props.submit({ price: price, name: name, });
        this.setState({ price: '', name: '', });
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
                    placeholder="The Store's Price"
                    value={this.state.price}
                    onChange={this.handlePriceChange}
                />

                <input className="ui button primary" type="submit" value="Post" />
                <button className="violet ui button right floated" onClick={this.props.back}>Cancel</button>
            </form>


        );
    }
}
