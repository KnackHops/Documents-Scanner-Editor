import './ProfilePanel.css';

const ProfilePanel = ({panelStatus, menuClicked, logOutHandler, role}) => {
    return (
        <div className={`profile-panel ${panelStatus}`}>
            <ul className="fd profile-list">
                {panelStatus === "active" ? <>
                    <li className="panel-btn-container">
                        <button className="panel-btn" onClick={menuClicked} data='profile'>Profile</button></li>
                    {role === 'admin' ? 
                    <li className="panel-btn-container">
                        <button className="panel-btn" onClick={menuClicked} data='admin'>Admin</button></li>:""}
                    <li className="panel-btn-container">
                        <button className="panel-btn" onClick={logOutHandler}>Log Out</button></li>
                    </>:""}
            </ul>
        </div>
    )
}

export default ProfilePanel;