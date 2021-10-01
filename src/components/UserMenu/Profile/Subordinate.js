import { useCallback, useContext, useEffect, useState } from "react/cjs/react.development";
import { SideContext, FunctionContext } from "../../../wrappers/DocumentsScannerEditor";
import UserLists from "../../../wrappers/UserLists";

const Subordinate = ({users, isLoaded}) => {
    const { sideUser, setSideUser } = useContext(SideContext);
    const { searchHandler } = useContext(FunctionContext);

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
            let mobile, email;
            users.forEach(user=>{
                if(user.id === id){
                    if(user.isSubordinate){
                        mobile = user.mobile;
                        email = user.email;
                    }else{
                        mobile = null;
                        email = null;
                    }
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
        setSearches(searchHandler(UsersGet(false), searchUser, "user"));
    }, [searchUser])

    const UsersGet = useCallback((isSub = true)=>{
        if(!users){
            return null
        }

        let _users = []

        users.forEach(user => {
            if(user.isSubordinate){
                if(isSub){
                    _users.push({
                        id: user.id,
                        username: user.username
                    })
                }
            }else{
                if(!isSub){
                    _users.push({
                        id: user.id,
                        username: user.username
                    })
                }
            }
        });

        if(_users.length > 0){
            return _users;
        }else{
            return null;
        }
    }, [users])

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
                users={UsersGet()} 
                handler={subordinateUserHandler}
                fromWhere={"profile-subordinate"}
            />
            : <p>Loading users</p>}
        </>
    )
}

export default Subordinate;