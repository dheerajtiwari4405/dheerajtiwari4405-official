


/* ===================================================
            NAVBAR JAVASCRIPT
=================================================== */

/*
======================================================
STEP 1

HTML se Menu Button select kar rahe hain.

<button id="menu-btn"></button>

======================================================
*/
const menuBtn = document.querySelector(".menu-btn");

/*
======================================================
STEP 2

Navigation Menu select kar rahe hain.

<ul id="nav-links"></ul>

======================================================
*/
const navLinks = document.querySelector("#nav-links");

/*
======================================================
STEP 3

Menu Button par click hone par function chalega.

addEventListener()

"click"

Matlab

Jab user button dabayega tab ye function execute hoga.

======================================================
*/

menuBtn.addEventListener("click", () => {

    /*
    ================================================

    toggle()

    Agar class nahi hai

    to add karega.

    Agar class hai

    to remove karega.

    Isliye

    open

    close

    dono ka kaam ek hi line kar deti hai.

    ================================================
    */

    navLinks.classList.toggle("show-menu");

});

/*
======================================================
STEP 4

Window scroll hone par

Navbar ka background change karenge.

======================================================
*/

window.addEventListener("scroll", () => {

    /*
    Header select kar rahe hain.
    */

    const header = document.querySelector(".header");

    /*
    Agar page 50px se zyada scroll hua.
    */

    if (window.scrollY > 50) {

        /*
        New class add.
        */

        header.classList.add("active-header");

    }

    /*
    Agar user wapas top par aa gaya.
    */

    else {

        /*
        Class remove.
        */

        header.classList.remove("active-header");

    }

});
/* ===========================================
        ACTIVE LINK + SMOOTH SCROLL
=========================================== */

// Navbar ke saare links select kar rahe hain.
const allLinks = document.querySelectorAll(".nav-links a");

// Har link par loop chalega.
allLinks.forEach((link) => {

    // Link par click event.
    link.addEventListener("click", function (event) {

        // Browser ka default jump stop.
        event.preventDefault();

        // Sab links se active class hatao.
        allLinks.forEach((item) => {
            item.classList.remove("active");
        });

        // Jis link par click hua usko active banao.
        this.classList.add("active");

        // href value nikalo.
        const targetId = this.getAttribute("href");

        // Us section ko select karo.
        const targetSection = document.querySelector(targetId);

        // Agar section mil gaya.
        if(targetSection){

            // Smooth scroll.
            targetSection.scrollIntoView({

                behavior:"smooth"

            });

        }

        // Mobile menu close.
        navLinks.classList.remove("show-menu");

    });

});