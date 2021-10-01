import './AdminSide.css';
import DocumentList from '../../../wrappers/DocumentList';
import { FetchContext } from '../../UserMenu/UserMenu';
import { useContext } from 'react/cjs/react.development';

const AdminSide = ({user, id }) => {
    const { fetchUsers } = useContext(FetchContext);

    const activateUser = textPrompt => {
        window.confirm(`User ${user.username} ${textPrompt[1]} commence! You can close the admin window!`);
        fetch('http://127.0.0.1:5000/admin-activate', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                userid: user.userid
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
        window.confirm(`${txt} User ${user.username}!`);
        fetch(`http://127.0.0.1:5000/admin-delete-user/?id=${id}&userid=${user.userid}`, {
            method: 'DELETE',
            mode: 'cors'
        }).then(resp=>{
            if(resp.ok){
                fetchUsers();
            }else{
                window.alert(`Error deleting ${user.username}`);
            }
        })
    }

    const changeUserRole = role => {
        window.confirm(`User ${user.username} role will be changed to ${role}!`);
        fetch('http://127.0.0.1:5000/admin-role-change', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                userid: user.userid,
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

        return username === user.username ? true : window.alert('Wrong username entered!');
    }

    const activateHandler = e => {
        e.preventDefault();
        const textPrompt = user.activated ? ["deactivating", "deactivation"] : ["activating", "activation"];

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
        const conF = window.confirm(`Change role to ${user.role === 'admin' ? 'normal' : 'admin'}?`)

        if(conF){
            const newRole = user.role === 'admin' ? 'normal' : 'admin';
            adminCheck(changeUserRole, newRole)
        }
    }

    return(
        <div className="admin-menu">
            <h1>{`User: ${user.username}`}</h1>
            <p>
                <button type="button" onClick={activateHandler}>{user.activated ? "Deactivate" : "Activate"} this User</button>
            </p>
            {!user.activated && id === 0 ?
            <p>
                <button type="button" onClick={deleteHandler}>Delete {user.username}</button>
            </p>: 
            <div>
                <div>
                    <p>
                        Pinned Posts
                    </p>
                    <p>
                        <button>Add pin</button>
                    </p>
                </div>
                <ul>
                    <DocumentList handler={id=>console.log(id)} documentList={user.pinned_posts}/>
                </ul>
            </div>}
            {user.role ? 
            <p>
                <button type="button" onClick={roleHandler}>Change User role to {user.role === 'admin' ? 'Normal' : 'Admin'}</button>
            </p> : ""}
        </div>
    )
}

export default AdminSide;