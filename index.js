(() => {
    'use strict';

    let apiToken = "";

    let showLogin = true;
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');

    const signupUsernameInput = document.getElementById('signup-username-input');
    const signupEmailInput = document.getElementById('signup-email-input');
    const signupPasswordInput = document.getElementById('signup-password-input');
    const signupAgeInput = document.getElementById('signup-age-input');

    const loginEmailInput = document.getElementById('login-email-input');
    const loginPasswordInput = document.getElementById('login-password-input');

    loginBtn.addEventListener('click', e => {
        login(
            e,
            loginEmailInput.value,
            loginPasswordInput.value,
        );
    });

    signupBtn.addEventListener('click', e => {
        signup(
            e,
            signupUsernameInput.value,
            signupEmailInput.value,
            signupPasswordInput.value,
            signupAgeInput.value,
        );
    });

    const toggleFormsBtns = document.getElementsByClassName("toggle-forms");
    for (let i = 0; i < toggleFormsBtns.length; i++) {
        toggleFormsBtns[i].addEventListener('click', toggleDisplayForm);
    }

    function toggleDisplayForm() {
        showLogin = !showLogin;
        if (showLogin) {
            loginForm.style.display = "block";
            signupForm.style.display = "none";
        } else {
            loginForm.style.display = "none";
            signupForm.style.display = "block";
        }
    }



    function signup(e, username, email, password, age) {
        e.preventDefault();
        fetch('http://localhost:1337/api/auth/local/register', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                age: age
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                window.sessionStorage.strapitestbruno2404 = result.jwt;
            })
            .catch(error => {
                console.log("Une erreur est survenue : ", error);
            });
    }

    function login(e, email, password) {
        e.preventDefault();

        fetch('http://localhost:1337/api/auth/local', {
            method: "POST",
            body: JSON.stringify({
                identifier: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result.jwt);
                window.sessionStorage.strapitestbruno2404 = result.jwt;
            })
            .catch(error => {
                console.log("Une erreur est survenue : ", error);
            });

    }

    signupForm.style.display = "none";
})();