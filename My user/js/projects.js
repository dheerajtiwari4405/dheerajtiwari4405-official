/* ======================================================
            PROJECT DATABASE
======================================================

Is array ko website ka mini database samjho.

Future me sirf ek object add karoge.

Naya card automatically ban jayega.

====================================================== */

const projects=[

{

title:"Random Color Generator",

category:"javascript",

description:"Generate Unlimited Random Colors",

github:"#",

demo:"#"

},

{

title:"Chat Web App",

category:"firebase",

description:"Realtime Chat Application",

github:"#",

demo:"#"

},

{

title:"Weather App",

category:"javascript",

description:"Live Weather Using API",

github:"#",

demo:"#"

},

{

title:"Portfolio Website",

category:"html",

description:"Responsive Portfolio",

github:"#",

demo:"#"

}

];
/* ============================================================
                PROJECT CARD RENDERING
===============================================================

Ye function project array se HTML banayega.

Agar kal 100 projects ho gaye...

To bhi sirf array me object add karna padega.

Card automatically ban jayega.

============================================================ */


/*
---------------------------------------------------------------
STEP 1

Project Container Select

HTML

<div class="project-container"></div>

Isi container ke andar cards insert honge.

---------------------------------------------------------------
*/

const projectContainer = document.querySelector(".project-container");


/*
---------------------------------------------------------------
STEP 2

Display Function

Ye function

Projects Array

↓

HTML

me convert karega.

---------------------------------------------------------------
*/

function displayProjects(){


    /*
    -----------------------------------------------------------

    Purane cards remove.

    Agar filter dobara chale

    to duplicate card na bane.

    -----------------------------------------------------------
    */

    projectContainer.innerHTML = "";


    /*
    -----------------------------------------------------------

    Loop

    Array ke har project par chalega.

    -----------------------------------------------------------
    */

    projects.forEach((project)=>{


        /*
        -------------------------------------------------------

        Card Create

        createElement()

        Browser me naya div banata hai.

        -------------------------------------------------------
        */

        const card = document.createElement("div");


        /*
        -------------------------------------------------------

        CSS Class

        card ko

        project-card

        class de rahe hain.

        -------------------------------------------------------
        */

        card.classList.add("project-card");


        /*
        -------------------------------------------------------

        HTML Insert

        Card ke andar ka HTML.

        -------------------------------------------------------
        */

        card.innerHTML = `

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <span>${project.category}</span>

            <div class="project-buttons">

                <a href="${project.demo}" target="_blank">

                    Live Demo

                </a>

                <a href="${project.github}" target="_blank">

                    GitHub

                </a>

            </div>

        `;


        /*
        -------------------------------------------------------

        Card Screen par Add.

        -------------------------------------------------------
        */

        projectContainer.appendChild(card);

    });

}


/*
---------------------------------------------------------------

Website Load

↓

Function Call

---------------------------------------------------------------
*/

displayProjects();