import React from 'react';

const TaskToggle = (props) => {
    const completeChore = props.choreItem.complete === true ? "fa-check-square" : "fa-square";
    return (
        <div onClick={() => props.finishedChore(props.firebaseKey, props.choreItem.complete)}>
            <i className={`fa ${completeChore}`}></i>
        </div>
    )
}

export default TaskToggle;