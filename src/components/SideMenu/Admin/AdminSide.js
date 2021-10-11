import './AdminSide.css';
import DocumentList from '../../../wrappers/DocumentList';
import { useContext, useEffect } from 'react';
import { DocumentContext, MenuContext, SideContext, UserContext } from '../../../wrappers/DocumentsScannerEditor';
import SidePopUp from '../SidePopUp';
import useDocuments from '../../../hooks/useDocuments';

const AdminSide = ({fetchUsers}) => {
    const { id } = useContext(UserContext);
    const { sideUser } = useContext(SideContext);

    const activateUser = textPrompt => {
        window.confirm(`User ${sideUser.username} ${textPrompt[1]} commence! You can close the admin window!`);
        fetch('https://document-editor-09.herokuapp.com/admin-activate', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                userid: sideUser.id
            })
        }).then(resp=>{
            if(resp.ok){
                fetchUsers();
            }else{
                window.alert(`Error ${textPrompt[0]} user!`);
            }
        })
        
    }

    const deleteUser = txt => {
        window.confirm(`${txt} User ${sideUser.username}!`);
        fetch(`https://document-editor-09.herokuapp.com/admin-delete-user/?id=${id}&userid=${sideUser.id}`, {
            method: 'DELETE',
            mode: 'cors'
        }).then(resp=>{
            if(resp.ok){
                fetchUsers();
            }else{
                window.alert(`Error deleting ${sideUser.username}`);
            }
        })
    }

    const changeUserRole = role => {
        window.confirm(`User ${sideUser.username} role will be changed to ${role}!`);
        fetch('https://document-editor-09.herokuapp.com/admin-role-change', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                userid: sideUser.id,
                role
            })
        }).then(resp=>{
            if(resp.ok){
                fetchUsers();
            }else{
                window.alert(`Error changing role!`);
            }
        })
    }

    const adminCheck = (func, data) => {
        // for activate
        // activateUser
        // data is for the textPrompt (activate/deactivate/activating/deactivating) array

        // for role
        // changeUserRole
        // data is the role changed (admin || normal)

        // for delete
        // deleteUser
        // data is text (txt)
        const password = window.prompt("Please Enter your password");

        if(password){
            fetch('https://document-editor-09.herokuapp.com/admin-check',{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    password
                })
            })
            .then(resp=>{
                if(resp.ok){
                    func(data);
                }else{
                    window.alert('Wrong password');
                }
            })
        }else{
            window.alert('Password Empty');
        }
    }

    const usernameCheck = text => {
        const username = window.prompt(`Please Enter username of the user you are ${text}`);

        return username === sideUser.username ? true : window.alert('Wrong username entered!');
    }

    const activateHandler = e => {
        e.preventDefault();
        const textPrompt = sideUser.activated ? ["deactivating", "deactivation"] : ["activating", "activation"];

        if(usernameCheck(textPrompt[0])){
            adminCheck(activateUser, textPrompt);
        }
    }

    const deleteHandler = e =>{
        e.preventDefault();
        const txt = "Deleting";

        if(usernameCheck(txt)){
            adminCheck(deleteUser, txt);
        }
    }

    const roleHandler = e => {
        e.preventDefault();
        const conF = window.confirm(`Change role to ${sideUser.role === 'admin' ? 'normal' : 'admin'}?`)

        if(conF){
            const newRole = sideUser.role === 'admin' ? 'normal' : 'admin';
            adminCheck(changeUserRole, newRole)
        }
    }

    const {documentFetch, documentList} = useDocuments(sideUser.id, false);
    const {unpinHandler} = useContext(DocumentContext);

    useEffect(()=>{
        documentFetch(true, true);
    }, [sideUser])

    const docuClicked = async docid => {
        const con = window.confirm("Are you sure you want to unpin this document?");

        if(con){
            await unpinHandler(sideUser.id, docid);
            documentFetch(true, true);
        }
    }

    const { popUpHandler } = useContext(MenuContext);

    return(
        <>
            <h1>{`User: ${sideUser.username}`}</h1>
            <p>
                <button type="button" onClick={activateHandler}>{sideUser.activated ? "Deactivate" : "Activate"} this User</button>
            </p>
            {!sideUser.activated && id === 0 ?
            <p>
                <button type="button" onClick={deleteHandler}>Delete {sideUser.username}</button>
            </p>: 
            <div>
                <div>
                    <p>
                        Pinned Posts
                    </p>
                    <p>
                        <button onClick={()=>{
                            popUpHandler(true, 'admin-side', <SidePopUp />)
                        }}>Add pin</button>
                    </p>
                    {documentList?.documents ? 
                    <DocumentList 
                        documentList={documentList} 
                        handler={docuClicked}
                        fromWhere="admin-side-pinned"
                    /> : "None"}
                </div>
            </div>}
            {sideUser.role ? 
            <p>
                <button type="button" onClick={roleHandler}>Change User role to {sideUser.role === 'admin' ? 'Normal' : 'Admin'}</button>
            </p> : ""}
        </>
    )
}

export default AdminSide;