import React from 'react';

const TaskToggle = (props) => {
    const completeChore = props.choreItem.complete === true ? "fa-check-square" : "fa-square";
    return (
        <li onClick={() => props.finishedChore(props.firebaseKey, props.choreItem.complete)} key={props.choreItem.key} className={`${props.completedClass} list-group-item chore-list-item`}>
            <p className="chore-name">{props.choreItem.value}</p>
            <div>
                <i className={`fa ${completeChore}`}></i>
            </div>
        </li>
    )
}

export default TaskToggle;