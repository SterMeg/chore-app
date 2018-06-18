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
                                    weekArray={props.weekArray}
                                    list={user.value}/>
                            </div>
                            // <div className="col-sm-6">
                            //     <h4>{user.value}</h4>
                            //     <div className="card">
                            //         <div className="card-header">{this.state.dayName}</div>
                            //         <ul className="list-group list-group-flush">
                            //             {this.state.choreList.map((choreItem) => {
                            //                 return (
                            //                     <li key={choreItem.key} className="list-group-item chore-list-item">
                            //                         <p className="chore-name">{choreItem.value}</p>
                            //                     </li>
                            //                 )
                            //             })}
                            //         </ul>
                            //     </div>
                            // </div>
                        )
                    })} 
                </div>
            </React.Fragment>
        )
    }

export default DayView;