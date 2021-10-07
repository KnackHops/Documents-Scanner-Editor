import { useCallback } from "react";
import { useState, useEffect } from "react";

const useDocuments = (id, load=true) => {
    const [documentList, setDocumentList] = useState({documents: null});

    const documentFetch = useCallback( ( sideDoc = false, pinOr = false ) =>{
        let which_get = sideDoc ? ( pinOr ? "pinned" : "nonpinned" ) : 'default';

        fetch(`http://127.0.0.1:5000/document/fetch/?id=${id}&which_get=${which_get}`,{
            method: 'GET',
            mode: 'cors'
        }).then(resp=>{
            if(resp.ok){
                return resp.json()
            }else{
                throw Error("error fetching!");
            }
        }).then(({_documents})=>{
            setDocumentList({documents: _documents});
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