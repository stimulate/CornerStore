import React, { Component } from 'react';

const eventsArr = {
    "anniversary": { label: "Anniversary", yearly: true, notes: "" },
    "birthday": { label: "Birthday", yearly: true, notes: "" },
    "busy": { label: "Busy", startDate: "", endDate: "", notes: "" },
    "holiday": { label: "Holiday", startDate: "", endDate: "", notes: "" }
};
export const eventNamesArray = ["anniversary", "birthday", "busy", "holiday"];

export default class CalenderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myEventList: []
        }

        this.handleChange = this.handleChange.bind(this);//change the updated state
        this.handleSubmit = this.handleSubmit.bind(this);//When Form is submited  
        this.updateChild = this.updateChild.bind(this);//reads string change on call func
        this.closeModal = this.closeModal.bind(this);//close modal 
    }

    updateChild(myArr) {
        this.setState({ myEventList: myArr });
    }

    handleChange(event) {
        //let name = event.target.name;
        let value = event.target.value;
        let type = event.target.type;
        let { myEventList } = this.state;
        if (type === "checkbox") {
            if (myEventList.includes(value)) {
                myEventList.splice(myEventList.indexOf(value), 1);
            }
            else
                myEventList.push(value);

            if (myEventList == undefined) {
                myEventList = [];
            }
        }

        this.setState({ myEventList });
    }
    handleSubmit() {
        let { myEventList } = this.state;

        this.props.updateProps(myEventList);
        $('#calender-modal').modal('hide');
        this.setState({ myEventList: [] });
    }

    closeModal() {
        $('#calender-modal').modal('hide');
        this.setState({ myEventList: [] });
    }
    render() {
        var { myEventList } = this.state;
        if (myEventList == undefined)
            myEventList = [];
        //let dateString = selectedDate != undefined ? selectedDate.format("YYYY-MM-DD") : "";

        var eventsCheckboxRender = eventNamesArray.map((x, i) => {
            return (<div key={i}>

                <input
                    type="checkbox"
                    id="product"
                    value={x}
                    name="eventType"
                    onChange={(e) => { this.handleChange(e) }}
                    checked={(myEventList.includes(x) ? true : false)} />
                {eventsArr[x].label}
            </div>
            );
        });

        return (<div className="modal fade" id="calender-modal" tabIndex="-1" role="dialog" aria-labelledby="loginModel" aria-hidden="true" >
            <div className="modal-dialog show" role="document">
                <div className="container-fluid">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            {eventsCheckboxRender}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        );
    }
}