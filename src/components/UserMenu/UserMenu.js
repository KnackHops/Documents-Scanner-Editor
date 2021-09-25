import { useEffect } from 'react/cjs/react.development';
import './UserMenu.css';
import AdminMenu from './Admin/AdminMenu';
import ProfileMenu from './Profile/ProfileMenu';

const UserMenu = ({menuHandler, openMenu}) => {
    useEffect(()=>{
        const menuContainer = document.querySelector('div.user-menu-container');
        const menuEventListener = e => {
            if(e.target.className.includes('user-menu-container')){
                menuHandler();
            }
        }
        menuContainer.addEventListener("click", menuEventListener)
        return () => menuContainer.removeEventListener("click", menuEventListener)
    }, [menuHandler])
    return (
        <div className="user-menu-container fd">
            <section className={`user-menu ${openMenu}-container fd`}>
                <div className={`${openMenu}-title`}>
                    <h1>{openMenu === 'admin' ? 'Admin' : 'Profile'}</h1>
                </div>
                {openMenu === 'admin' ? <AdminMenu /> : <ProfileMenu />}
            </section>
        </div>
    )
}

export default UserMenu;