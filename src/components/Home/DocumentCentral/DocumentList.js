const DocumentList = ({documentHandler, documentList}) => {
    return (
        <> 
            {documentList['documents'] ? documentList['documents'].map(doc=><li key={doc.id} id={`doc${doc.id}`} onClick={()=>documentHandler(doc.document)}>{doc.title}</li>) : "Empty!"}
        </>
    )
}

export default DocumentList;