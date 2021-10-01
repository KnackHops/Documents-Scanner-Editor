import './ProfileMenu.css';
import { useContext, useState } from 'react/cjs/react.development';
import ProfileChange from './ProfileChange';
import { SideContext } from '../../../wrappers/DocumentsScannerEditor';
import SideMenu from '../../SideMenu/SideMenu';
import ProfileSide from '../../SideMenu/Profile/ProfileSide';

const ProfileMenu = ({children}) => {
    const { sideUser } = useContext(SideContext);
    const [profilePanel, setPanel] = useState('user-settings');
    
    const panelBtnHandler = e =>{
        e.preventDefault();

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
            children}
        </div>
        {profilePanel === 'subordinate' && sideUser ?
            <SideMenu   
                classCon={`profile-side-container ${sideUser.sideClass}-container`}>
                    <ProfileSide />
            </SideMenu>:""}
        </>
    )
}

export default ProfileMenu;