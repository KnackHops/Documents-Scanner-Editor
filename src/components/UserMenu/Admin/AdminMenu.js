import { useCallback } from 'react';
import { useState, useEffect, useContext } from 'react/cjs/react.development';
import { UserContext } from '../../../App';
import SideMenu from '../SideMenu';
import AdminSide from './AdminSide';
import UserLists from './UserLists';
import './AdminMenu.css';

const AdminMenu = () => {
    const [users, setUsers] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    const {id} = useContext(UserContext)

    const fetchAdmin = useCallback(() => {

        fetch(`http://127.0.0.1:5000/admin-fetch/?id=${id}`, {
            method: 'GET',
            mode: 'cors'
        }).then(resp=>{
            if(resp.ok){
                return resp.json();
            }
        }).then(({_users})=>{
            setUsers(_users);
            setLoaded(true);
        })
    }, [id])

    useEffect(()=>{
        fetchAdmin();
    }, [fetchAdmin])

    const [sideMenuOpen, setSideMenu] = useState(false);
    const [sideUser, setSideUser] = useState(null);

    const adminSideMenuHandler = (userid=null) => {
        let flowChk = true;
        if(userid){
            if(sideUser){
                if(sideUser.userid === userid){
                    flowChk = false;
                }
            }
        }else{
            flowChk = false;
        }

        if(flowChk){
            users.forEach(user => {
                if(user.id === userid){
                    setSideUser({
                        userid,
                        username: user.username,
                        activated: user.activated,
                        role: id===0 ? user.role : null,
                        pinned_posts: user.pinned_posts
                    })
                }
            });
        }else{
            setSideUser(null);
        }

        setSideMenu(flowChk);
    }

    useEffect(()=>{
        if(users && sideUser){
            adminSideMenuHandler(true, sideUser.userid);
        }
    }, [users])

    return (
        <>
            {isLoaded ? <UserLists users={users} sideMenuHandler={adminSideMenuHandler}/> : <p>Loading Users!</p>}
            {/* {sideMenuOpen ? <SideMenu user={sideUser} fetchAdmin={fetchAdmin} id={id}/> : ""} */}
            {sideMenuOpen ? <SideMenu classCon={'admin-container'}><AdminSide user={sideUser} fetchAdmin={fetchAdmin} id={id} /></SideMenu> : ""}
        </>
    )
}

export default AdminMenu;