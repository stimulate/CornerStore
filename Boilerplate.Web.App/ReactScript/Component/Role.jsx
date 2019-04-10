import React from 'react';
import url from 'url';

export class Role extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roleList: []
        };
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const xhr = new XMLHttpRequest();
        let url = '/Role/Index';
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            // this.setState({ data: data });
        };
        xhr.send();
       // var query = url.parse(this.props.location.search, true).query;
    }
    update(id) {
        //ajax call logic
    }

    delete(id) {
        //ajax call logic
    }

    render() {

        let roleList = this.state.roleList;

        let tableData = null;

        if (roleList != "") {
            tableData = roleList.map(service =>
                <tr key={service.id}>
                    <td className="two wide">{service.title}</td>
                    <td className="ten wide">{service.description}</td>
                    <td className="four wide">
                        <i className="outline write icon" onClick={this.update.bind(this, service.id)}></i>
                        <i className="remove icon" onClick={this.delete.bind(this, service.id)}></i>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Title</th>
                                <th className="ten wide">Description</th>
                                <th className="four wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
