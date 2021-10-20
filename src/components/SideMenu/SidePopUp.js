import { useContext, useEffect } from "react";
import useDocuments from "../../hooks/useDocuments";
import DocumentList from "../../wrappers/DocumentList";
import { DocumentContext, SideContext } from "../../wrappers/DocumentsScannerEditor";

const SidePopUp = () => {
    const { sideUser } = useContext(SideContext);
    const { pinHandler } = useContext(DocumentContext);
    const { documentList, documentFetch, setDocumentList } = useDocuments( sideUser.id, false );

    useEffect( () => {
        if ( sideUser ) {
            documentFetch(true);
        }

        return () =>{
            if ( sideUser?.sideClass === "admin-side" ) {
                documentFetch(true, true);
            } else {
                setDocumentList({documents: null});
            }
        };

    }, [sideUser])

    const docuClicked = id => {
        documentList.documents.forEach(docu => {
            if(docu.id == id){
                const con = window.confirm(`Are you sure you want to send Document: ${docu.title} to User: ${sideUser.username}?`);

                if(con){
                    pinHandler(sideUser.username, sideUser.id, docu.id, docu.title).then(()=>{
                        documentFetch(true)
                    })
                }
            }
        })
    }

    return (
        <>
            <DocumentList 
                documentList={documentList}
                fromWhere={"profile-side"}
                handler={docuClicked}
            />
        </>
    )
}

export default SidePopUp;