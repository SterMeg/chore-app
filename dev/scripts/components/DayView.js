import React, {Component} from 'react';
import firebase from 'firebase';

class DayView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dayName: '',
            choreList: []
        }
    }

    componentDidMount() {
        const currDate = new Date;
        const currDay = currDate.getDay();

        const dayName = this.props.weekArray[currDay];
        
        this.setState ({
            dayName
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase
                    .database()
                    .ref(`users/${user.uid}/choreList/one/${this.state.dayName}`)
                    .on('value', snapshot => {
                        const data = snapshot.val();
                        const choreArray = [];

                        for (let item in data) {
                            console.log(data[item])

                            data[item].key = item;
                            choreArray.push(data[item])
                        }

                        this.setState({
                            choreList: choreArray
                        });
                    });
            }
        });
    }

    render() {
        return(
            <React.Fragment>
                <h2>Today's Chores</h2>
                <div className="row">
                    <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header">{this.state.dayName}</div>
                        <ul className="list-group list-group-flush">
                            {this.state.choreList.map((choreItem) => {
                                return (
                                <li key ={choreItem.key}className="list-group-item chore-list-item">
                                    <p className="chore-name">{choreItem.value}</p>
                                </li>
                                )
                            })}
                        </ul>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <ul className="list-group">
                            {this.state.choreList.map((choreItem) => {
                                return (
                                    <li key={choreItem.key} className="list-group-item chore-list-item">
                                        <p className="chore-name">{choreItem.value}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default DayView;