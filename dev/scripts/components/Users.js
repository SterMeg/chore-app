import React, { Component } from 'react';
import firebase from 'firebase';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ''
        }
        console.log(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            value: this.state.user
        };

        const dbRef = firebase.database().ref(`users/${this.props.userID}/userList`);

        dbRef.push(user);

        this.setState({
            user: ''
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <h2>Users</h2>
                <form action="" onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" name="user" placeholder="Add user" onChange={this.handleChange} value={this.state.user} />
                </form>
                <ul className="list-group">
                    {this.props.userArray.map((user) => {
                        return (
                            <li className="list-group-item" key={user.key}>{user.value}</li>
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

export default Users;