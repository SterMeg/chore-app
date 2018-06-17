import React from 'react';

const ChoreListItem = (props) => {
    return (
        <li className="list-group-item chore-list-item">
            <p className="chore-name">{props.chore}</p>
            <button className="remove-chore btn btn-outline-warning btn-sm" onClick={() => props.removeChore(props.firebaseKey)}>Remove</button>
        </li>
    )
}

export default ChoreListItem;