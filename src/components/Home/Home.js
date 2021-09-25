import './Home-style.css'
import DocumentCentral from './DocumentCentral/DocumentCentral';
import LandingPage from "./LandingPage/LandingPage";

const Home = ({logIn, logInHandle}) => {
    const classForArticle = logIn ? "homepage-container" : "landingpage-container";

    const loginUser = _user => {
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_user)
        }).then(resp=>{
            if(resp.ok){
                return resp.json();
            }else{
                throw Error('error registering');
            }
        }).then(data=>{
            if('id' in data){
                logInHandle(data);
            }else{
                window.alert('Your account is not yet activated!')
            }
        }).catch(err=>window.alert(err))
    }

    const registerUser = _user => {
        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_user)
        }).then(resp=>{
            if(resp.ok){
                window.confirm('User registered!');
            }else{
                throw Error('error registering');
            }
        }).catch(err=>window.alert(err))
    }

    return (
        <article className={`fd ${classForArticle}`}>
            {logIn ? <DocumentCentral /> : <LandingPage loginUser={loginUser} registerUser={registerUser}/>}
        </article>
    )
}

export default Home;