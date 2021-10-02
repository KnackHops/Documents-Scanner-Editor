import { useState, useEffect, createContext, useCallback } from "react";
import Headers from '../components/Headers/Headers';
import UserMenu from '../components/UserMenu/UserMenu';
import Home from '../components/Home/Home';
import PopUpAside from "./PopUpAside";

const UserContext = createContext(null);
const FunctionContext = createContext(null);
const SideContext = createContext(null);
const DocumentContext = createContext(null);

export default  function DocumentsScannerEditor() {
    const [logIn, setLogIn] = useState(false);
    const [user, setUser] = useState(null);
    const [openMenu, setOpen] = useState(null);

    const logInHandle = (_user = null) => {
        setUser(_user);
        if(_user){
            setLogIn(true);
        }else{
            setLogIn(false);
        }
    }

    const menuHandler = (whichFrom=null) =>{
        setOpen(whichFrom);
    }

    const [documentList, setDocumentList] = useState({documents: null});
    const [sideDocuList, setSideDocuList] = useState({documents: null});

    const documentFetch = (sideDoc = false, pinOr = false) =>{
        let id = sideDoc ? sideUser.id : user.id;
        let which_get = sideDoc ? ( pinOr ? "pinned" : "nonpinned" ) : 'default';
        console.log(id, which_get);
        fetch(`http://127.0.0.1:5000/document/fetch/?id=${id}&which_get=${which_get}`,{
            method: 'GET',
            mode: 'cors'
        }).then(resp=>{
            if(resp.ok){
                return resp.json()
            }else{
                throw Error("error fetching!");
            }
        }).then(({_documents})=>{
            let documents = null;
            if(sideDoc){
                documents = _documents ? _documents : null;
                setSideDocuList({documents})
                return;
            }

            if(_documents){
                let pinned_docs = _documents.filter(doc => doc.pinned);
                let nonpinned_docs = _documents.filter(doc => !doc.pinned);
                
                documents = pinned_docs.concat(nonpinned_docs);
            }

            setDocumentList({documents});
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        if(user){
            documentFetch();
        }
    }, [user])

    const sendHandler = ( userid, docid, doctitle) => {
        fetch(`http://127.0.0.1:5000/document/pin-doc`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid,
                docid,
                doctitle
            })
        }).then(resp=>{
            if(resp.ok){
                let _username;
                if('sub_users' in users){
                    users.sub_users.forEach(user=>{
                        if(user.id === userid){
                            _username = user.username;
                        }
                    })

                    if(!_username){
                        users.nonsub_users.forEach(user=>{
                            if(user.id === userid){
                                _username = user.username;
                            }
                        })
                    }
                }else{
                    users.forEach(user=>{
                        if(user.id === userid){
                            _username = user.username;
                        }
                    })
                }

                window.confirm(`Document: ${doctitle} is sent to User: ${user.username}`);

                if(sideDocuList?.documents){
                    documentFetch(true);
                }
            }else{
                console.log("error pinning");
            }
        })
    }

    const [sideUser, setSideUser] = useState(null);

    const searchHandler = (arr, search, fromWhere) => {
        if(!arr){
            return null
        }

        let _arr = fromWhere === 'document' ? {documents: []} : [];
        arr.forEach(item => {
            if(fromWhere === 'user'){
                if(item?.username.includes(search) || item?.id === Number(search)){
                    _arr.push({
                        id: item.id,
                        username: item.username
                    })
                }
            }else if(fromWhere === 'document'){
                if(item?.id === Number(search) || item?.title?.includes(search)){
                    _arr.documents.push({
                        id: item.id,
                        title: item.title
                    })
                }
            }
        })

        if(search && (_arr.length > 0 || _arr.documents?.length > 0)){
            return _arr
        }else{
            return null
        }
    }

    const [users, setUsers] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    const fetchUsers = useCallback((friendOnly=false) => {
        if(friendOnly){
            fetch(`http://127.0.0.1:5000/subordinate-fetch/?id=${user.id}`, {
                method: 'GET',
                mode: 'cors'
            }).then(resp=>{
                if(resp.ok){
                    return resp.json();
                }else{
                    setUsers(null);
                    setLoaded(false);
                }
            }).then(({fetched_users: _users}) =>{
                setUsers(usersGet(_users));
                setLoaded(true);
            })
        }else{
            if(user.role==='admin'){
                fetch(`http://127.0.0.1:5000/admin-fetch/?id=${user.id}`, {
                    method: 'GET',
                    mode: 'cors'
                }).then(resp=>{
                    if(resp.ok){
                        return resp.json();
                    }else{
                        setUsers(null);
                        setLoaded(false);
                    }
                }).then(({fetched_users: _users})=>{
                    setUsers(_users);
                    setLoaded(true);
                })
            }
        }
        
    }, [user])

    const usersGet = (_users) =>{
        if(!_users){
            return null
        }

        let sub_users = []
        let nonsub_users = []

        _users.forEach(user => {
            if(user.isSubordinate){
                sub_users.push(user)
            }
            if(!user.isSubordinate){
                nonsub_users.push(user)
            }
        });

        if(sub_users.length > 0 || nonsub_users.length > 0){
            return ({
                sub_users,
                nonsub_users
            });
        }else{
            return ({
                sub_users: null,
                nonsub_users: null
            })
        }
    }

    const [popUp, setPopUp] = useState({
        openUp: false
    });

    const popUpHandler = (openUp, fromWhere=null, Compo=null) => {
        if(openUp){
            if(fromWhere){
                setPopUp({
                    openUp,
                    fromWhere,
                    Compo
                })
            }else{
                setPopUp({
                    ...popUp, openUp
                })
            }
        }else{
            setPopUp({openUp})
        }
    }

    const popUpBgClickHandler = e => {
        if(e.target.classList.contains('pop-up-bg')){
            const bg = document.querySelector(".pop-up-bg");
            bg.removeEventListener("click", popUpBgClickHandler);
            popUpHandler(false);
        }
    }

    useEffect(()=>{
        if(popUp.openUp){
            const bg = document.querySelector(".pop-up-bg");

            bg.addEventListener("click", popUpBgClickHandler)
        }
    }, [popUp.openUp])

    return (
        <>
            <FunctionContext.Provider value={{
                logInHandle, 
                menuHandler,
                searchHandler,
                popUpHandler
            }}>
                <UserContext.Provider value={{
                    id: user ? user.id : null,
                    username: user ? user.username : null,
                    role: user ? user.role : null,
                    mobile: user ? user.mobile : null,
                    email: user ? user.email : null,
                    fetchUsers,
                    setLoaded,
                    isLoaded,
                    users
                }}>
                    <DocumentContext.Provider value={{
                    documentList,
                    documentFetch,
                    sendHandler,
                    sideDocuList,
                    setSideDocuList
                    }}>
                        <SideContext.Provider value={{
                        setSideUser,
                        sideUser
                        }}>
                            {popUp.openUp ? 
                                <PopUpAside fromWhere={popUp.fromWhere}>
                                        {popUp.Compo}
                                </PopUpAside> : ""}

                            {
                                openMenu && <UserMenu openMenu={openMenu}/>
                            }
                        </SideContext.Provider>

                            <Headers logIn={logIn}/>
                            <Home logIn={logIn}/>

                    </DocumentContext.Provider>
                </UserContext.Provider>
            </FunctionContext.Provider>
        </>
    )
}

export { UserContext, FunctionContext, SideContext, DocumentContext };