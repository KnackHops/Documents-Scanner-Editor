const DocumentList = ({documentHandler}) => {
    return (
        <h1 onClick={()=>documentHandler(1)}>has</h1>
    )
}

export default DocumentList;