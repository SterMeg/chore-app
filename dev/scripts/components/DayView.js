import React, {Component} from 'react';
import firebase from 'firebase';
import moment from 'moment';
import SingleDay from './SingleDay';

class DayView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dayName: '',
            currWeek: ''
        }
    }

    componentDidMount() {
        moment().format();
        const currDate = new Date;
        const currDay = currDate.getDay();
        const currWeek = moment(currDate).week();

        const dayName = this.props.weekArray[currDay];

        this.setState({
            dayName: dayName,
            currWeek: currWeek
        });


    }

    // componentDidUpdate() {
    //     if (this.props.userArray.length > 0 && this.state.currWeek % 2 === 0) {
    //         const reverseArray = Array.from(this.props.userArray).reverse();
    //         console.log(reverseArray);
    //     }
    // }


    render() {
        return(
            <React.Fragment>
                <h2>Today's Chores</h2>
                {/* <button className="btn btn-outline-secondary"onClick={() => this.props.switchList()}>Swap Chores</button>
                <p>Chores lists will remain swapped until clicked again</p> */}
                <div className="row">
                    {this.props.userArray.map((user, i) => {
                        return (
                            <div key={user.key} className="col-sm-6">
                            <h4>{user.value}</h4>
                                <SingleDay 
                                    userArray={this.props.userArray}
                                    weekArray={this.props.weekArray}
                                    list={i}
                                    dayName={this.state.dayName}/>
                                    
                            </div>
                        )
                    })} 
                </div>
            </React.Fragment>
        )
    }
}

export default DayView;