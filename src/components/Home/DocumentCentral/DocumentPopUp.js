import { useState } from "react";
import { useContext, useEffect } from "react/cjs/react.development";
import { DocumentContext, UserContext, useUsers } from "../../../wrappers/DocumentsScannerEditor";
import UserLists from "../../../wrappers/UserLists";

const DocumentPopUp = ({document}) => {
    const {id} = useContext(UserContext);
    const {sendHandler} = useContext(DocumentContext);
    const {fetchUsers, users} = useUsers(id, true);

    const [popUsers, setPopUsers] = useState(users);

    useEffect(()=>{
        fetchUsers(true);
    }, [id])

    const idFilterGet = id_filtered => {
        let _users = {
            sub_users: [],
            nonsub_users: []
        }

        users.sub_users.forEach(user=>{
            id_filtered.forEach(each_id =>{
                if(user.id == each_id.id){
                    _users.sub_users.push(user);
                }
            })
        })

        users.nonsub_users.forEach(user=>{
            id_filtered.forEach(each_id => {
                if(user.id == each_id.id){
                    _users.nonsub_users.push(user);
                }
            })
        })
        
        if(_users.sub_users.length == 0){
            _users.sub_users = null
        }
        if(_users.nonsub_users.length == 0){
            _users.nonsub_users = null
        }

        setPopUsers(_users);
    }

    useEffect(()=>{
        if(users && users?.sub_users){
            let id_lists = [];

            users.sub_users.forEach(user=>{
                id_lists.push({id: user.id});
            })
            users.nonsub_users.forEach(user=>{
                id_lists.push({id: user.id});
            })

            fetch(`http://127.0.0.1:5000/send-user-fetch`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    docid: document.id,
                    id_lists
                })
            }).then(resp=>{
                if(resp.ok){
                    return resp.json();
                }else{
                    window.alert("Error fetching users");
                }
            }).then(({id_filtered})=>{
                idFilterGet(id_filtered);
            })
        }
    }, [users])

    const sendBtnHandler = async e => {
        e.preventDefault();
        const username = e.target.innerHTML;
        const con = window.confirm(`Are you sure you want to send Document: "${document.title}" to User: "${username}"?`);

        if(con){
            const userid = Number(e.target.getAttribute('data-id'));
            const docid = document.id;
            const doctitle = document.title;

            await sendHandler(username, userid, docid, doctitle, true);
            fetchUsers(true)
        }
    }
    
    return (
        <>
            <h1>User subordinates</h1>
            <UserLists users={popUsers?.sub_users} fromWhere={'document-pop'} handler={sendBtnHandler} />
            <h1>Non subordinates</h1>
            <UserLists users={popUsers?.nonsub_users} fromWhere={'document-pop'} handler={sendBtnHandler}/>
        </>
    )
}

export default DocumentPopUp;