import {
    useContext, 
    useEffect 
} from 'react';
import './DocumentCentral.css';
import DocumentPage from './DocumentPage';
import DocumentList from '../../../wrappers/DocumentList';
import AsideHome from './AsideHome';
import { 
    DocumentContext, 
    MenuContext, 
    SideContext, 
    UserContext 
} from '../../../wrappers/DocumentsScannerEditor';
import useDocuments from '../../../hooks/useDocuments';
import QRSavedPopUp from './QRSavedPopUp';
import {
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from 'react-router-dom';

const DocumentCentral = ( { socket } ) => {
    socket.on("got_sent", data => {
        if ( !main_document ) {
            documentFetch();
        }
    })

    const { isAttached } = useContext( SideContext );
    const { id } = useContext( UserContext );

    const { documentList, documentFetch } = useDocuments( id )
    const { main_document, setDocument, documentFind } = useContext( DocumentContext );

    const documentLoadHandler = id => {
        if ( !id && id !== 0 ) {
            setDocument( null );
        } else {
            if ( id === true ) {
                setDocument({
                    id: null,
                    body: ""
                })
            }else{
                documentFind( id, documentList );
            }
        }
    }

    useEffect( () => {
        if( main_document && documentList?.documents ) {
            documentFind( main_document.id, documentList );
        }
    }, [ documentList ] )
    
    useEffect( () => {
        if ( main_document?.id && !main_document?.body ) {
            documentFind( main_document.id, documentList );
        }
    }, [ main_document ] )

    const documentChk = ( text ) => {
        const title = window.prompt( text );

        if ( title && title.replace(/\s/g, '').length ) {
            return title;
        } else {
            window.alert("Title empty!");
            return null;
        }
    }

    const documentHandler = ( id, doc ) => {
        if ( doc ) {
            let data = {
                document: doc
            }

            if ( id || id === 0 ) {
                if ( data.document === main_document.body ) {
                    window.alert("No change detected!");
                } else {
                    data.title = documentChk("Enter the title of the document you are editing!");
                    if ( data.title ) {
                        data.id = id;
                        documentEdit( data );
                    }
                }
            } else {
                data.title = documentChk("Enter title here!");
                if ( data.title ) {
                    documentSave( data );
                }
            }
        } else {
            console.log("empty!");
        }
    }

    const { popUpHandler } = useContext(MenuContext);

    const documentSave = data => {
        fetch('http://127.0.0.1:5000/document/add', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( resp => {
            if(resp.ok){
                return resp.json();
            }else{
                throw resp
            }
        })
        .then(( { id, qr_code } )=>{

            setDocument({
                id,
                body: ""
            });

            documentFetch();
            popUpHandler(true, "qr-saved", <QRSavedPopUp qr_image={qr_code}/>)
        })
        .catch( err => {
            err.json()
            .then( ( { error } ) => {
                window.alert(error)
            })
        })
    }

    const documentEdit = data => {
        fetch('http://127.0.0.1:5000/document/edit', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( resp => {
            if ( resp.ok ) {
                return resp.json();
            } else {
                throw resp;
            }
        })
        .then( () => {
            documentFetch();
        })
        .catch( err => {
            err.json()
            .then( ( { error } ) => {
                window.alert(error)
            })
        })
    }
    
    const match = useRouteMatch();

    return (
        <div className="fd universal-container">
            {
                main_document ? 
                    <Redirect to={`${match.path}/document-page/doc-${main_document.id || main_document.id == 0 ? `${main_document.id}+title-${main_document.title}` : "new-doc"}`} /> 
                    :
                    <Redirect to={`${match.path}/`} />
            }
            <Switch>
                <Route exact path={`${match.path}/`}>
                    <Redirect to={`${match.path}/document-list`} />
                </Route>

                <Route path={`${match.path}/document-list`}>

                    <section className="central-container">
                    <p className="btn-container">
                        <button onClick={()=>documentLoadHandler(true)}>Add</button>
                    </p>
                        {   documentList ? 
                        <DocumentList 
                            handler={documentLoadHandler} 
                            documentList={documentList} 
                            fromWhere={'document-central'}/> 
                        : "Please wait!"}
                    </section>

                </Route>

                <Route path={`${match.path}/document-page/`}>

                    {
                        main_document ? 
                        <DocumentPage 
                                documentLoadHandler={documentLoadHandler}
                                main_document={main_document} documentHandler={documentHandler}
                                setDocument={setDocument} documentFetch={documentFetch}
                            /> : <Redirect to={`${match.path}/`} />
                    }
                    
                </Route>
            </Switch>
                {!isAttached && !main_document && <AsideHome />}
        </div>
    )
}

export default DocumentCentral;