document.querySelector('.submit_sign_up').addEventListener('click', saveUser);

function validTxt(userName) {
    let letters = /^[A-Za-z]+$/;
    if (userName.match(letters)) {
        return true;
    } else {
        return false;
    }
}

function ValidEmail(email) {
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(valid)) {
        return true;
    } else {
        return false;
    }
}

function validPassword(password) {
    var psw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
    if (password.match(psw)) {
        return true;
    } else {
        return false;
    }
}

function saveUser(e) {
    let userName = document.querySelector('#userName').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#psw').value;
    let pswValid = document.querySelector('#pswValid').value;

    let validUserName = validTxt(userName);
    let validationEmail = ValidEmail(email);
    let validSamePsw;

    if (password == pswValid) {
        validSamePsw = validPassword(password);
    } else {
        validSamePsw = false;
    }

    if (!validUserName || !validationEmail || !password || !pswValid) {
        alert('One or more of the entered data is incorrect');
    }
    else {
        if (!validSamePsw) {
            alert('The password is not same');
            e.preventDefault();
        }
        else {
            let item = JSON.parse(localStorage.getItem(email));
            if (item != null) {
                alert('This user is already exist');
            } else {
                const user = {
                    userName: userName,
                    email: email,
                    password: password,
                    userScore: []
                }

                localStorage.setItem(email, JSON.stringify(user));
                localStorage.setItem('thisUser', email);
                window.location = "../html/main.html";
            }
        }
        e.preventDefault();//when the user exist
    }
}

//link to log in
document.querySelector('.enter_log_in').addEventListener('click', logIn);

function logIn(e) {
    e.preventDefault();
    document.querySelector('.sign_up').classList.add('hidden');
    document.querySelector('.log_in').classList.remove('hidden');

}
document.querySelector(".submit_log_in").addEventListener('click', enterLogIn);

function enterLogIn(e) {
    e.preventDefault();
    let email = document.querySelector('#email_log_in').value;
    let password = document.querySelector('#password_log_in').value;

    let validationEmail = ValidEmail(email);
    let validPsw = validPassword(password);
    let item = JSON.parse(localStorage.getItem(email));
    if (item != null) {
        if (!validPsw || !validationEmail || item.password != password) {
            alert('One or more of the entered data is incorrect');
            e.preventDefault();
        } else {
            window.location = "../html/main.html";
            localStorage.setItem('thisUser', email);
        }
    }
    
    if (item == null) {
        if (!validPsw || !validationEmail) {
            alert('One or more of the entered data is incorrect');
            e.preventDefault();
        }
        else {
            alert('This user is not exist');
            e.preventDefault();
        }

    }


}

document.querySelector('.enter_sign_up').addEventListener('click', signUp);

function signUp(e) {
    e.preventDefault();
    document.querySelector("#email").value = "";
    document.querySelector("#psw").value = "";
    document.querySelector("#userName").value = "";
    document.querySelector('.sign_up').classList.remove('hidden');
    document.querySelector('.log_in').classList.add('hidden');

}