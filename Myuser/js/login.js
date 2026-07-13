/* ==========================================
        LOGIN SYSTEM
========================================== */

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {

    // Page refresh rok do
    event.preventDefault();

    // Email lo
    const email = document.querySelector("#email").value.trim();

    // Password lo
    const password = document.querySelector("#password").value.trim();

    // Firebase Login
    auth.signInWithEmailAndPassword(email, password)

        .then((userCredential) => {

            // Login Success
            console.log("Login Successful");

            console.log(userCredential.user);

            // Dashboard par bhejo
            window.location.href = "dashboard.html";

        })

        .catch((error) => {

            console.log(error);

            alert(error.message);

        });

});