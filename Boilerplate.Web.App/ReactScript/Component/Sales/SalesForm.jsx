import React, { Component } from 'react'
import { Dropdown, Label,Header } from 'semantic-ui-react'
import { setTimeout } from 'timers';

export class SalesForm extends Component {
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
        setTimeout(() => { this.setState({ customer: this.refs.o_cus.state.value }); }, 0);
    };

    handleStaffChange(e) {
        setTimeout(() => { this.setState({ staff: this.refs.o_staff.state.value }); }, 0);        
    }
    handleStoreChange(e) {
        setTimeout(() => { this.setState({ store: this.refs.o_store.state.value }); }, 0);
    };

    handleDateChange(e) {
        this.setState({ date: e.target.value });
    };

    handleProductChange(e) {
        setTimeout(() => { this.setState({ product: this.refs.o_pro.state.value }); }, 0);        
    };

    handleSubmit(e) {
        e.preventDefault();
        var customer = this.state.customer;
        var staff = this.state.staff;
        var product = this.state.product;
        var date = (this.state.date).trim();
        var store = this.state.store;
        //console.log(staff);
        if (!customer || !staff || !store || !date || !product) {            
            return;
        }
        this.props.submit({ customer: customer, staff: staff, product:product, date:date, store:store});
        this.setState({ customer: '', staff: '', product: '', date: '', store: '' });
        this.props.back();
    };

    render() {
        var ls = this.props.cus.state.list;
        var opt1 = []; var opt2 = []; var opt3 = []; var opt4 = [];
        for(var i in ls[0]) {
            opt1.push({ key: i, text: ls[0][i], value: i });
        }

        for (var i in ls[1]) {
            opt2.push({ key: i, text: ls[1][i], value: i });
        }

        for (var i in ls[2]) {
            opt3.push({ key: i, text: ls[2][i], value: i });
        }
        for (var i in ls[3]) {
            opt4.push({ key: i, text: ls[3][i], value: i });
        }               
        
        return (
            
            <form className="ui form" onSubmit={this.handleSubmit}>
                <Header as='h2' disabled color='teal'>
                    Please Select Item or Search by input the Item's Name
                </Header>
                <div>
                <Label color='purple' ribbon>
                    Product
                </Label>
                <Dropdown 
                    placeholder={this.state.product}
                    ref="o_pro"
                    onChange={this.handleProductChange}
                    fluid
                    search
                    selection
                    options={opt3}
                    />
                </div>  
                <div>
                 <Label as='a' color='violet' ribbon>
                        Store
                 </Label>
                <Dropdown
                        placeholder={this.state.store}
                    ref="o_store"
                    onChange={this.handleStoreChange}
                    fluid
                    search
                    selection
                    options={opt2}
                    />
                </div>
                <div>
                    <Label as='a' color='pink' ribbon>
                        Customer
                 </Label>
                <Dropdown
                        placeholder={this.state.customer}
                    ref="o_cus"
                    onChange={this.handleCustomerChange}
                    fluid
                    search
                    selection
                    options={opt4}
                    />
                </div>
                <div>
                 <Label as='a' color='yellow' ribbon>
                        Staff
                 </Label>
                <Dropdown
                        placeholder={this.state.staff}
                    ref="o_staff"
                    onChange={this.handleStaffChange}
                    fluid
                    search
                    selection
                    options={opt1}
                />
                </div>
                <div>
                    <Label as='a' color='orange' ribbon>
                        Date
                 </Label>
                <input
                    type="text"
                    placeholder="The Date of Sales"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                    />
                 </div>
                <input className="ui button primary" type="submit" value="Post" />
                <button className="violet ui button right floated" onClick={this.props.back}>Cancel</button>
            </form>


        );
    }
}
