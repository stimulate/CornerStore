import React, { Component } from 'react';
import Month from './Calender/Month.jsx';
import moment from 'moment';
import CalenderModal from './Calender/CalenderModal';

const dateFormat = "DD-MM-YYYY";

const style = {
    position: "relative",
    width: "250px"
}

const month = moment.months();
const currentYear = moment().year();

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: currentYear,
            selectedDate: "",//array for multiple selection
            myEventList: [],
            yearlyList: [],
            updatedEventListForThisYear: ""//trackchanges in yearly list
        };
        this.modalChild = React.createRef();//refresh child meathods for modal to read current state change
        this.monthChild = React.createRef();//reload 

        this.onYearClick = this.onYearClick.bind(this);//year changed
        this.onDateClicked = this.onDateClicked.bind(this);//date selected=popup modal


        this.handleEventUpdate = this.handleEventUpdate.bind(this);//comes from calendar modal
        this.applyStyle = this.applyStyle.bind(this); //apply css style on calander can also update style for only onle id
        this.makeList = this.makeList.bind(this);//helper meathod for creating style
        this.clearCss = this.clearCss.bind(this);//remove all css on full page referesh ideal call while year change
    }
    componentDidMount() {
        this.clearCss();
        this.applyStyle(null);
    }

    onYearClick(year) {
        this.setState({ year }, () => { $("td").removeData("currentArray"); this.applyStyle(null) })
    }

    clearCss() {
        $("td").removeAttr("style");
    }

    applyStyle(id) {
        const { myEventList } = this.state;
        const { year, updatedEventListForThisYear } = this.state;
        let areWeUpdatingListForThisYear = false;
        if (id === null) {
            this.clearCss();
            if (myEventList != undefined) {
                Object.keys(myEventList).forEach(x => {
                    if (year != updatedEventListForThisYear) {
                        $("td").removeData("currentArray");
                        this.makeList(x, year, true);
                        areWeUpdatingListForThisYear = true;
                    }
                    else
                        this.makeList(x, year, false);
                })
            }
            let { yearlyList } = this.state;
            if (areWeUpdatingListForThisYear) {
                this.setState({ myEventList: yearlyList, updatedEventListForThisYear: year })
            }
            else
                this.setState({ yearlyList: [] });
        }
        else {
            this.makeList(id, year, false);
        }
    }

    makeList(x, year, updateList) {
        let newDate = x.split("-").reverse().join("-");
        const thisDateis = moment(newDate);

        const date = thisDateis.format("DD");
        const month = thisDateis.format("MM");
        const myDateString = date + "-" + month + "-" + year;
        const currentYearFromList = thisDateis.format("Y");

        if (updateList == undefined) {
            updateList = false;
        }

        if (!updateList)
            debugger;

        let { myEventList, yearlyList } = this.state;

        var newArray = updateList ? yearlyList[myDateString] : [];
        if (newArray == undefined)
            newArray = [];

        var isCurrentYearLoop = currentYearFromList == year;

        var previousArrayList = [];
        if (!isCurrentYearLoop)
            previousArrayList = yearlyList[x] != undefined ? yearlyList[x] : [];


        if (myEventList[x].includes("birthday")) {//render evry a year

            if (!isCurrentYearLoop && previousArrayList.includes("birthday"))
                previousArrayList.splice(previousArrayList.indexOf("birthday"), 1);

            if (!newArray.includes("birthday"))
                newArray.push("birthday");
        }
        if (myEventList[x].includes("anniversary")) {//render every year

            if (!isCurrentYearLoop && previousArrayList.includes("anniversary"))
                previousArrayList.splice(previousArrayList.indexOf("anniversary"), 1);

            if (!newArray.includes("anniversary"))
                newArray.push("anniversary");
        }


        if (myEventList[x].includes("busy")) {
            if (!newArray.includes("busy") && isCurrentYearLoop)
                newArray.push("busy");
            if (!isCurrentYearLoop && !previousArrayList.includes("busy"))
                previousArrayList.push("busy");
        }
        if (myEventList[x].includes("holiday")) {
            if (!newArray.includes("holiday") && isCurrentYearLoop)
                newArray.push("holiday");
            if (!isCurrentYearLoop && !previousArrayList.includes("holiday"))
                previousArrayList.push("holiday");
        }


        if (updateList) {
            if (yearlyList[x] != previousArrayList) {
                yearlyList[x] = previousArrayList;
            }

            yearlyList[myDateString] = newArray;

            //updatestate
            this.setState({ yearlyList });
        }
        this.createCssFor(newArray, myDateString);

    }
    createCssFor(newArray, myDateString) {
        var styleString = "to top,";
        let titleStringArr = [];
        //compare current refs


        if (newArray.includes("anniversary")) {
            styleString += "blue,";
            titleStringArr.push("✔ Anniversary");
        }
        else if (newArray.length > 0) {
            titleStringArr.push("❌ Anniversary");
        }

        if (newArray.includes("birthday")) {
            styleString += "green,";
            titleStringArr.push("✔ Birthday");
        }
        else if (newArray.length > 0) {
            titleStringArr.push("❌ Birthday");
        }

        if (newArray.includes("busy")) {
            styleString += "brown,";
            titleStringArr.push("✔ Busy");
        }
        else if (newArray.length > 0) {
            titleStringArr.push("❌ Busy")
        }

        if (newArray.includes("holiday")) {
            styleString += "orange,";
            titleStringArr.push("✔ Holiday");
        }
        else if (newArray.length > 0) {
            titleStringArr.push("❌ Holiday");
        }

        styleString += "transparent";

        let idString = "#" + myDateString;

        $(idString).removeAttr("style");

        $(idString).css({
            background: `linear-gradient(${styleString})`
        });

        $(idString).tooltip('hide')
            .attr('data-original-title', titleStringArr.join("\n"));

        //$(idString).data("currentArray", newArray);
    }
    getDataFromDateId(date) {
        var arrayList = $("#" + date).data("currentArray");
        if (arrayList == undefined)
            arrayList = [];

        return arrayList;
    }
    onDateClicked(date) {
        let { myEventList } = this.state;

        var myarrlist = [];
        if (myEventList != undefined) {
            myarrlist = myEventList[date] != undefined ? myEventList[date] : [];
        }

        this.setState({ selectedDate: date }, this.showModal(myarrlist));
    }
    showModal(myArr) {
        this.modalChild.current.updateChild(myArr);
        $('#calender-modal').modal({
            show: true
        });

    }

    handleEventUpdate(eventTypesArray) {
        var { myEventList, selectedDate } = this.state;

        myEventList[selectedDate] = eventTypesArray;

        this.setState({ myEventList }, () => { this.applyStyle(selectedDate) });
    }

    render() {
        let { selectedDate, myEventList } = this.state;
        const { year } = this.state;
        let months = month.map((m, i) => {
            let rendermonth = new Date(year + "-" + m + "-1");
            return (<span key={i} className="col centered"><Month
                style={style}
                rendermonth={moment(rendermonth)}
                year={year}
                dateClicked={this.onDateClicked}
                myEventList={myEventList}
                ref={this.monthChild}
            /> </span>);
        })
        return (
            <div className="col-md-12 col-xs-2">
                <div className="row">
                    <div className="col-md-12 col-xs-12 centered">
                        <table className="yearSlider">
                            <thead className="panel panel-default">
                                <tr className="year-header">
                                    <th className="link" onClick={() => this.onYearClick(year - 1)}>{"<"}</th>
                                    <th className="link" onClick={() => this.onYearClick(year - 2)} className="col-xs-hidden">{year - 2}</th>
                                    <th className="link" onClick={() => this.onYearClick(year - 1)}>{year - 1}</th>
                                    <th className="panel-heading" className="selected-year">{year}</th>
                                    <th className="link" onClick={() => this.onYearClick(year + 1)}>{year + 1}</th>
                                    <th className="link" onClick={() => this.onYearClick(year + 2)} className="col-xs-hidden">{year + 2}</th>
                                    <th className="link" onClick={() => this.onYearClick(year + 1)}>{">"}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div className="row">
                    {months}
                </div>

                <CalenderModal myEventList={myEventList[selectedDate]} updateProps={this.handleEventUpdate}
                    ref={this.modalChild} />
            </div>
        );
    }
}
