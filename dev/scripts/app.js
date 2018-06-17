import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import DayView from './components/DayView';
import EditList from './components/EditList';
import Users from './components/Users';

const config = {
  apiKey: "AIzaSyAuDFRR2dvBFHtBB6BfDCMkr6XQE6wztQ0",
  authDomain: "chore-app-7a709.firebaseapp.com",
  databaseURL: "https://chore-app-7a709.firebaseio.com",
  projectId: "chore-app-7a709",
  storageBucket: "",
  messagingSenderId: "96740150348"
};
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      weekArray: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      userID: null,
      userName: ''
    }

    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref('chores');

    firebase.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        this.dbRef.on('value', (snapshot) => {
          console.log(snapshot.val());
          
        });
        this.setState({
          loggedIn: true,
          userID: user.uid,
          userName: user.displayName
        });
      } else {
        console.log('User logged out');
        this.setState({
          loggedIn: false,
          userID: '',
          userName: ''
        })
      }
    })
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    firebase.auth().signOut();
    this.dbRef.off('value');
  }

  render() {
    return <Router>
        <div className="container">
          <header>
            <Navbar 
              loginWithGoogle={this.loginWithGoogle}
              logout={this.logout}
              loggedIn={this.state.loggedIn}/>
          </header>
          <main>
            <Route exact path="/" component={HomePage}/>
            <Route path="/DayView" component={DayView}/>
            <Route path="/EditList" render={() =>
              <EditList
                weekArray={this.state.weekArray}
                userID={this.state.userID}
                />} />
            <Route path="/Users" component={Users} />
          </main>
        </div>
      </Router>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
