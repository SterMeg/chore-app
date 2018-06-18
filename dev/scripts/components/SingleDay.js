import React, {Component} from 'react';
import firebase from 'firebase';

class SingleDay extends Component {
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

        this.setState({
            dayName
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase
                    .database()
                    .ref(`users/${user.uid}/choreList/${this.props.list}/${this.state.dayName}`)
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
        return (
            <div className="card">
                <div className="card-header">{this.state.dayName}</div>
                <ul className="list-group list-group-flush">
                {this.state.choreList.map((choreItem) => {
                    return (
                        <li key={choreItem.key} className="list-group-item chore-list-item">
                            <p className="chore-name">{choreItem.value}</p>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }

}

export default SingleDay;