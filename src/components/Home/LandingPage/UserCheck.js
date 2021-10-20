const mobileCheck = mobile => {
    let mobilechk = true;
    let error = 'Mobile Number has invalid characters!';

    if ( mobile.length >= 11 && mobile.length <= 13 ) {
        if ( !isNaN(mobile) ) {
            if ( mobile.includes('E') || mobile.includes('e') ) {
                mobilechk = false;
            } else {
                if ( mobile.slice(0,2) === '09' || mobile.slice(0,3) === '639' ) {
                    let errVar = [null, null];
                    if ( mobile.slice(0,2) === '09' && mobile.length !== 11 ) {
                        mobilechk = false;
                        errVar = ["09", "11"];
                    }
                    if ( mobile.slice(0,3) === '639' && mobile.length !== 13 ) {
                        mobilechk = false;
                        errVar = ["63 9", "13"];
                    }
                    if ( !mobilechk ) {
                        error = `Mobile number must be valid. Mobile number starting with ${errVar[0]} must be ${errVar[1]} characters`;
                    }
                } else {
                    mobilechk = false;
                    error = 'Mobile number must start with 09 and 639'
                }
            }
        }else{
            mobilechk = false;
        }
    }else{
        mobilechk = false;
        error = 'Mobile number must be 11 to 13 long'
    }

    return [mobilechk, error];
}

const passCheck = (password, whichOpen) => {
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let passchk = false;
    let error = '';
    let upper = 0, lower = 0;

    if(password.length < 5){
        error = 'Password needs to be 5 characters or more'
    }else{
        if(whichOpen === 'register'){
            if(format.test(password)){
                [...password].forEach(lett=>{
                    if(lett.toLowerCase() !== lett.toUpperCase()){
                        if(lett.toUpperCase() === lett){
                            upper+=1;
                        }
                        if(lett.toLowerCase() === lett){
                            lower+=1;
                        }
                    }
                })
    
                if(upper === 0){
                    error = 'Password needs to have at least one uppercase character';
                }else if(lower === 0){
                    error = 'Password needs to have at least one lowercase character';
                }else{
                    passchk = true;
                }
            }else{
                error = 'Password needs to have at least one special character';
            }
        }else{
            passchk = true;
        }
    }

    return[passchk, error];
}

const emailCheck = (email) => {
    return /^\S+@\S+\.\S+$/.test(email)
}

const userCheck = ({username, password, mobile, email}, whichOpen) => {
    let returnVar = true;

    if(username){
        if(password){
            if(whichOpen === 'register'){
                if(!mobile){
                    window.alert('Mobile Number is empty!');
                    returnVar = false;
                }
                if(!email){
                    window.alert('Email is empty!');
                    returnVar = false;
                }
                if(!emailCheck(email)){
                    window.alert('Please provide a proper email');
                    returnVar = false;
                }
            }
            if(returnVar){
                if(username.length < 5){
                    window.alert('Username needs to be 5 characters or longer');
                    returnVar = false;
                }else{
                    const [passchk, pass_error] = passCheck(password, whichOpen);
                    const [mobilechk, mobile_error] = mobileCheck(mobile);

                    if(passchk){
                        if(!mobilechk && whichOpen === 'register'){
                            window.alert(mobile_error);
                            returnVar = mobilechk;
                        }
                    }else{
                        window.alert(pass_error);
                        returnVar = passchk;
                    }
                }
            }
        }else{
            window.alert(`Password is empty!`);
            returnVar = false;
        }
    }else{
        window.alert(`Username is empty!`);
        returnVar = false;
    }

    return returnVar;
}

export { userCheck, mobileCheck, emailCheck };