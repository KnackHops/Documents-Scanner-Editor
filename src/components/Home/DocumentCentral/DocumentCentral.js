import { useState, useEffect } from 'react';
import DocumentPage from './DocumentPage';
import DocumentList from '../../../wrappers/DocumentList';

const DocumentCentral = () => {
    const [documentList, setDocumentList] = useState(null);

    const documentFetch = async () =>{
        fetch('http://127.0.0.1:5000/document/fetch',{
                method: 'GET',
                mode: 'cors'
            }).then(resp=>{
                if(resp.ok){
                    return resp.json()
                }else{
                    throw Error("error fetching!");
                }
            }).then(({documents})=>{
                setDocumentList({documents})
            }).catch(err=>{
                console.log(err);
            })
    }

    useEffect(()=>{
        documentFetch()
    }, [])

    const [document, setDocument] = useState(null);

    const documentHandler = id => {
        if(!id){
            setDocument(null);
        }else{
            documentList.forEach(doc => {
                if(doc.id===id){
                    setDocument({
                        id,
                        body: doc.document
                    })
                }
            });
        }
    }

    const saveDocument = doc => {
        if(doc){
            let title = window.prompt("Enter title here!");
            let data = {
                title,
                document: doc
            }

            fetch('http://127.0.0.1:5000/document/add', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(resp=>{
                if(resp.ok){
                    documentFetch();
                }else{
                    throw Error('Error adding data');
                }
            }).catch(err=>console.log(err))
        }else{
            console.log("empty!")
        }
    }

    return (
        <>
            {document ? <DocumentPage documentHandler={documentHandler} document={document ? document : ""} saveDocument={saveDocument}/> : <>
                <section className="central-container">
                <p className="btn-container">
                    <button onClick={()=>documentHandler(true)}>Add</button>
                </p>
                <ul className="document-list">
                    {documentList ? <DocumentList handler={documentHandler} documentList={documentList}/> : "Please wait!"}
                </ul> 
                </section></>}
        </>
    )
}

export default DocumentCentral;