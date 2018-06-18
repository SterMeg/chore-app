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
            {props.userArray.map((user) => {
                return (
                <ul key={user.key} className="col-sm-6">
                    <h4>{user.value}</h4>
                    {props.weekArray.map((day) => {
                        return (
                            <EditDay 
                                key={day}
                                day={day}
                                list={user.value}
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