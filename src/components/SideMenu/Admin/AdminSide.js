import './AdminSide.css';
import DocumentList from '../../../wrappers/DocumentList';
import { useContext, useEffect } from 'react/cjs/react.development';
import { DocumentContext, SideContext, UserContext } from '../../../wrappers/DocumentsScannerEditor';

const AdminSide = () => {
    const { fetchUsers, id } = useContext(UserContext);
    const { documentFetch, sideDocuList } = useContext(DocumentContext);
    const { sideUser } = useContext(SideContext);

    const activateUser = textPrompt => {
        window.confirm(`User ${sideUser.username} ${textPrompt[1]} commence! You can close the admin window!`);
        fetch('http://127.0.0.1:5000/admin-activate', {
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
        fetch(`http://127.0.0.1:5000/admin-delete-user/?id=${id}&userid=${sideUser.id}`, {
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
        fetch('http://127.0.0.1:5000/admin-role-change', {
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
            fetch('http://127.0.0.1:5000/admin-check',{
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

    useEffect(()=>{
        documentFetch(true, true);
    }, [sideUser])

    return(
        <div className="admin-menu">
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
                        <button>Add pin</button>
                    </p>
                    {sideDocuList?.documents ? 
                    <DocumentList 
                        documentList={sideDocuList} 
                        handler={()=>console.log("You clicked one!")}
                        fromWhere="admin-side-pinned"
                    /> : "None"}
                </div>
            </div>}
            {sideUser.role ? 
            <p>
                <button type="button" onClick={roleHandler}>Change User role to {sideUser.role === 'admin' ? 'Normal' : 'Admin'}</button>
            </p> : ""}
        </div>
    )
}

export default AdminSide;