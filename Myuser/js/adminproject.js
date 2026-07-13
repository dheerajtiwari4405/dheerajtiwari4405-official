/* ===========================================
        SAVE PROJECT TO FIRESTORE
=========================================== */

projectForm.addEventListener("submit", (event) => {

    // Page Refresh Stop
    event.preventDefault();

    // Input Values
    const title = document.querySelector("#project-title").value.trim();

    const category = document.querySelector("#project-category").value.trim();

    const description = document.querySelector("#project-description").value.trim();

    const github = document.querySelector("#github-link").value.trim();

    const live = document.querySelector("#live-link").value.trim();

    /*
    Firestore Database Me Save
    */

    db.collection("projects").add({

        title: title,

        category: category,

        description: description,

        github: github,

        live: live,

        createdAt: new Date()

    })

    .then(() => {

        alert("Project Added Successfully ✅");

        // Form Clear
        projectForm.reset();

    })

    .catch((error) => {

        console.error(error);

        alert("Project Save Failed ❌");

    });

});