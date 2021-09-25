const AdminSide = ({user, fetchAdmin, id}) => {
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
                    fetchAdmin();
                }else{
                    window.alert(`Error ${textPrompt[0]} user!`);
                }
            })
        
    }

    const activateHandler = e => {
        e.preventDefault();
        const textPrompt = user.activated ? ["deactivating", "deactivation"] : ["activating", "activation"];
        const username = window.prompt(`Please Enter username of the user you are ${textPrompt[0]}`);

        if(username === user.username){
            const password = window.prompt("Please Enter your password");

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
                    activateUser(textPrompt);
                }else{
                    window.alert('Wrong password');
                }
            })
        }else{
            window.alert("Wrong username entered!");
        }
    }

    const roleHandler = e => {
        e.preventDefault();
        console.log(user.role);
    }

    return(
        <div className="admin-menu">
            <h1>Menu</h1>
            <p>
                <button type="button" onClick={activateHandler}>{user.activated ? "Deactivate" : "Activate"} this User</button>
            </p>
            {user.role ? <p>
                <button type="button" onClick={roleHandler}>Change this User's Role!</button>
            </p> : ""}
        </div>
    )
}

export default AdminSide;