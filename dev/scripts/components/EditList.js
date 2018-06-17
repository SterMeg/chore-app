import React, { Component } from 'react';
import EditDay from './EditDay';

const EditList = (props) => {
    // const singleDay = props.weekArray.map((day) => {
    //     return (
    //         <EditDay key={day}
    //             day={day}/>
    //     )
    // });
    return (
        <div className="row">
            <ul className="col-sm-6">
                <h4>List One</h4>
                {props.weekArray.map((day) => {
                    return (
                        <EditDay 
                            key={day}
                            day={day}
                            list={'one'}
                            userID={props.userID}/>   
                    )
                })}
            </ul>
            <ul className="col-sm-6">
                <h4>List Two</h4>
                {props.weekArray.map((day) => {
                    return (
                        <EditDay
                            key={day}
                            day={day}
                            list={'two'} 
                            userID={props.userID}/>
                    )
                })}
            </ul>
        </div>
    )
}

export default EditList;