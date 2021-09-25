import { useEffect, useState } from "react/cjs/react.development";

const UserLists = ({users, sideMenuHandler}) => {
    const userClickedHandler = e => {
        e.preventDefault();
        sideMenuHandler(Number(e.target.getAttribute('data-id')));
    }

    return (
        <div className="user-list-container">
            <ul className="user-list fd">
            {users ? <>{
                users.map(user=><li className="fd" key={user.id} onClick={userClickedHandler}><p data-id={user.id} style={user.activated === false ? {color: 'red'} : {color: 'black'}}>{user.username}</p></li>)
            }</> : <li><p>No other user right now!</p></li>
            }
            </ul>
        </div>
        
    )
}

export default UserLists;