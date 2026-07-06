/* ===========================================================
                    FOOTER JAVASCRIPT
=========================================================== */

/*
------------------------------------------------------------

STEP 1

Current Year

------------------------------------------------------------
*/

/*
Year wala span select.

HTML

<span id="year"></span>

*/

const year = document.querySelector("#year");

/*
Current Year

Example

2026

*/

year.textContent = new Date().getFullYear();



/*
------------------------------------------------------------

STEP 2

Scroll Button

------------------------------------------------------------
*/

const scrollButton = document.querySelector("#scroll-top");


/*
------------------------------------------------------------

STEP 3

Window Scroll Event

------------------------------------------------------------
*/

window.addEventListener("scroll",()=>{

    /*
    Agar user

    300px

    niche aa gaya.

    */

    if(window.scrollY > 300){

        /*
        Button Show
        */

        scrollButton.style.display = "block";

    }

    else{

        /*
        Button Hide
        */

        scrollButton.style.display = "none";

    }

});


/*
------------------------------------------------------------

STEP 4

Button Click

------------------------------------------------------------
*/

scrollButton.addEventListener("click",()=>{

    /*
    Smooth Scroll

    Top

    */

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});