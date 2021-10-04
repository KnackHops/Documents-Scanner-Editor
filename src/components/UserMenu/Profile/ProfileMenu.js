import './ProfileMenu.css';
import { useContext, useState } from 'react/cjs/react.development';
import ProfileChange from './ProfileChange';
import { SideContext, UserContext } from '../../../wrappers/DocumentsScannerEditor';
import { useUsers } from '../../../wrappers/DocumentsScannerEditor';
import SideMenu from '../../SideMenu/SideMenu';
import ProfileSide from '../../SideMenu/Profile/ProfileSide';
import Subordinate from './Subordinate';

const ProfileMenu = () => {
    const { sideUser } = useContext(SideContext);
    const [profilePanel, setPanel] = useState('user-settings');
    const { id } = useContext(UserContext);
    const { users, isLoaded, fetchUsers } = useUsers(id, true);
    
    const panelBtnHandler = e =>{
        e.preventDefault();
        console.log("what why")

        profilePanel === 'user-settings' ? setPanel('subordinate') : setPanel('user-settings');
    }

    return (
        <>
        <div className={`${profilePanel}-container`}>
            <p>
                <button onClick={panelBtnHandler}>
                    {
                        profilePanel === 'user-settings' ? "Subordinate" : "User Settings"
                    }
                </button>
            </p>
            {profilePanel === 'user-settings' ? 
            <ProfileChange/> :
            <Subordinate users={users} isLoaded={isLoaded} />}
        </div>
        {sideUser && (sideUser?.sideClass === 'profile-search' || sideUser?.sideClass === 'profile-subordinate') ?
            <SideMenu   
                classCon={`profile-side-container ${sideUser.sideClass}-container`}>
                    <ProfileSide fetchUsers={fetchUsers}/>
            </SideMenu>:""}
        </>
    )
}

export default ProfileMenu;