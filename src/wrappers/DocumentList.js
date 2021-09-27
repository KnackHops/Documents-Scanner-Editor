const DocumentList = ({handler, documentList}) => {
    return (
        <> 
            {documentList['documents'] ? documentList['documents'].map(doc=><li key={doc.id} id={`doc${doc.id}`} onClick={()=>handler(doc.id)}>{doc.title}</li>) : "Empty!"}
        </>
    )
}

export default DocumentList;