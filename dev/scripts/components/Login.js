import React from 'react';

const Login = (props) => {
    return (
        <React.Fragment>
            {props.loggedIn === false && <button className="btn btn-outline-primary my-2 my-sm-0" onClick={props.loginWithGoogle}>Login with Google</button> }
            {props.loggedIn === true && <button className="btn btn-outline-primary my-2 my-sm-0" onClick={props.logout}>Sign Out</button> }
        </React.Fragment>
    )
}

export default Login;
