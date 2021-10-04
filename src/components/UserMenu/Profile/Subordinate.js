import { useContext, useEffect, useState } from "react/cjs/react.development";
import { SideContext, MenuContext } from "../../../wrappers/DocumentsScannerEditor";
import UserLists from "../../../wrappers/UserLists";

const Subordinate = ({users, isLoaded}) => {
    const { sideUser, setSideUser } = useContext(SideContext);
    const { searchHandler } = useContext(MenuContext);

    const subordinateUserHandler = e => {
        let sideClass = null;
        let id = null;
        let username = null;

        if('sideClass' in e){
            sideClass = e.sideClass;
            id = e.id;
            username = e.username;
        }else{
            sideClass = e.target.parentNode.parentNode.classList[0].replace("-list","");
            id = Number(e.target.getAttribute('data-id'));
            username = e.target.innerHTML;
        }

        let flowChk = true;
        if(sideUser){
            if(sideUser.id === id && sideUser.sideClass === sideClass && !e?.reLoad){
                flowChk = false;
            }
        }

        if(flowChk){
            let mobile = null
            let email = null

            users.sub_users.forEach(user=>{
                if(user.id === id){
                    mobile = user.mobile;
                    email = user.email;
                }
            })

            setSideUser({
                id,
                username,
                mobile,
                email,
                sideClass
            })
        }else{
            setSideUser(null);
        }
    }

    useEffect(()=>{
        return ()=>{
            setSideUser(null);
        }
    },[])

    const [searchUser, setSearchUser] = useState("");
    const [usersSearched, setSearches] = useState(null);

    const searchEnter = e => {
        if(e.code==="Enter" && usersSearched){
            subordinateUserHandler({
                id: usersSearched[0].id,
                username: usersSearched[0].username,
                sideClass: 'profile-search'
            })
        }
    }

    useEffect(()=>{
        setSearchUser("");
        setSearches(null);
    }, [sideUser])

    useEffect(()=>{
        setSearches(searchHandler(users?.nonsub_users, searchUser, "user"));
    }, [searchUser])

    return(
        <>
            <div className="subordinate-search-container">
                <p>
                    <label htmlFor="search-user">Search for a User: </label>
                    <input type="text" id="search-user" value={searchUser} onChange={e=>setSearchUser(e.target.value.toLowerCase())} onKeyDown={searchEnter}></input>
                </p>
                {usersSearched ?
                    <UserLists 
                        users={usersSearched}
                        handler={subordinateUserHandler}
                        fromWhere={"profile-search"}
                    /> : ""}
            </div>
            <p>Subordinates: Click the username to send a document</p>
            {isLoaded ? 
            <UserLists 
                users={users?.sub_users} 
                handler={subordinateUserHandler}
                fromWhere={"profile-subordinate"}
            />
            : <p>Loading users</p>}
        </>
    )
}

export default Subordinate;