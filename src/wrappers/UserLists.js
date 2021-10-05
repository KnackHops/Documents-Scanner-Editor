const UserLists = ({users, handler, fromWhere}) => {
    return (
        <div className={`${fromWhere}-list-container user-list-container`}>
            <ul className={`${fromWhere}-list user-list fd`}>
            {users && users.length > 0? 
            users.map(user=>
                <li className="fd" key={user.id} onClick={handler}>
                    <p data-id={user.id} style={fromWhere === 'admin' ? (user.activated === false ? {color: 'red'} : {color: 'black'}) : {}}>
                        {user.username}
                    </p>
                </li>)
            : 
                <li><p>No other user right now!</p></li>}
            </ul>
        </div>
        )
}

export default UserLists;