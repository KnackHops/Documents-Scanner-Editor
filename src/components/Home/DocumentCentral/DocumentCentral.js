import { useState, useContext, useLayoutEffect } from 'react';
import DocumentPage from './DocumentPage';
import DocumentList from '../../../wrappers/DocumentList';
import AsideHome from './AsideHome';
import { DocumentContext, SideContext } from '../../../wrappers/DocumentsScannerEditor';
import { useEffect } from 'react/cjs/react.development';

const DocumentCentral = () => {
    const {documentList, documentFetch, setDocumentList} = useContext(DocumentContext);
    const {isAttached, setAttached} = useContext(SideContext);

    const windowWidth = () => {
        if(window.innerWidth >= 1050){
            setAttached(true)
        }else if(window.innerWidth <= 1049){
            setAttached(false)
        }
    }

    useLayoutEffect(()=>{
        windowWidth();
        window.addEventListener("resize", windowWidth);
        return ()=>window.removeEventListener("resize", windowWidth)
    }, [])

    const [document, setDocument] = useState(null);

    const documentFind = id => {
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

    const documentLoadHandler = id => {
        if(!id && id!==0){
            setDocument(null);
        }else{
            if(id===true){
                setDocument({
                    id: null,
                    body: ""
                })
            }else{
                documentFind(id);
            }
        }
    }

    useEffect(()=>{
        if(document?.id && !document?.body){
            documentFind(document.id);
        }
    }, [document])

    useEffect(()=>{
        if(document){
            documentFind(document.id);
        }
    }, [documentList])

    useEffect(()=>{
        return () => setDocumentList({documents: null})
    }, [])

    const documentChk = (text) => {
        const title = window.prompt(text);

        if(title && title.replace(/\s/g, '').length){
            return title;
        }else{
            window.alert("Title empty!");
            return null;
        }
    }

    const documentHandler = (id, doc) => {
        if(doc){
            let data = {
                document: doc
            }

            if(id || id===0){
                if(data.document === document.body){
                    window.alert("No change detected!");
                }else{
                    data.title = documentChk("Enter the title of the document you are editing!");
                    if(data.title){
                        data.id = id;
                        documentEdit(data);
                    }
                }
            }else{
                data.title = documentChk("Enter title here!");
                if(data.title){
                    documentSave(data);
                }
            }
        }else{
            console.log("empty!");
        }
    }

    const documentSave = data => {
        fetch('http://127.0.0.1:5000/document/add', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp=>{
            if(resp.ok){
                return resp.json();
            }else{
                throw Error('Error adding data');
            }
        }).then(({id})=>{
            setDocument({
                id,
                body: ""
            });
            documentFetch();
        }).catch(err=>console.log(err))
    }

    const documentEdit = data => {
        fetch('http://127.0.0.1:5000/document/edit', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp=>{
            if(resp.ok){
                return resp.json();
            }else{
                throw Error('Error updating data');
            }
        }).then(()=>{
            documentFetch();
        }).catch(err=>console.log(err))
    }

    return (
        <>
            {document ? <DocumentPage documentLoadHandler={documentLoadHandler} document={document} documentHandler={documentHandler} setDocument={setDocument}/> : <>
                <section className="central-container">
                    <p className="btn-container">
                        <button onClick={()=>documentLoadHandler(true)}>Add</button>
                    </p>
                    {documentList ? <DocumentList handler={documentLoadHandler} documentList={documentList} fromWhere={'document-central'}/> : "Please wait!"}
                </section></>}
                {!isAttached && !document && <AsideHome />}
        </>
    )
}

export default DocumentCentral;