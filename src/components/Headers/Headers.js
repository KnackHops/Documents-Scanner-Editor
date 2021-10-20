import { useContext, useState, useEffect, useMemo } from "react";
import './Headers-style.css';
import { UserContext, MenuContext, SideContext, DocumentContext} from '../../wrappers/DocumentsScannerEditor';
import ProfilePanel from "./ProfilePanel";
import DocumentList from "../../wrappers/DocumentList";
import useDocuments from "../../hooks/useDocuments";
import NavPanelList from "./NavPanelList";
import ScanPopUp from "./ScanPopUp";

const Headers = ( { logIn, socket  } ) => {
    const classForHead = logIn ? "homepage-header" : "landingpage-header";
    const { logInHandle, menuHandler, searchHandler, openMenu, getMainChildrenHeights } = useContext( MenuContext );

    const bodyEventListener_panel = e => {
        if ( e.target.className !== 'panel-btn-container' 
        && e.target.className !== 'panel-btn' && e.target.className !== 'nav-btn' ) {
            if ( panelStatus==='active' ) {
                setPanel('inactive');
            }
        }
    }

    const [ panelStatus, setPanel ] = useState("inactive");

    const panelClicked = ( e = null ) => {
        if ( e ) {
            e.preventDefault();
        }
        
        if ( panelStatus === 'inactive' ) {
            if( searchDoc ) {
                setSearchDoc("");
            }   
        }

        if ( openMenu ) {
            menuHandler();
        }

        panelStatus === 'active' ? setPanel("inactive") : setPanel("active");
        
    }

    useEffect( () => {
        const body = document.querySelector('body');
        if ( logIn ) {
            if ( panelStatus === 'active' ) {
                body.addEventListener('click', bodyEventListener_panel);
            } else {
                body.removeEventListener('click', bodyEventListener_panel);
            }
        }

        return () => {
            if ( panelStatus === 'active' ) {
                body.removeEventListener('click', bodyEventListener_panel);
            }
        }
    }, [ panelStatus ] )

    const menuClicked = e => {
        const fromWhere = e.target.getAttribute('data');
        setPanel("inactive");
        menuHandler(fromWhere);
    }

    const { id, username, role } = useContext(UserContext);

    const logOutHandler = () => {
        socket.emit( "del_socketid", { userid: id } )
        logInHandle();
    }

    const { documentList } = useDocuments( id );
    const { documentFind } = useContext( DocumentContext );
    const [ searchDoc, setSearchDoc ] = useState( "" );
    const [ docsSearched, setSearched ] = useState( null );

    useEffect( () => {
        if ( documentList?.documents ) {
            setSearched( searchHandler( documentList.documents, searchDoc, 'document' ) );
        }
    }, [ searchDoc ] )

    const documentSearchHandler = id =>{
        documentFind( id, documentList );
        setSearchDoc("");
    }

    const onSearchEnter = e => {
        if ( searchDoc ) {
            const code = e.code;
            if ( code === "Enter" ) {
                if ( documentList?.documents.length > 0 ) {
                    documentFind( documentList?.documents[0].id, documentList );
                    setSearchDoc("");
                }
            }
        }
    }

    const { popUpHandler } = useContext( MenuContext );

    const scanPopHandler = e => {
        e.preventDefault();

        popUpHandler( true, "scan-header", <ScanPopUp /> )
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
                    label: username.toUpperCase(),
                    handler: panelClicked
                })
            } else {
                _arr.push({
                    label: 'Log Out',
                    handler: logOutHandler
                })
            }
        } else {
            _arr = [
                {
                    label: 'Sign in',
                    handler: e => scrollCustomTo(e)
                },
                {
                    label: 'About',
                    handler: e => scrollCustomTo(e)
                },
                {
                    label: 'Contacts',
                    handler: e => scrollCustomTo(e)
                }
            ]
        }

        return _arr

    }, [ logIn, username, isAttached ] )

    const noScroll = e => {
        if ( e.target.eventAt ) {
            e.target.scrollTo( 0, e.target.scTop );
        } else if ( document.querySelector("ul.nav-list").classList.contains("not-signed-list-con") ) {
            scrollNavUpdate( e.target.scrollTop );
        }
    }

    const labelArr = useMemo(()=>{
        return [
            [true, false, false],
            [false, true, false],
            [false, false, true],
            [false, false, false]
        ]
    }, [])

    const scrollNavUpdate = scrollTop => {
        const [ firstCompo, secondCompo, thirdCompo ] = getMainChildrenHeights();

        if ( scrollTop > secondCompo * .8 ) {
            document.querySelector(".navigate-top").classList.add("active");
        } else {
            document.querySelector(".navigate-top").classList.remove("active");
        }

        if ( scrollTop >= firstCompo && scrollTop < secondCompo ) {
            shuffleLabel(...labelArr[0]);
        } else if ( scrollTop >=  secondCompo && scrollTop < thirdCompo ) {
            shuffleLabel(...labelArr[1]);
        } else if ( scrollTop >= thirdCompo ) {
            shuffleLabel(...labelArr[2]);
        } else {
            shuffleLabel(...labelArr[3]);
        }
    }

    const shuffleLabel = ( firstDisable = null, secondDisable = null, thirdDisable = null ) => {
        const nav = document.querySelector("ul.nav-list");
        console.log(nav.childNodes[0].childNodes[0])

        nav.childNodes[0].childNodes[0].disabled = firstDisable;
        nav.childNodes[1].childNodes[0].disabled = secondDisable;
        nav.childNodes[2].childNodes[0].disabled = thirdDisable;
    }

    const scrollCustomTo = e => {
        e.preventDefault();
        
        const [ firstCompo, secondCompo, thirdCompo ] = getMainChildrenHeights();

        const whereTo = e.target.innerText;
        const bod = document.querySelector("body");
        const burg = document.querySelector(".burger");

        if ( burg.classList.contains("-open") ) {
            burgerMachine();
        }

        if ( whereTo === "Sign in" ) {
            // bod.scrollTo( 0, window.innerHeight * .4);
            bod.scroll({ top: firstCompo,  behavior: 'smooth' });
        } else if ( whereTo === "About" ) {
            bod.scroll({ top: secondCompo,  behavior: 'smooth' })
        } else if ( whereTo === "Contacts" ) {
            bod.scroll({ top: thirdCompo,  behavior: 'smooth' })
            // bod.scrollTo( 0, ( window.innerHeight * 2.4 ) - 50 );
        } else {
            bod.scroll({ top: 0,  behavior: 'smooth' })
            // bod.scrollTo( 0, 0 );
        }
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
            } else {
                bod.scTop = 0;
                bod.eventAt = false
            }
        }
    }


    useEffect( () => {
        const bod = document.querySelector("body");
        
        bod.addEventListener("scroll", noScroll);

        return () => bod.removeEventListener("scroll", noScroll)
    }, [ logIn ] )


    useEffect( () => {
        const bod = document.querySelector("body");

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
                <div className={`navigate-top`}>
                        <p>
                            <button type="button" className="navigate-top-btn" onClick={scrollCustomTo}>
                                Top
                            </button>
                        </p>
                </div>
            </div>
        </header>
    )
}

export default Headers;