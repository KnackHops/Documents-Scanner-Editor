import { useContext, useEffect } from "react/cjs/react.development";
import { DocumentContext, UserContext } from "../../../wrappers/DocumentsScannerEditor";
import UserLists from "../../../wrappers/UserLists";

const DocumentPopUp = ({document}) => {
    const {fetchUsers, id, users} = useContext(UserContext);
    const {sendHandler} = useContext(DocumentContext);

    useEffect(()=>{
        fetchUsers(true);
    }, [id])

    const sendBtnHandler = e =>{
        e.preventDefault();

        const con = window.confirm(`Are you sure you want to send Document: "${document.title}" to User: "${e.target.innerHTML}"?`);

        if(con){
            const userid = Number(e.target.getAttribute('data-id'));
            const docid = document.id;
            const doctitle = document.title;

            sendHandler(userid, docid, doctitle);
        }
    }
    
    return (
        <>
            <h1>User subordinates</h1>
            <UserLists users={users?.sub_users} fromWhere={'document-pop'} handler={sendBtnHandler} />
            <h1>Non subordinates</h1>
            <UserLists users={users?.nonsub_users} fromWhere={'document-pop'} handler={sendBtnHandler}/>
        </>
    )
}

export default DocumentPopUp;