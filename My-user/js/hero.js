/* ============================================
   HERO SECTION TYPING EFFECT
   ============================================ */

/*
-----------------------------------------------
STEP 1
Typing animation me dikhne wale sabhi roles.
Future me koi naya role add karna ho to
sirf is array me add kar dena.
-----------------------------------------------
*/
const roles = [
    "JavaScript Developer",
    "Frontend Developer",
    "Web App Developer",
    "Odoo Learner",
    "Problem Solver"
];

/*
-----------------------------------------------
STEP 2
Hero section ke h2 ko select kar rahe hain.

HTML:
<h2 class="typing-text"></h2>

Ye variable ab us HTML element ko hold karega.
-----------------------------------------------
*/
const typingText = document.querySelector("#typing-role");

/*
-----------------------------------------------
STEP 3
Current role ka index.

Shuruaat me 0.
Matlab array ka pehla role show hoga.
-----------------------------------------------
*/
let roleIndex = 0;

/*
-----------------------------------------------
STEP 4
Current character index.

Typing effect me ek-ek character likhna hai.

Example

J
Ja
Jav
Java

Isi liye ye variable use hoga.
-----------------------------------------------
*/
let charIndex = 0;

/*
-----------------------------------------------
STEP 5

Ye batata hai

Typing chal rahi hai

ya

Deleting chal rahi hai.

true = Typing

false = Deleting
-----------------------------------------------
*/
let isTyping = true;

/*
-----------------------------------------------
STEP 6

Main typing function.

Isi function ke andar poora animation chalega.
-----------------------------------------------
*/
function typeEffect() {

    /*
    Current role nikal rahe hain.

    Example

    JavaScript Developer
    */
    const currentRole = roles[roleIndex];

    /*
    Agar typing mode ON hai
    */
    if (isTyping) {

        /*
        substring()

        Example

        JavaScript

        0,1

        J

        0,2

        Ja

        0,3

        Jav

        Aise hi ek-ek character badhta rahega.
        */
        typingText.textContent = currentRole.substring(0, charIndex);

        /*
        Agla character dikhane ke liye
        index increase kar diya.
        */
        charIndex++;

        /*
        Agar poora word type ho gaya
        */
        if (charIndex > currentRole.length) {

            /*
            Ab typing band.

            Deleting start.
            */
            isTyping = false;

            /*
            1500ms rukega.
            */
            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        /*
        Delete animation.
        */

        typingText.textContent = currentRole.substring(0, charIndex);

        /*
        Character kam kar rahe hain.
        */
        charIndex--;

        /*
        Agar sab delete ho gaya
        */
        if (charIndex < 0) {

            /*
            Next role.
            */
            roleIndex++;

            /*
            Last role ke baad
            phir first role.
            */
            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

            /*
            Typing dobara start.
            */
            isTyping = true;

            charIndex = 0;
        }

    }

    /*
    Har 120ms baad function dobara chalega.

    Isi wajah se animation smooth dikhega.
    */
    setTimeout(typeEffect, 120);

}
/*
-----------------------------------------------
Website load hote hi
typing animation start.
-----------------------------------------------
*/
typeEffect();
/* ============================================
        DYNAMIC GREETING
============================================ */

/*
----------------------------------------------
Greeting wale paragraph ko select kar rahe hain.

HTML:

<p id="greeting"></p>

----------------------------------------------
*/
const greeting = document.querySelector("#greeting");

/*
----------------------------------------------
Current Date object.

Isme current date aur time dono hote hain.

Example

Mon Jul 06 2026 09:15

----------------------------------------------
*/
const currentDate = new Date();

/*
----------------------------------------------
Sirf current hour nikal rahe hain.

Range:

0

se

23

Tak

Example

9

14

20

----------------------------------------------
*/
const currentHour = currentDate.getHours();

/*
----------------------------------------------
Greeting set karne wala function.

----------------------------------------------
*/
function updateGreeting(){

    /*
    Morning

    5

    se

    11

    */
    if(currentHour >=5 && currentHour <12){

        greeting.textContent="☀️ Good Morning, I'm";

    }

    /*
    Afternoon

    12

    se

    4

    */
    else if(currentHour >=12 && currentHour <17){

        greeting.textContent="🌤 Good Afternoon, I'm";

    }

    /*
    Evening

    Baaki sab

    */
    else{

        greeting.textContent="🌙 Good Evening, I'm";

    }

}

/*
----------------------------------------------
Function Call

Website load hote hi greeting set.

----------------------------------------------
*/
updateGreeting();

/* =========================================================
            HERO BUTTON EVENTS
========================================================= */

/*
----------------------------------------------------------
Project Button ko select kar rahe hain.

HTML

<button id="project-btn">

----------------------------------------------------------
*/
const projectBtn = document.querySelector("#project-btn");

/*
----------------------------------------------------------
Contact Button ko select kar rahe hain.

HTML

<button id="contact-btn">

----------------------------------------------------------
*/
const contactBtn = document.querySelector("#contact-btn");

/*
----------------------------------------------------------
Projects Section select kar rahe hain.

HTML

<section id="projects">

----------------------------------------------------------
*/
const projectSection = document.querySelector("#projects");

/*
----------------------------------------------------------
Contact Section select kar rahe hain.

HTML

<section id="contact">

----------------------------------------------------------
*/
const contactSection = document.querySelector("#contact");

/*
----------------------------------------------------------
Project Button Click Event

Jab user button click karega

Projects section tak smooth scroll hoga.

----------------------------------------------------------
*/
projectBtn.addEventListener("click", () => {

    projectSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});

/*
----------------------------------------------------------
Contact Button Click Event

----------------------------------------------------------
*/
contactBtn.addEventListener("click", () => {

    contactSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});

/* ============================================================
                MOUSE GLOW EFFECT
============================================================ */

/*
--------------------------------------------------------------
STEP 1

Mouse Glow Element Select

HTML

<div class="mouse-glow"></div>

Ye element mouse ke sath move karega.
--------------------------------------------------------------
*/
const mouseGlow = document.querySelector(".mouse-glow");

/*
--------------------------------------------------------------
STEP 2

Mouse Move Event

Jab bhi mouse move hoga

Ye event baar baar chalega.

Mouse ki position browser hume de deta hai.

--------------------------------------------------------------
*/
window.addEventListener("mousemove",(event)=>{

    /*
    ----------------------------------------------------------

    Mouse ki X Position

    Example

    350px

    ----------------------------------------------------------
    */
    const mouseX = event.clientX;

    /*
    ----------------------------------------------------------

    Mouse ki Y Position

    Example

    500px

    ----------------------------------------------------------
    */
    const mouseY = event.clientY;

    /*
    ----------------------------------------------------------

    Glow ko wahi shift kar rahe hain

    left

    top

    CSS Position update hogi.

    ----------------------------------------------------------
    */

    mouseGlow.style.left = mouseX + "px";

    mouseGlow.style.top = mouseY + "px";

});
/* =====================================================
                WEBSITE PRELOADER
===================================================== */

/*
-------------------------------------------------------
STEP 1

Loader ko select kar rahe hain.

-------------------------------------------------------
*/
const loader = document.querySelector("#loader");

/*
-------------------------------------------------------
STEP 2

Window ke completely load hone ka wait.

Is event ke baad images, CSS, JS sab load ho chuke hote hain.

-------------------------------------------------------
*/
window.addEventListener("load", () => {

    /*
    ---------------------------------------------------
    Demo ke liye 2 second wait kar rahe hain.

    Real project me fixed delay nahi rakhenge.
    Hum actual loading complete hone par hi loader hataenge.
    ---------------------------------------------------
    */
    setTimeout(() => {

        /*
        Loader hide karne wali class add.
        */
        loader.classList.add("hide-loader");

    }, 2000);

});