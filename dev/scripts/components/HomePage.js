import React, {Component} from 'react';

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="text-center mb-5">A chore app that lets you create lists for each household user and then see today's chores.</h1>
                <p>How to get started: </p>
                <ul>
                    <li>Login with Google</li>
                    <li>Input users on user tab</li>
                    <li>Now you can edit lists for each user</li>
                    <li>Once you have your lists, you can see and check off today's chores in Today's Chores</li>
                </ul>
            </div>
        )
    }
}

export default HomePage;
