import { useContext } from "react";
import './Headers-style.css';
import { UserContext, MenuContext, SideContext, DocumentContext} from '../../wrappers/DocumentsScannerEditor';
import { useEffect, useState } from "react/cjs/react.development";
import ProfilePanel from "./ProfilePanel";
import DocumentList from "../../wrappers/DocumentList";
import useDocuments from "../../hooks/useDocuments";

const Headers = ({logIn}) => {
    const classForHead = logIn ? "homepage-header" : "landingpage-header";
    const { id, username, role } = useContext(UserContext);
    const { logInHandle, menuHandler, searchHandler, openMenu } = useContext(MenuContext);
    const { isAttached } = useContext(SideContext);

    const bodyEventListener_panel = e => {
        if(e.target.className !== 'panel-btn-container' && e.target.className !== 'panel-btn' && e.target.className !== 'nav-btn'){
            if(panelStatus==='active'){
                setPanel('inactive');
            }
        }
    }

    const [panelStatus, setPanel] = useState("inactive");

    const panelClicked = (e=null) => {
        if(e){
            e.preventDefault();
        }
        
        if(panelStatus === 'inactive'){
            if(searchDoc){
                setSearchDoc("");
            }   
        }

        if(openMenu){
            menuHandler();
        }

        panelStatus === 'active' ? setPanel("inactive") : setPanel("active");
        
    }

    useEffect(()=>{
        const body = document.querySelector('body');
        if(logIn){
            if(panelStatus === 'active'){
                body.addEventListener('click', bodyEventListener_panel);
            }else{
                body.removeEventListener('click', bodyEventListener_panel);
        }}
        return ()=>{
            if(panelStatus==='active'){
                body.removeEventListener('click', bodyEventListener_panel);
            }
        }
    }, [panelStatus])

    const menuClicked = e => {
        const fromWhere = e.target.getAttribute('data');
        setPanel("inactive");
        menuHandler(fromWhere);
    }

    const logOutHandler = () => {
        logInHandle();
    }
    const {documentList} = useDocuments(id);
    const {documentFind} = useContext(DocumentContext);
    const [searchDoc, setSearchDoc] = useState("");
    const [docsSearched, setSearched] = useState(null);

    useEffect(()=>{
        if(documentList?.documents){
            setSearched(searchHandler(documentList.documents, searchDoc, 'document'));
        }
    }, [searchDoc])

    const documentSearchHandler = id =>{
        documentFind(id, documentList);
        setSearchDoc("");
    }

    const onSearchEnter = e => {
        if(searchDoc){
            const code = e.code;
            if(code === "Enter"){
                if(documentList?.documents.length > 0){
                    documentFind(documentList?.documents[0].id, documentList);
                    setSearchDoc("");
                }
            }
        }
    }

    return (
        <header className={`fd ${classForHead}`}>
            <div className="icon">
                Doc
            </div>
            {logIn ? <>
                <div className="searchbar-container">
                    <p>
                        <input className="searchbar" aria-label="Searchbar" type="text" value={searchDoc} onChange={e=>setSearchDoc(e.target.value)} onKeyDown={onSearchEnter}/>
                    </p>
                    {docsSearched ? 
                    <DocumentList handler={documentSearchHandler} documentList={docsSearched} fromWhere="header-search" /> : ""}
                </div>
                <nav>
                    <ul className="fd nav-list">
                        <li><button>Scan</button></li>
                        {isAttached  && <li><button className="nav-btn" onClick={panelClicked} >{username}</button></li>}
                    </ul>
                </nav>
                {isAttached && 
                <ProfilePanel 
                    panelStatus={panelStatus} 
                    menuClicked={menuClicked} 
                    logOutHandler={logOutHandler}
                    role={role}/>}
            </> : ""}
        </header>
    )
}

export default Headers;