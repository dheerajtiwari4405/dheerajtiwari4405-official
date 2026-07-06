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
