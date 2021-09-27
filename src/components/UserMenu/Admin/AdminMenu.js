import { useState, useEffect } from 'react/cjs/react.development';
import SideMenu from '../../SideMenu/SideMenu';
import AdminSide from '../../SideMenu/Admin/AdminSide';
import UserLists from '../../../wrappers/UserLists';
import './AdminMenu.css';

const AdminMenu = ({users, isLoaded, id}) => {
    const [sideMenuOpen, setSideMenu] = useState(false);
    const [sideUser, setSideUser] = useState(null);

    const adminSideMenuHandler = (userid=null, fromList=false) => {
        let flowChk = true;
        if(userid){
            if(sideUser){
                if(sideUser.userid === userid && fromList){
                    flowChk = false;
                }
            }
        }else{
            flowChk = false;
        }

        if(flowChk){
            let found = false;
            if(users){
                users.forEach(user => {
                    if(user.id === userid){
                        found = true;
                        setSideUser({
                            userid,
                            username: user.username,
                            activated: user.activated,
                            role: id===0 ? user.role : null,
                            pinned_posts: user.pinned_posts
                        })
                    }
                });
            }

            if(!found){
                flowChk = found;
            }
        }

        if(!flowChk){
            setSideUser(null);
        }

        setSideMenu(flowChk);
    }

    useEffect(()=>{
        if((users && sideUser) || (!users && sideUser)){
            adminSideMenuHandler(sideUser.userid);
        }
    }, [users])

    const userClickedHandler = e => {
        e.preventDefault();
        adminSideMenuHandler(Number(e.target.getAttribute('data-id')), true);
    }

    return (
        <>
            {isLoaded ? 
                <UserLists 
                    users={users} 
                    handler={userClickedHandler}
                    fromWhere={"admin"}
                /> 
            : <p>Loading Users!</p>}

            {sideMenuOpen ? 
                <SideMenu 
                    classCon={'admin-side-container'}>
                    <AdminSide 
                        user={sideUser}
                        id={id} 
                        sideMenuHandler={adminSideMenuHandler}/>
                </SideMenu> : ""}
        </>
    )
}

export default AdminMenu;