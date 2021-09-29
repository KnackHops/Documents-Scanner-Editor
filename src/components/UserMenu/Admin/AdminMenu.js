import { useContext, useEffect } from 'react/cjs/react.development';
import SideMenu from '../../SideMenu/SideMenu';
import AdminSide from '../../SideMenu/Admin/AdminSide';
import UserLists from '../../../wrappers/UserLists';
import './AdminMenu.css';
import { SideContext } from '../../../wrappers/DocumentsScannerEditor';

const AdminMenu = ({users, isLoaded, id}) => {
    const { sideUser, setSideUser } = useContext(SideContext);

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
    }

    useEffect(()=>{
        if((users && sideUser) || (!users && sideUser)){
            adminSideMenuHandler(sideUser.userid);
        }
    }, [users])

    useEffect(()=>{
        return ()=>{
            setSideUser(null);
        }
    },[])

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

            {sideUser ? 
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