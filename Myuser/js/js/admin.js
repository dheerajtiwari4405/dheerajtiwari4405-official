/* ===========================================
            ADMIN PANEL
=========================================== */

const form = document.querySelector("#project-form");

/*
Input Select
*/

const titleInput = document.querySelector("#project-title");

const descriptionInput = document.querySelector("#project-description");

const categoryInput = document.querySelector("#project-category");

const demoInput = document.querySelector("#project-demo");

const githubInput = document.querySelector("#project-github");

/*
Submit Event
*/

form.addEventListener("submit",(event)=>{

    /*
    Form Refresh Stop
    */

    event.preventDefault();

    /*
    New Object
    */

    const newProject={

        title:titleInput.value,

        description:descriptionInput.value,

        category:categoryInput.value,

        demo:demoInput.value,

        github:githubInput.value

    };

    /*
    Array me Add
    */

    projects.push(newProject);

    /*
    Screen Update
    */

    displayProjects(projects);

    /*
    Form Reset
    */

    form.reset();

});