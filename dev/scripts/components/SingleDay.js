import React, {Component} from 'react';
import TaskToggle from './TaskToggle';
import firebase from 'firebase';

class SingleDay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            choreList: [],
            addCompletedClass: false
        }

        this.finishedChore = this.finishedChore.bind(this);
        this.finishedAllChores = this.finishedAllChores.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase
                    .database()
                    .ref(`users/${user.uid}/choreList/${this.props.list}/${this.props.dayName}`)
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
                .ref(`users/${this.state.userID}/choreList/${this.props.list}/${this.props.dayName}/${firebaseKey}`)
                .update({
                    complete: true
                });
        } else if (isComplete === true) {
            firebase
                .database()
                .ref(`users/${this.state.userID}/choreList/${this.props.list}/${this.props.dayName}/${firebaseKey}`)
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
                <div className="card-header">{this.props.dayName}</div>
                <ul className="list-group list-group-flush">
                {this.state.choreList.map((choreItem) => {
                    return (
                            <TaskToggle 
                                key={choreItem.key}
                                firebaseKey={choreItem.key}
                                choreItem = {choreItem}
                                finishedChore = {this.finishedChore}
                             />
                    )
                })}
                </ul>
            </div>
        )
    }

}

export default SingleDay;