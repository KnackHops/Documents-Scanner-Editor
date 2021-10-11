import { useState, useEffect, useCallback } from "react";

const useUsers = (id, sub_fetch=false) => {
    const [users, setUsers] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    const fetchUsers = useCallback(() => {
        const link = sub_fetch ? "subordinate-fetch" : "admin-fetch";
        fetch(`https://document-editor-09.herokuapp.com/${link}/?id=${id}`, {
            method: 'GET',
            mode: 'cors'
        }).then(resp=>{
            if(resp.ok){
                return resp.json();
            }else{
                setUsers(null);
                setLoaded(false);
            }
        }).then(({fetched_users: _users})=>{
            sub_fetch ?
                setUsers(usersGet(_users)) :
                setUsers(_users);
            setLoaded(true);
        })
    }, [id, sub_fetch])

    const usersGet = (_users) =>{
        if(!_users){
            return null
        }

        let sub_users = []
        let nonsub_users = []

        _users.forEach(user => {
            if(user.isSubordinate){
                sub_users.push(user)
            }
            if(!user.isSubordinate){
                nonsub_users.push(user)
            }
        });

        if(sub_users.length > 0 || nonsub_users.length > 0){
            return ({
                sub_users,
                nonsub_users
            });
        }else{
            return ({
                sub_users: null,
                nonsub_users: null
            })
        }
    }
    
    useEffect(()=>{
        fetchUsers();
    }, [id, fetchUsers])

    const clearUsers = () => {
        setUsers(null);
        setLoaded(false);
    }

    return {users, isLoaded, fetchUsers, clearUsers};
}

export default useUsers;