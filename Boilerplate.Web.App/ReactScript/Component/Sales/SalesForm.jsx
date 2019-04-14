import React, { Component } from 'react'


export class StoreForm extends Component {
    constructor(props) {
        super(props)
        this.state = {           
            customer: this.props.cus.state.formProps1,
            staff: this.props.cus.state.formProps2,
            store: this.props.cus.state.formProps3,
            date: this.props.cus.state.formProps4,
            product: this.props.cus.state.formProps5,
        };
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleStaffChange = this.handleStaffChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCustomerChange(e) {
        this.setState({ customer: e.target.value });
    };

    handleStaffChange(e) {
        this.setState({ staff: e.target.value });
    };

    handleStoreChange(e) {
        this.setState({ store: e.target.value });
    };

    handleDateChange(e) {
        this.setState({ date: e.target.value });
    };

    handleProductChange(e) {
        this.setState({ product: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();
        var customer = this.state.customer.trim();
        var staff = this.state.staff.trim();
        var product = this.state.product.trim();
        var date = this.state.date.trim();
        var store = this.state.store.trim();

        if (!customer || !staff || !store || !date || !product) {
            return;
        }
        this.props.submit({ customer: customer, staff: staff, product:product, date:date, store:store});
        this.setState({ customer: '', staff: '', product: '', date: '', store: '' });
        this.props.back();
    };

    render() {
        //var customerList = this.props.cus.state.data
        return (

            <form className="ui form" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="The Date of Sales"
                    value={this.state.date}
                    onChange={this.handleNameChange}
                />
                <input
                    type="text"
                    placeholder="The Store's Price"
                    value={this.state.price}
                    onChange={this.handlePriceChange}
                />
                <input
                    type="text"
                    placeholder="The Date of Sales"
                    value={this.state.date}
                    onChange={this.handleNameChange}
                />

                <input className="ui button primary" type="submit" value="Post" />
                <button className="violet ui button right floated" onClick={this.props.back}>Cancel</button>
            </form>


        );
    }
}
