import { useEffect, useContext, useCallback } from 'react/cjs/react.development';
import './UserMenu.css';
import AdminMenu from './Admin/AdminMenu';
import ProfileMenu from './Profile/ProfileMenu';
import { MenuContext, SideContext, UserContext } from '../../wrappers/DocumentsScannerEditor';

const UserMenu = ({ openMenu }) => {
    const { menuHandler } = useContext(MenuContext);
    const { isAttached } = useContext(SideContext);
    const { id, role } = useContext(UserContext)

    useEffect(()=>{
        const menuContainer = document.querySelector('div.user-menu-bg');
        if(menuContainer){
            const menuEventListener = e => {
                if(e.target.className.includes('user-menu-bg')){
                    menuHandler();
                }
            }
            menuContainer.addEventListener("click", menuEventListener)
            return () => menuContainer.removeEventListener("click", menuEventListener)
        }
    }, [menuHandler])

    const MenuSection = useCallback(() => {
        return ( 
            <div className="user-menu-bg fd">
                <section className={`user-menu ${openMenu}-container fd`}>
                    <div className={`${openMenu}-title`}>
                        <h1>{openMenu === 'admin' ? 'Admin' : 'Profile'}</h1>
                    </div>
                    {openMenu === 'admin' ? 
                        <AdminMenu /> : 
                        <ProfileMenu />}
                </section>
            </div>
        )
    }, [id, openMenu])

    const HomeMenuSection = useCallback(() => {
        return (
            <section className={`homeuser-menu-containerfd`}>
                {role === 'admin' && <AdminMenu />}
                <ProfileMenu />
            </section>
        )
    }, [id])

    return (
        <>
        {isAttached ? <MenuSection/> :
        <HomeMenuSection />}
        </>
    )
}

export default UserMenu;