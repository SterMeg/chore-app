import React, { Component } from 'react';
import firebase from 'firebase';
import ChoreListItem from './ChoreListItem';

class EditDay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chore: '',
            choreList: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeChore = this.removeChore.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase
                    .database()
                    .ref(`users/${user.uid}/choreList/${this.props.list}/${this.props.day}`)
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

    handleSubmit(e) {
        e.preventDefault();

        const choreItem = {
            value: this.state.chore,
            complete: false
        };

        const dbRef = firebase.database().ref(`users/${this.props.userID}/choreList/${this.props.list}/${this.props.day}`);

        dbRef.push(choreItem);

        this.setState({
            chore: ''
        });
    }

    removeChore(keyToRemove) {
        firebase.database().ref(`users/${ this.props.userID }/choreList/${this.props.list}/${this.props.day}/${keyToRemove}`).remove();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <li className="card single-day">
                <div className="card-header">{this.props.day}</div>
                    <div className="card-body">
                    <form action="" onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control" name="chore" placeholder="Add chore" onChange={this.handleChange} value={this.state.chore}/>
                    </form>
                    <h6 className="card-title" >Chores for day</h6>
                    <ul className="list-group">
                        {this.state.choreList.map((choreItem) => {
                            return <ChoreListItem 
                                key={choreItem.key}
                                chore={choreItem.value}
                                removeChore={this.removeChore}
                                firebaseKey={choreItem.key} />
                        })}
                    </ul>
                </div>
            </li>
    )
    }
}

export default EditDay;