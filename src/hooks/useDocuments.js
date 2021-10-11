import { useCallback, useState, useEffect } from "react";

const useDocuments = (id, load=true) => {
    const [documentList, setDocumentList] = useState({documents: null});

    const documentFetch = useCallback( ( sideDoc = false, pinOr = false ) =>{
        let which_get = sideDoc ? ( pinOr ? "pinned" : "nonpinned" ) : 'default';

        fetch(`https://document-editor-09.herokuapp.com/document/fetch/?id=${id}&which_get=${which_get}`,{
            method: 'GET',
            mode: 'cors'
        }).then(resp=>{
            if(resp.ok){
                return resp.json()
            }else{
                throw Error("error fetching!");
            }
        }).then(({_documents})=>{
            let documents = _documents.filter(doc => doc.pinned)
            let unpinned = _documents.filter(doc => !doc.pinned)

            documents = documents ? documents : [];
            unpinned = unpinned ? unpinned : [];

            documents = documents.concat(unpinned)

            setDocumentList({documents});
        }).catch(err=>{
            console.log(err);
        })
    }, [id])

    useEffect( () => {
        if ( ( id || id === 0 ) && load ) {
            documentFetch();
        }
    }, [id, documentFetch, load])

    return {documentList, documentFetch, setDocumentList};
}

export default useDocuments;