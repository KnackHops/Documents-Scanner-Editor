import { useContext, useState, useEffect, useMemo } from "react";
import './Headers-style.css';
import { UserContext, MenuContext, SideContext, DocumentContext} from '../../wrappers/DocumentsScannerEditor';
import ProfilePanel from "./ProfilePanel";
import DocumentList from "../../wrappers/DocumentList";
import useDocuments from "../../hooks/useDocuments";
import NavPanelList from "./NavPanelList";
import ScanPopUp from "./ScanPopUp";

const Headers = ({logIn}) => {
    const classForHead = logIn ? "homepage-header" : "landingpage-header";
    const { logInHandle, menuHandler, searchHandler, openMenu } = useContext(MenuContext);

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

    const { id, username, role } = useContext(UserContext);

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

    const {popUpHandler} = useContext(MenuContext);

    const scanPopHandler = e => {
        e.preventDefault();

        popUpHandler(true, "scan-header", <ScanPopUp />)
    }

    const { isAttached } = useContext( SideContext );
    
    const nav_arr = useMemo(()=>{
        let _arr = []

        if ( logIn ) {
            _arr.push({
                label: 'Scan',
                handler: scanPopHandler
            })

            if ( isAttached ) {
                _arr.push({
                    label: username,
                    handler: panelClicked
                })
            }else{
                _arr.push({
                    label: 'Log Out',
                    handler: logOutHandler
                })
            }
        } else {
            _arr = [
                {
                    label: 'Sign in',
                    handler: () => console.log("sign in")
                },
                {
                    label: 'About',
                    handler: () => console.log("About!")
                },
                {
                    label: 'Contacts',
                    handler: () => console.log("Contacts!")
                }
            ]
        }

        return _arr

    }, [logIn, username, isAttached])

    const noScroll = e => {
        e.target.scrollTo(0, e.target.scTop);
    }

    const burgerMachine = () => {
        const burg = document.querySelector(".burger");
        const navL = document.querySelector(".nav-list");

        burg.classList.toggle("-open");
        navL.classList.toggle("-open");
        
        if ( burg.classList.contains("-not-signed") ) {
            
            const bod = document.querySelector("body");

            if ( burg.classList.contains("-open") ) {
                bod.scTop = bod.scrollTop;
                bod.eventAt = true
                bod.addEventListener("scroll", noScroll);
            } else{
                bod.scTop = 0;
                bod.eventAt = false
                bod.removeEventListener("scroll", noScroll);

            }
        }
    }

    useEffect( () => {
        const bod = document.querySelector("body");

        if ( bod?.eventAt ) {
            bod.removeEventListener("scroll", noScroll)
        }
    }, [ logIn ] )

    useEffect( () => {
        if ( document.querySelector(".burger").classList.contains("-open") ) {
            burgerMachine();
        }
    }, [ isAttached ] )

    return (
        <header className={`${classForHead}`}>
            <div className="fd universal-container">
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
                    <NavPanelList 
                    classCon="signed"
                    arr={nav_arr}
                    />
                    {isAttached && 
                    <ProfilePanel 
                        panelStatus={panelStatus} 
                        menuClicked={menuClicked} 
                        logOutHandler={logOutHandler}
                        role={role}/>}
                </> : 
                <NavPanelList classCon="not-signed" arr={nav_arr}/>}
                <div className={`burger ${logIn ? "-signed" : "-not-signed"}`}
                    onClick={burgerMachine}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    )
}

export default Headers;