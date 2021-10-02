import { useContext, useEffect } from "react/cjs/react.development";
import DocumentList from "../../wrappers/DocumentList";
import { DocumentContext, SideContext } from "../../wrappers/DocumentsScannerEditor";

const SidePopUp = () => {
    const {sideUser} = useContext(SideContext);
    const {documentFetch, sideDocuList, sendHandler} = useContext(DocumentContext);

    useEffect(()=>{
        if(sideUser){
            documentFetch(true);
        }
    }, [sideUser])

    const docuClicked = id => {
        sideDocuList.documents.forEach(docu => {
            if(docu.id == id){
                const con = window.confirm(`Are you sure you want to send Document: ${docu.title} to User: ${sideUser.username}?`);

                if(con){
                    sendHandler(sideUser.id, docu.id, docu.title);
                }
            }
        })
    }

    return (
        <>
            <DocumentList 
                documentList={sideDocuList}
                fromWhere={"profile-side"}
                handler={docuClicked}
            />
        </>
    )
}

export default SidePopUp;