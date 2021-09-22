import { useState, useEffect } from 'react';
import DocumentPage from '../DocumentPage/DocumentPage';
import DocumentList from './DocumentList';

const DocumentCentral = () => {
    const [documentID, setDocumentID] = useState(null);

    const documentHandler = id => {
        setDocumentID(id);
    }

    return (
        <>
            {documentID ? <DocumentPage documentHandler={documentHandler}/> : <>
                <section className="central-container">
                <p className="btn-container">
                    <button>Add</button>
                </p>
                <ul className="document-list">
                    <DocumentList documentHandler={documentHandler}/>
                </ul> 
                </section></>}
        </>
    )
}

export default DocumentCentral;