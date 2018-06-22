import React, {Component} from 'react';
import TaskToggle from './TaskToggle';
import firebase from 'firebase';

class SingleDay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dayName: '',
            choreList: [],
            addCompletedClass: false
        }

        this.finishedChore = this.finishedChore.bind(this);
        this.finishedAllChores = this.finishedAllChores.bind(this);
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
                            choreList: choreArray,
                            userID: user.uid
                        }, () => {
                            this.finishedAllChores();
                        });
                    });
            }
        });
        
    }

    finishedChore(firebaseKey, isComplete) {
        console.log('being called');
        if (isComplete === false) {
            firebase
                .database()
                .ref(`users/${this.state.userID}/choreList/${this.props.list}/${this.state.dayName}/${firebaseKey}`)
                .update({
                    complete: true
                });
        } else if (isComplete === true) {
            firebase
                .database()
                .ref(`users/${this.state.userID}/choreList/${this.props.list}/${this.state.dayName}/${firebaseKey}`)
                .update({
                    complete: false
                });
        }
    }

    finishedAllChores() {
        let allComplete = this.state.choreList.map((choreItem) => {
             return choreItem.complete;
        })
        const addCompletedClass = allComplete.every((chore) => {
            return chore === true;
        })
        if (addCompletedClass === true) {
            this.setState ({
                addCompletedClass: true
            }); 
        } else {
            this.setState ({
                addCompletedClass: false
            });
        }
    }
    

    render() {
        const completedClass = this.state.addCompletedClass === true ? "finished" : "";
        return (
            <div className={`card ${completedClass}`}>
                <div className="card-header">{this.state.dayName}</div>
                <ul className="list-group list-group-flush">
                {this.state.choreList.map((choreItem) => {
                    return (
                        <li key={choreItem.key} className="list-group-item chore-list-item">
                            <p className="chore-name">{choreItem.value}</p>
                            <TaskToggle 
                                firebaseKey={choreItem.key}
                                choreItem = {choreItem}
                                finishedChore = {this.finishedChore}
                             />
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }

}

export default SingleDay;