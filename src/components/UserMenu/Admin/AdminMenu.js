import { useContext, useEffect } from 'react/cjs/react.development';
import SideMenu from '../../SideMenu/SideMenu';
import AdminSide from '../../SideMenu/Admin/AdminSide';
import UserLists from '../../../wrappers/UserLists';
import './AdminMenu.css';
import { SideContext, UserContext } from '../../../wrappers/DocumentsScannerEditor';
import { useUsers } from '../../../wrappers/DocumentsScannerEditor';

const AdminMenu = () => {
    const { sideUser, setSideUser } = useContext(SideContext);
    const { id } = useContext(UserContext);
    const { users, isLoaded, fetchUsers, clearUsers } = useUsers(id);

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
                            id: userid,
                            username: user.username,
                            activated: user.activated,
                            role: id===0 ? user.role : null,
                            sideClass: "admin-side"
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
    }

    useEffect(()=>{
        if((users && sideUser) || (!users && sideUser)){
            adminSideMenuHandler(sideUser.userid);
        }
    }, [users])

    useEffect(()=>{
        return ()=>{
            setSideUser(null);
            clearUsers();
        }
    },[])

    const userClickedHandler = e => {
        e.preventDefault();
        adminSideMenuHandler(Number(e.target.getAttribute('data-id')), true);
    }

    return (
        <>
            {isLoaded && Array.isArray(users) ? 
                <UserLists 
                    users={users} 
                    handler={userClickedHandler}
                    fromWhere={"admin"}
                /> 
            : <p>Loading Users!</p>}

            {sideUser && sideUser?.sideClass == 'admin-side' ? 
                <SideMenu 
                    classCon={'admin-side-container'}>
                    <AdminSide 
                        fetchUsers={fetchUsers}
                        sideMenuHandler={adminSideMenuHandler}/>
                </SideMenu> : ""}
        </>
    )
}

export default AdminMenu;