import { useEffect, useContext, createContext } from 'react/cjs/react.development';
import './UserMenu.css';
import AdminMenu from './Admin/AdminMenu';
import ProfileMenu from './Profile/ProfileMenu';
import Subordinate from './Profile/Subordinate';
import { FunctionContext, UserContext } from '../../wrappers/DocumentsScannerEditor';

const FetchContext = createContext();

const UserMenu = ({ openMenu }) => {
    const { menuHandler } = useContext(FunctionContext);
    const {fetchUsers, users, setLoaded } = useContext(UserContext)

    useEffect(()=>{
        setLoaded(false);
        if(openMenu==='admin'){
            fetchUsers();
        }else{
            fetchUsers(true)
        }
    }, [openMenu])

    useEffect(()=>{
        const menuContainer = document.querySelector('div.user-menu-bg');
        const menuEventListener = e => {
            if(e.target.className.includes('user-menu-bg')){
                menuHandler();
            }
        }
        menuContainer.addEventListener("click", menuEventListener)
        return () => menuContainer.removeEventListener("click", menuEventListener)
    }, [menuHandler])

    return (
        <div className="user-menu-bg fd">
            <section className={`user-menu ${openMenu}-container fd`}>
                <div className={`${openMenu}-title`}>
                    <h1>{openMenu === 'admin' ? 'Admin' : 'Profile'}</h1>
                </div>
                {openMenu === 'admin' ? 
                <AdminMenu /> : 
                <ProfileMenu>
                    <Subordinate />
                </ProfileMenu>}
            </section>
        </div>
    )
}

export default UserMenu;
export { FetchContext };