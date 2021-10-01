import { useEffect, useContext, createContext } from 'react/cjs/react.development';
import './UserMenu.css';
import AdminMenu from './Admin/AdminMenu';
import ProfileMenu from './Profile/ProfileMenu';
import Subordinate from './Profile/Subordinate';
import { FunctionContext, UserContext } from '../../wrappers/DocumentsScannerEditor';

const FetchContext = createContext();

const UserMenu = ({ openMenu }) => {
    const { menuHandler } = useContext(FunctionContext);
    const {id, fetchUsers, users, isLoaded } = useContext(UserContext)

    useEffect(()=>{
        if(openMenu==='admin'){
            fetchUsers();
        }else{
            fetchUsers(true)
        }
    }, [openMenu, fetchUsers])

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
                <FetchContext.Provider value={{fetchUsers}}>
                    {openMenu === 'admin' ? 
                    <AdminMenu users={users} isLoaded={isLoaded} id={id} /> : 
                    <ProfileMenu>
                        <Subordinate users={users} isLoaded={isLoaded} />
                    </ProfileMenu>}
                </FetchContext.Provider>
            </section>
        </div>
    )
}

export default UserMenu;
export { FetchContext };