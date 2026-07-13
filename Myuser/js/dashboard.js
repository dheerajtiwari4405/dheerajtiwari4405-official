/* ==========================================
        DASHBOARD SECURITY
========================================== */

/*
Firebase Authentication Listener

Ye function automatically chalta hai jab
login status change hota hai.
*/

auth.onAuthStateChanged((user) => {

    /*
    Agar user login hai
    */

    if (user) {

        console.log("Welcome", user.email);

    }

    /*
    Agar login nahi hai
    */

    else {

        /*
        Login Page par bhej do
        */

        window.location.href = "login.html";

    }

});


/* ==========================================
        LOGOUT SYSTEM
========================================== */

/*
Logout Button Select
*/

const logoutButton = document.querySelector("#logout-btn");

/*
Welcome Text
*/

const welcomeText = document.querySelector("#welcome-text");

/*
Login Status Check
*/

auth.onAuthStateChanged((user)=>{

    if(user){

        /*
        User Email Show
        */

        welcomeText.textContent = `Welcome ${user.email}`;

    }

    else{

        /*
        Login Page
        */

        window.location.href="login.html";

    }

});

/*
Logout Click
*/

logoutButton.addEventListener("click",()=>{

    /*
    Firebase Logout
    */

    auth.signOut()

    .then(()=>{

        /*
        Success
        */

        window.location.href="login.html";

    })

    .catch((error)=>{

        console.log(error);

    });

});