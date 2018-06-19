import React, {Component} from 'react';
import firebase from 'firebase';
import SingleDay from './SingleDay';

const DayView = (props) => {
        return(
            <React.Fragment>
                <h2>Today's Chores</h2>
                <div className="row">
                    {props.userArray.map((user) => {
                        return (
                            <div key={user.key} className="col-sm-6">
                            <h4>{user.value}</h4>
                                <SingleDay 
                                    userId={props.userId}
                                    weekArray={props.weekArray}
                                    list={user.value}/>
                            </div>
                        )
                    })} 
                </div>
            </React.Fragment>
        )
    }

export default DayView;