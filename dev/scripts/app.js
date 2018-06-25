//Things to do
  //Log in with Google or email
  //Look into household authentication. Connecting individual logins to single account
  //Conditional rendering when not logged in. Refactor home page to login page?
  //Styling

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
import Footer from './components/Footer';

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
      userName: '',
      userArray: [],
      swapped: null
    }

    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
    // this.switchList = this.switchList.bind(this);
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref();

    firebase.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        this.dbRef.on('value', (snapshot) => {
          const choreData = snapshot.val();

          const loggedInUser = user.uid;
          const userList = choreData.users[loggedInUser]['userList'];
          const swapped = choreData.users[loggedInUser]['swapped'];

          const userArray = [];

            
          for (let item in userList) {
            userList[item].key = item;
            userArray.push(userList[item]);   
          }

          if (swapped !== undefined) {
            this.setState({
              swapped: swapped
            }); 
          }

          this.setState({
            userArray: userArray,
          });      
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
          userID: ''
        })

      }   
    })
  }

  // switchList() {

  //   const dbRef = firebase.database().ref(`users/${this.state.userID}/swapped`);
  //   dbRef.on("value", snapshot => {
  //     const swapped = snapshot.value;

  //   if (swapped === undefined) {
  //     firebase.
  //       database().
  //       ref(`users/${this.state.userID}/swapped`)
  //       .set({ value: true });   
  //   } else if (swapped === false) {
  //     firebase.
  //       database().
  //       ref(`users/${this.state.userID}/swapped`)
  //       .update({ value: true }); 
  //   } else if (swapped === true) {
  //     firebase.
  //       database().
  //       ref(`users/${this.state.userID}/swapped`)
  //       .update({ value: false }); 
  //   }

  //   });
    
    // if (this.state.swapped === true) {
    


    // dbRef.push(user);

    // console.log('called');
      // const userClone = Object.assign({}, this.state.userList);
      // const swapArray = [];

      // console.log(userClone);
      
      // let entry = Object.entries(userClone);
      // entry.push(entry.shift());

      // for (let i = 0; i < entry.length; i++) {
      //     let user = [...entry[i]];
      //     console.log(user);
      // }
      
      // entry.forEach((user, i) => {
      //   const swapKey = user[1].key;
      //   const swapValue = user[1].value;
        // for (let item in userClone) {
        //   userClone[item].value = swapValue;
        //   // userClone[item][swapKey].value = swapValue;
        // }
      // });

      // firebase.database().ref(`users/${this.state.userID}/userList`).remove();

      // const dbRef = firebase.database().ref(`users/${this.state.userID}/userList`);

      // dbRef.push(userOne);


     

      // console.log(userClone);


      // firebase
      //   .database()
      //   .ref(`users/${this.state.userID}`)
      //   .update({
      //     userList: userClone
      //   });
  // }

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
        <div className="app-container">
          <header>
            <Navbar 
              loginWithGoogle={this.loginWithGoogle}
              logout={this.logout}
              loggedIn={this.state.loggedIn}/>
          </header>
          <main className="container py-5">
            <Route exact path="/" component={HomePage}/>
            <Route path="/DayView" render={() => 
              <DayView 
                userArray={this.state.userArray}
                weekArray={this.state.weekArray}
                userID={this.state.userID}
                switchList={this.switchList}/>}
                />
            <Route path="/EditList" render={() =>
              <EditList
                userArray={this.state.userArray}
                weekArray={this.state.weekArray}
                userID={this.state.userID}
                />} />
            <Route path="/Users" render={() =>
              <Users 
                userArray={this.state.userArray}
                userID={this.state.userID}/>} 
                userList={this.state.userList}/>
          </main>
          <Footer />
        </div>
      </Router>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
