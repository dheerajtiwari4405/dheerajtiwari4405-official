/* =====================================================
            LOGIN PAGE JAVASCRIPT
===================================================== */

/*
=======================================================
            DOM ELEMENTS SELECT
=======================================================

Yahan hum HTML ke elements ko JavaScript me la rahe hain.

Agar element select nahi karenge to us par
JavaScript se koi kaam nahi kar sakte.
*/

const loginForm = document.querySelector("#login-form");

const emailInput = document.querySelector("#email");

const passwordInput = document.querySelector("#password");

const togglePassword = document.querySelector("#toggle-password");

const loginButton = document.querySelector("#login-btn");

const loginMessage = document.querySelector("#login-message");


/*
=======================================================
            THEME BUTTON CREATE
=======================================================

HTML me button nahi banaya.

JavaScript se dynamically create karenge.

Ye professional approach hai.
*/

const themeButton = document.createElement("button");


/*
Button ke andar moon emoji.
*/

themeButton.innerHTML = "🌙";


/*
CSS wali class.
*/

themeButton.classList.add("theme-toggle");


/*
Body ke end me add kar do.
*/

document.body.appendChild(themeButton);



/*
=======================================================
            SHOW / HIDE PASSWORD
=======================================================

Ye variable batayega password dikh raha hai
ya hidden hai.
*/

let passwordVisible = false;


/*
Eye Button Click
*/

togglePassword.addEventListener("click",()=>{

    /*
    Agar password hidden hai
    */

    if(passwordVisible===false){

        /*
        Password Show
        */

        passwordInput.type="text";

        /*
        Eye Change
        */

        togglePassword.innerHTML="🙈";

        /*
        Status Update
        */

        passwordVisible=true;

    }

    /*
    Password already visible hai
    */

    else{

        /*
        Dobara hidden
        */

        passwordInput.type="password";

        /*
        Eye Icon
        */

        togglePassword.innerHTML="👁";

        /*
        Status Update
        */

        passwordVisible=false;

    }

});



/*
=======================================================
            LOAD SAVED THEME
=======================================================

Browser ke LocalStorage se theme read karo.

Agar user ne pehle Dark Mode select kiya tha
to refresh ke baad bhi Dark Mode hi rahe.
*/

const savedTheme=localStorage.getItem("theme");


/*
Agar Dark Theme mili
*/

if(savedTheme==="dark"){

    /*
    Body me dark class add
    */

    document.body.classList.add("dark");

    /*
    Button icon
    */

    themeButton.innerHTML="☀";

}



/*
=======================================================
            THEME TOGGLE
=======================================================
*/

themeButton.addEventListener("click",()=>{

    /*
    Dark Class Add/Remove
    */

    document.body.classList.toggle("dark");

    /*
    Check karo Dark Mode hai ya nahi
    */

    if(document.body.classList.contains("dark")){

        /*
        Save Theme
        */

        localStorage.setItem("theme","dark");

        /*
        Button Icon
        */

        themeButton.innerHTML="☀";

    }

    else{

        /*
        Save Theme
        */

        localStorage.setItem("theme","light");

        /*
        Button Icon
        */

        themeButton.innerHTML="🌙";

    }

});



/* =====================================================
            LOGIN FORM SUBMIT
=====================================================

Jab user Login button dabayega tab
ye event chalega.
*/

loginForm.addEventListener("submit",(event)=>{

    /*
    Form submit hone ke baad page refresh mat karo.
    */

    event.preventDefault();


    /*
    ==========================================
            INPUT VALUES
    ==========================================
    */

    const email=emailInput.value.trim();

    const password=passwordInput.value.trim();


    /*
    Purana Message Remove
    */

    loginMessage.innerHTML="";

    loginMessage.className="";


    /*
    ==========================================
            EMAIL VALIDATION
    ==========================================
    */

    if(email===""){

        loginMessage.innerHTML="❌ Email is required.";

        loginMessage.classList.add("error");

        emailInput.focus();

        return;

    }


    /*
    ==========================================
            PASSWORD VALIDATION
    ==========================================
    */

    if(password===""){

        loginMessage.innerHTML="❌ Password is required.";

        loginMessage.classList.add("error");

        passwordInput.focus();

        return;

    }


    /*
    Password kam se kam 6 character ka hona chahiye.
    */

    if(password.length<6){

        loginMessage.innerHTML="❌ Password must be at least 6 characters.";

        loginMessage.classList.add("error");

        passwordInput.focus();

        return;

    }


    /*
    ==========================================
            LOGIN BUTTON LOADING
    ==========================================
    */

    loginButton.disabled=true;

    loginButton.innerHTML="Logging in...";


    /*
    ==========================================
            FIREBASE LOGIN
    ==========================================

    Email aur Password Firebase ko bhejo.

    Agar user mil gaya to login.

    Agar nahi mila to error.
    */

    auth.signInWithEmailAndPassword(email,password)


    /*
    ==========================================
            LOGIN SUCCESS
    ==========================================
    */

    .then((userCredential)=>{

        /*
        Login Success Message
        */

        loginMessage.innerHTML="✅ Login Successful";

        loginMessage.classList.add("success");


        /*
        Console Test
        */

        console.log(userCredential.user);


        /*
        1 Second baad Dashboard
        */

        setTimeout(()=>{

            window.location.href="dashboard.html";

        },1000);

    })


    /*
    ==========================================
            LOGIN FAILED
    ==========================================
    */

    .catch((error)=>{

        /*
        Error Console
        */

        console.log(error);


        /*
        Firebase Error Message
        */

        loginMessage.innerHTML=error.message;

        loginMessage.classList.add("error");


        /*
        Button Reset
        */

        loginButton.disabled=false;

        loginButton.innerHTML="Login";

    });

});
/* =====================================================
        ALREADY LOGIN CHECK
=====================================================

Ye function automatically check karega
ki user pehle se login hai ya nahi.

Agar login hai to login page dikhane ki
zarurat hi nahi hai.

Seedha Dashboard open kar do.
*/

auth.onAuthStateChanged((user)=>{

    /*
    Agar user login hai
    */

    if(user){

        /*
        Console Message
        */

        console.log("Already Logged In");

        /*
        Dashboard Open
        */

        window.location.href="dashboard.html";

    }

});



/* =====================================================
        AUTO FOCUS
=====================================================

Page load hote hi cursor Email Input me aa jayega.

Professional websites me ye feature hota hai.
*/

window.addEventListener("load",()=>{

    emailInput.focus();

});



/* =====================================================
        ENTER KEY SUPPORT
=====================================================

User Enter press kare tab bhi Login ho.

Ye normal HTML Form bhi karta hai,
lekin hum JavaScript se bhi samajh rahe hain.
*/

document.addEventListener("keydown",(event)=>{

    /*
    Agar Enter Key hai
    */

    if(event.key==="Enter"){

        /*
        Login Button Click
        */

        loginButton.click();

    }

});



/* =====================================================
        FIREBASE ERROR HANDLING
=====================================================

Firebase ke bade bade error ko
simple language me convert karenge.
*/

function showFirebaseError(errorCode){

    switch(errorCode){

        /*
        Wrong Password
        */

        case "auth/wrong-password":

            return "❌ Wrong Password";



        /*
        User Not Found
        */

        case "auth/user-not-found":

            return "❌ User Not Found";



        /*
        Invalid Email
        */

        case "auth/invalid-email":

            return "❌ Invalid Email Address";



        /*
        Too Many Requests
        */

        case "auth/too-many-requests":

            return "❌ Too Many Attempts. Try Again Later.";



        /*
        Network Error
        */

        case "auth/network-request-failed":

            return "❌ Internet Connection Problem";



        /*
        Default Error
        */

        default:

            return "❌ Login Failed";

    }

}



/* =====================================================
        MESSAGE FUNCTION
=====================================================

Ek hi function se Success aur Error
dono Message Show karenge.

Code Repeat nahi hoga.
*/

function showMessage(message,type){

    /*
    Message Text
    */

    loginMessage.innerHTML=message;

    /*
    Purani Class Remove
    */

    loginMessage.classList.remove("success","error");

    /*
    Nayi Class Add
    */

    loginMessage.classList.add(type);

}



/* =====================================================
        BUTTON RESET
=====================================================

Login Complete hone ke baad
Button ko normal kar do.
*/

function resetButton(){

    /*
    Button Enable
    */

    loginButton.disabled=false;

    /*
    Button Text
    */

    loginButton.innerHTML="Login";

}



/* =====================================================
        PAGE TITLE CHANGE
=====================================================

Tab me Dynamic Title.
*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        document.title="Come Back 😊";

    }

    else{

        document.title="Admin Login | Dheeraj Official";

    }

});


/* =====================================================
            REMEMBER ME FEATURE
=====================================================

Agar user Remember Me checkbox tick karega
to Email Browser me save ho jayega.

Next time page open hoga
to Email automatically aa jayega.
*/

/*
Remember Me Checkbox
*/

const rememberCheck = document.querySelector("#remember");


/*
Saved Email
*/

const savedEmail = localStorage.getItem("rememberEmail");


/*
Agar Email Save hai
*/

if(savedEmail){

    /*
    Input me show karo
    */

    emailInput.value = savedEmail;

    /*
    Checkbox Tick
    */

    rememberCheck.checked = true;

}



/* =====================================================
            SAVE EMAIL
===================================================== */

function rememberEmail(){

    /*
    Checkbox Tick hai
    */

    if(rememberCheck.checked){

        /*
        Browser me Save
        */

        localStorage.setItem(

            "rememberEmail",

            emailInput.value

        );

    }

    /*
    Checkbox Tick nahi
    */

    else{

        /*
        Remove
        */

        localStorage.removeItem(

            "rememberEmail"

        );

    }

}



/* =====================================================
            FORGOT PASSWORD
===================================================== */

/*
Forgot Password Link
*/

const forgotPassword = document.querySelector(

".remember-box a"

);



forgotPassword.addEventListener("click",(event)=>{

    /*
    Link Stop
    */

    event.preventDefault();


    /*
    Email Read
    */

    const email = emailInput.value.trim();


    /*
    Email Empty
    */

    if(email===""){

        showMessage(

            "Enter Email First",

            "error"

        );

        emailInput.focus();

        return;

    }


    /*
    Firebase Reset Email
    */

    auth.sendPasswordResetEmail(email)

    .then(()=>{

        showMessage(

            "Password Reset Email Sent ✅",

            "success"

        );

    })

    .catch((error)=>{

        showMessage(

            showFirebaseError(error.code),

            "error"

        );

    });

});



/* =====================================================
            PASSWORD STRENGTH
===================================================== */

passwordInput.addEventListener("input",()=>{

    /*
    Password
    */

    const password=passwordInput.value;


    /*
    0 Character
    */

    if(password.length===0){

        passwordInput.style.borderColor="#d1d5db";

    }

    /*
    Weak
    */

    else if(password.length<6){

        passwordInput.style.borderColor="red";

    }

    /*
    Medium
    */

    else if(password.length<10){

        passwordInput.style.borderColor="orange";

    }

    /*
    Strong
    */

    else{

        passwordInput.style.borderColor="green";

    }

});



/* =====================================================
            SAVE REMEMBER EMAIL
=====================================================

Login Success hone par
Email Save kar do.
*/

/*
Ye function Login Success me call hoga.

rememberEmail();

*/



/* =====================================================
            PAGE LOADER
===================================================== */

window.addEventListener("load",()=>{

    document.body.style.opacity="1";

});



/* =====================================================
            SECURITY
===================================================== */

/*
Right Click Disable
*/

document.addEventListener(

"contextmenu",

(event)=>{

event.preventDefault();

}

);



/*
F12 Disable

(Basic Level)

Professional Security nahi hai.

Sirf Demo.
*/

document.addEventListener(

"keydown",

(event)=>{

if(

event.key==="F12"

){

event.preventDefault();

}

}

);



/* =====================================================
            LOGIN SUCCESS UPDATE
=====================================================

Part-2 ke Success Block me

window.location.href

ke pehle

ye line add karna.

rememberEmail();

*/
