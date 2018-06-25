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
            {props.userArray.map((user, i) => {
                return (
                <ul key={user.key} className="col-sm-6">
                    <h4>List {i + 1}</h4>
                    {props.weekArray.map((day) => {
                        return (
                            <EditDay 
                                key={day}
                                day={day}
                                list={i}
                                userID={props.userID}/>   
                        )
                    })}
                </ul>
                )
                })}
        </div>
    )
}

export default EditList;