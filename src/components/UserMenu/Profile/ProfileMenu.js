import './ProfileMenu.css';
import { useState } from 'react/cjs/react.development';
import ProfileChange from './ProfileChange';

const ProfileMenu = ({children}) => {
    const [profilePanel, setPanel] = useState('user-settings');
    
    const panelBtnHandler = e =>{
        e.preventDefault();

        profilePanel === 'user-settings' ? setPanel('subordinate') : setPanel('user-settings');
    }

    return (
        <div className={`${profilePanel}-container profile-container`}>
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
    )
}

export default ProfileMenu;