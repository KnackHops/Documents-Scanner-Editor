import { useState, useEffect, createContext } from "react";
import Headers from '../components/Headers/Headers';
import Home from '../components/Home/Home';

const UserContext = createContext(null);
const MenuContext = createContext(null);
const SideContext = createContext(null);
const DocumentContext = createContext(null);

export default  function DocumentsScannerEditor() {
    const pinHandler = ( username, userid, docid, doctitle) => {
        return new Promise((resolve, reject) => {
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
                    if ( userid === user.id ) {
                        window.confirm(`Document: ${doctitle} is pinned for you! User ${username}`)
                    } else {
                        window.confirm(`Document: ${doctitle} is sent to User ${username}`);
                    }

                    resolve();
                }else{
                    console.log("error pinning");
                    reject();
                }
            })
        })
    }

    const unpinHandler = (userid, docid) => {
        return new Promise((resolve, reject) => {
            fetch(`http://127.0.0.1:5000/document/unpin-doc/?userid=${userid}&docid=${docid}`,{
                method: 'DELETE',
                mode: 'cors'
            }).then(resp=>{
                if(resp.ok){
                    window.confirm("Unpinning document done!");
                    resolve();
                }else{
                    window.alert("Unpinning document error!");
                    reject();
                }
            })
        })
    }

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

    const updateUser = (fromWhere, val) => {
        setUser({
            ...user,
            [fromWhere]: val
        })
    }

    const menuHandler = (whichFrom=null) =>{
        setOpen(whichFrom);
    }

    const [sideUser, setSideUser] = useState(null);

    const searchHandler = (arr, search, fromWhere) => {
        if(!arr){
            return null
        }

        let _search;

        if(isNaN(search)){
            _search = search.toLowerCase();
        }else{
            _search = search;
        }

        let _arr = fromWhere === 'document' ? {documents: []} : [];
        arr.forEach(item => {
            if(fromWhere === 'user'){
                if(item?.username.includes(_search) || item?.fullname.includes(_search) || item?.id === Number(_search)){
                    _arr.push({
                        id: item.id,
                        fullname: item.fullname,
                        username: item.username
                    })
                }
            }else if(fromWhere === 'document'){
                if(item?.id === Number(_search) || item?.title?.includes(_search)){
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

    const [popUp, setPopUp] = useState({
        openUp: false
    });

    const popUpHandler = (openUp=false, fromWhere=null, Compo=null) => {
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

    const [isAttached, setAttached] = useState(true);

    useEffect(()=>{
        if(openMenu && !isAttached){
            setOpen(false);
        }
    },[isAttached])

    
    const [document, setDocument] = useState(null);

    const documentFind = (id, documentList) => {
        documentList.documents.forEach(doc => {
            if(doc.id===id){
                setDocument({
                    id,
                    title: doc.title,
                    body: doc.document,
                    pinned: doc.pinned
                })
            }
        });
    }

    return (
        <>
            <MenuContext.Provider value={{
                logInHandle, 
                menuHandler,
                searchHandler,
                popUpHandler,
                popUp,
                openMenu
            }}>
                <UserContext.Provider value={{
                    id: user ? user.id : null,
                    username: user ? user.username : null,
                    role: user ? user.role : null,
                    mobile: user ? user.mobile : null,
                    email: user ? user.email : null,
                    updateUser
                }}>
                    <DocumentContext.Provider value={{
                        document,
                        documentFind,
                        setDocument,
                        pinHandler,
                        unpinHandler
                    }}>
                        <SideContext.Provider value={{
                        setSideUser,
                        sideUser,
                        isAttached,
                        setAttached
                        }}>
                            <Headers logIn={logIn}/>
                            <Home logIn={logIn}/>
                        </SideContext.Provider>
                    </DocumentContext.Provider>
                </UserContext.Provider>
            </MenuContext.Provider>
        </>
    )
}

export { UserContext, MenuContext, SideContext, DocumentContext };