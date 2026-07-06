/* ==========================================================
                SKILLS ANIMATION
========================================================== */

/*
------------------------------------------------------------
STEP 1

Saare progress bars select karo.

HTML:

<div class="progress-bar" data-width="95"></div>

querySelectorAll() NodeList return karta hai.
------------------------------------------------------------
*/

const progressBars = document.querySelectorAll(".progress-bar");

/*
------------------------------------------------------------
STEP 2

Animation function

Ye function ek progress bar ko animate karega.
------------------------------------------------------------
*/

function animateSkill(bar){

    /*
    HTML ke data-width attribute ko read kar rahe hain.

    Example:

    data-width="95"

    Output:

    95
    */

    const targetWidth = bar.dataset.width;

    /*
    CSS width update.

    Pehle width 0% thi.

    Ab target width ho jayegi.
    */

    bar.style.width = targetWidth + "%";

}

/*
------------------------------------------------------------
STEP 3

Intersection Observer

Animation tabhi chalegi jab section screen me aaye.
------------------------------------------------------------
*/

const skillObserver = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            animateSkill(entry.target);

            /*
            Animation sirf ek baar chalegi.
            */

            skillObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.5
});

/*
------------------------------------------------------------
STEP 4

Sabhi bars observe karo.
------------------------------------------------------------
*/

progressBars.forEach((bar)=>{

    skillObserver.observe(bar);

});