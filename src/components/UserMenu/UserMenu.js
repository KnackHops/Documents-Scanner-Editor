import { useContext, useCallback } from 'react/cjs/react.development';
import './UserMenu.css';
import AdminMenu from './Admin/AdminMenu';
import ProfileMenu from './Profile/ProfileMenu';
import { MenuContext, SideContext, UserContext } from '../../wrappers/DocumentsScannerEditor';
import PanelBackGround from '../../wrappers/PanelBackGround';

const UserMenu = ({ openMenu }) => {
    const { menuHandler } = useContext(MenuContext);
    const { isAttached } = useContext(SideContext);
    const { id, role } = useContext(UserContext)

    const MenuSection = useCallback(() => {
        return ( 
            <PanelBackGround classCon={'user-menu'} handler={menuHandler}>
                <section className={`user-menu ${openMenu}-container fd`}>
                    <div className={`${openMenu}-title`}>
                        <h1>{openMenu === 'admin' ? 'Admin' : 'Profile'}</h1>
                    </div>
                    {openMenu === 'admin' ? 
                        <AdminMenu /> : 
                        <ProfileMenu />}
                </section>
            </PanelBackGround>
        )
    }, [id, openMenu])

    const HomeMenuSection = useCallback(() => {
        return (
            <section className={`homeuser-menu-container`}>
                {role === 'admin' && 
                <div className="fd">
                    <h1>Admin</h1>
                    <AdminMenu />
                </div>}
                <div className="fd">
                    <h1>Profile</h1>
                    <ProfileMenu />
                </div>
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