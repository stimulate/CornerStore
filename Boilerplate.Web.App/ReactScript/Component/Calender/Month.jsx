import React from 'react';
import moment from 'moment';
import './calender.css';
//get font awesome

const weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
const weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const dateFormat = "DD-MM-YYYY";
export default class Month extends React.Component {
    constructor(props) {
        super(props);

        this.style = props.style || {};

        this.state = {
            dateContext: props.rendermonth,
            today: moment(),
            showMonthPopup: false,
            showYearPopup: false
        }
        this.year = this.year.bind(this);
        this.month = this.month.bind(this);
        this.daysInMonth = this.daysInMonth.bind(this);
        this.currentDate = this.currentDate.bind(this);
        this.currentDay = this.currentDay.bind(this);
        this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.getCurrentDateByDay = this.getCurrentDateByDay.bind(this);
        this.getClassName = this.getClassName.bind(this);

        this.onDayClick = this.onDayClick.bind(this);
    }
    componentDidMount() {
    }
    year() {
        return this.props.year;
    }
    month() {
        return this.props.rendermonth.format("MMMM");
    }
    daysInMonth() {
        return this.props.rendermonth.daysInMonth();
    }
    currentDate() {
        return this.state.today.get("date");
    }
    currentDay() {
        if (this.state.today.format("M") === this.props.rendermonth.format("M")) {
            return this.state.today.format("D");
        }
        else
            return 0;
    }

    firstDayOfMonth() {
        let dateContext = this.props.rendermonth;
        let firstDay = moment(dateContext).startOf('month').format('d');//day of week useful for space
        return firstDay;
    }

    getCurrentDateByDay(d) {
        return new Date("" + this.year() + "-" + this.month() + "-" + d + "");
    }

    getClassName(id) {

        const dateString = moment(new Date(id));
        let classStr = "day ";
        if (dateString.format(dateFormat) === this.state.today.format(dateFormat)) {
            classStr = classStr + "current-day ";
        }

        return classStr;
    }

    onDayClick(id) {
        this.props.dateClicked(id);
    }

    onMouseOver(id) {
        const idstr = `#${id}`;
        let ref = $(idstr).data("idRef");
        
        $('#' + id).tooltip("show");
    }


    render() {
        let weekdays = weekdaysShort.map((day) => {
            return (<td key={day} className="week-day">{day}</td>)
        });
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 23} className="emptySlot">{""}</td>);
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            //let tdClassName = (d == this.currentDay(d) ? "day current-day" : "day");
            const id = moment(this.getCurrentDateByDay(d)).format(dateFormat);
            let className = this.getClassName(id);


            daysInMonth.push(
                <td key={d}
                    id={id}
                    className={className}
                    onClick={() => this.onDayClick(id)}
                    data-toggle="tooltip"
                    data-placement="right"
                    data-html="true"
                    onMouseOver={() => this.onMouseOver(id)}
                >
                    {d}
                </td>
            )
            //this.applyStyle(id);
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((day, i) => {
            if ((i % 7) != 0) {
                cells.push(day);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(day);
            }
            if (i == totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });
        let trElems = rows.map((d, i) => {
            return (<tr key={i * 100}>
                {d}
            </tr>)
        });
        return (
            <div className="col col-padding">
                <div className="calendar-container" style={this.style}>
                    <table className="calendar">
                        <thead>
                            <tr>
                                <th colSpan={7} className="calendar-header">
                                    {this.month()}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {weekdays}
                            </tr>
                            {trElems}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}
