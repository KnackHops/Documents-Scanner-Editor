const DocumentList = ({handler, documentList, fromWhere}) => {
    return (
        <div className={`${fromWhere} document-list-container`}>
            <ul className={`${fromWhere} document-list`}>
                {documentList['documents'] ? documentList['documents'].map(doc=>
                <li key={doc.id} id={`doc${doc.id}`} onClick={()=>handler(doc.id)}>
                    {doc.title}
                </li>) : "Empty!"}
            </ul>
        </div>
    )
}

export default DocumentList;