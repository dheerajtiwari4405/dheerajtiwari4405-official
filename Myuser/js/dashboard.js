/* ==========================================================
                DASHBOARD.JS
                PART 3.1
        DOM + VARIABLES + INITIAL SETUP
========================================================== */


/* ==========================================================
                PROJECT FORM
========================================================== */

// Project Add/Edit Form
const projectForm = document.getElementById("project-form");

// Project Title Input
const titleInput = document.getElementById("project-title");

// Project Category Input
const categoryInput = document.getElementById("project-category");

// Project Description
const descriptionInput = document.getElementById("project-description");

// GitHub Link
const githubInput = document.getElementById("github-link");

// Live Website Link
const liveInput = document.getElementById("live-link");

// Image Input
const imageInput = document.getElementById("project-image");

// Hidden Edit ID
const editIdInput = document.getElementById("edit-id");

// Submit Button
const saveButton = document.getElementById("save-project-btn");


/* ==========================================================
                PROJECT LIST
========================================================== */

// Yaha saare project cards show honge
const projectList = document.getElementById("project-list");


/* ==========================================================
                DASHBOARD COUNTERS
========================================================== */

// Total Projects
const totalProjects = document.getElementById("total-projects");

// Total Messages
const totalMessages = document.getElementById("total-messages");

// Total Visitors
const totalVisitors = document.getElementById("total-visitors");

// Resume Downloads
const resumeDownloads = document.getElementById("resume-downloads");


/* ==========================================================
                HEADER BUTTONS
========================================================== */

// Dark Mode Button
const themeBtn = document.getElementById("theme-btn");

// Logout Button
const logoutBtn = document.getElementById("logout-btn");

// Sidebar Menu Button
const menuBtn = document.getElementById("menu-btn");

// Sidebar
const sidebar = document.querySelector(".sidebar");


/* ==========================================================
                MODAL
========================================================== */

// Delete Modal
const deleteModal = document.getElementById("delete-modal");

// Delete Confirm Button
const confirmDeleteBtn = document.getElementById("confirm-delete");

// Cancel Delete
const cancelDeleteBtn = document.getElementById("cancel-delete");


/* ==========================================================
                LOADING
========================================================== */

// Loading Screen
const loadingScreen = document.getElementById("loading-screen");


/* ==========================================================
                TOAST
========================================================== */

// Success / Error Notification
const toast = document.getElementById("toast");


/* ==========================================================
                GLOBAL VARIABLES
========================================================== */

// Firestore Document ID
let editProjectId = null;

// Delete ID
let deleteProjectId = null;

// Image URL
let projectImageUrl = "";

// Sabhi Projects Store Honge
let projects = [];


/* ==========================================================
                APP START
========================================================== */

console.log("=================================");

console.log("Admin Dashboard Started");

console.log("Firebase Connected Successfully");

console.log("=================================");/* ==========================================================
            PART 3.2
        ADD PROJECT TO FIRESTORE
========================================================== */


/* ==========================================================
            PROJECT FORM SUBMIT
========================================================== */

projectForm.addEventListener("submit", async (e) => {

    // Form Reload Hone Se Rokna
    e.preventDefault();


    /* ==========================================
                GET INPUT VALUES
    ========================================== */

    // Input ki value lekar extra spaces remove karna
    const title = titleInput.value.trim();

    const category = categoryInput.value.trim();

    const description = descriptionInput.value.trim();

    const github = githubInput.value.trim();

    const live = liveInput.value.trim();


    /* ==========================================
                SIMPLE VALIDATION
    ========================================== */

    // Agar title empty hai
    if(title === ""){

        showToast("Project title is required","error");

        titleInput.focus();

        return;

    }

    // Agar category empty hai
    if(category === ""){

        showToast("Category is required","error");

        categoryInput.focus();

        return;

    }

    // Agar description empty hai
    if(description === ""){

        showToast("Description is required","error");

        descriptionInput.focus();

        return;

    }


    /* ==========================================
                LOADING START
    ========================================== */

    loadingScreen.classList.add("show");

    saveButton.disabled = true;

    saveButton.innerText = "Saving...";


    try{

        /* ======================================
                NEW PROJECT OBJECT
        ====================================== */

        const newProject = {

            // Project Title
            title:title,

            // Category
            category:category,

            // Description
            description:description,

            // GitHub Link
            github:github,

            // Live Website
            live:live,

            // Image
            image:"assets/images/default-project.jpg",

            // Time
            createdAt:new Date()

        };


        /* ======================================
                EDIT OR ADD
        ====================================== */

        if(editProjectId){

            // Existing Project Update

            await db
            .collection("projects")
            .doc(editProjectId)
            .update(newProject);

            showToast("Project Updated Successfully","success");

            editProjectId = null;

            saveButton.innerText = "Add Project";

        }else{

            // New Project Add

            await db
            .collection("projects")
            .add(newProject);

            showToast("Project Added Successfully","success");

        }


        /* ======================================
                FORM RESET
        ====================================== */

        projectForm.reset();


    }catch(error){

        console.error(error);

        showToast(error.message,"error");

    }


    /* ==========================================
                LOADING STOP
    ========================================== */

    loadingScreen.classList.remove("show");

    saveButton.disabled = false;

    saveButton.innerText = "Add Project";

});/* ==========================================================
                PART 3.3
        REALTIME PROJECT LIST (onSnapshot)
========================================================== */


/* ==========================================================
                LOAD ALL PROJECTS
========================================================== */

db.collection("projects")

.orderBy("createdAt","desc")

.onSnapshot((snapshot)=>{

    // Purana Array Empty
    projects=[];

    // Purana HTML Empty
    projectList.innerHTML="";



    /* ==========================================
            Firestore Data Read
    ========================================== */

    snapshot.forEach((doc)=>{

        // Firestore Data
        const project={

            id:doc.id,

            ...doc.data()

        };

        // Array Me Store
        projects.push(project);

    });



    /* ==========================================
            Dashboard Count
    ========================================== */

    totalProjects.innerText=projects.length;



    /* ==========================================
            Empty Project
    ========================================== */

    if(projects.length===0){

        projectList.innerHTML=`

        <div class="no-project">

            <i class="fa-solid fa-folder-open"></i>

            <h2>No Projects Found</h2>

            <p>Add Your First Project</p>

        </div>

        `;

        return;

    }



    /* ==========================================
            Create Cards
    ========================================== */

    projects.forEach((project)=>{

        const card=document.createElement("div");

        card.className="project-card";



        card.innerHTML=`

        <img src="${project.image}" alt="${project.title}">

        <div class="project-content">

            <h2 class="project-title">

                ${project.title}

            </h2>

            <span class="project-category">

                ${project.category}

            </span>

            <p class="project-description">

                ${project.description}

            </p>

            <div class="project-buttons">

                <a

                href="${project.github}"

                target="_blank"

                class="github-btn">

                <i class="fa-brands fa-github"></i>

                GitHub

                </a>

                <a

                href="${project.live}"

                target="_blank"

                class="live-btn">

                <i class="fa-solid fa-globe"></i>

                Live Demo

                </a>

                <button

                class="edit-btn"

                data-id="${project.id}">

                <i class="fa-solid fa-pen"></i>

                Edit

                </button>

                <button

                class="delete-btn"

                data-id="${project.id}">

                <i class="fa-solid fa-trash"></i>

                Delete

                </button>

            </div>

        </div>

        `;



        // Card Add

        projectList.appendChild(card);

    });



    /* ==========================================
            Events
    ========================================== */

    setupEditButtons();

    setupDeleteButtons();

});/* ==========================================================
                PART 3.4
                EDIT PROJECT
========================================================== */

/* ==========================================================
        EDIT BUTTON FUNCTION
========================================================== */

function setupEditButtons(){

    // Sabhi Edit Buttons Select Karo
    const editButtons = document.querySelectorAll(".edit-btn");


    // Har Button Par Event Lagao
    editButtons.forEach((button)=>{


        button.addEventListener("click",async()=>{


            // Button Se Project ID Nikalo
            const projectId = button.dataset.id;


            try{

                // Firestore Se Document Read Karo
                const doc = await db
                .collection("projects")
                .doc(projectId)
                .get();


                // Agar Document Exist Nahi Hai
                if(!doc.exists){

                    showToast(
                        "Project Not Found",
                        "error"
                    );

                    return;

                }


                // Firestore Data
                const project = doc.data();


                /* =====================================
                        FORM FILL
                ===================================== */

                // Title
                titleInput.value =
                project.title || "";


                // Category
                categoryInput.value =
                project.category || "";


                // Description
                descriptionInput.value =
                project.description || "";


                // GitHub
                githubInput.value =
                project.github || "";


                // Live Website
                liveInput.value =
                project.live || "";


                // Image URL
                projectImageUrl =
                project.image || "";


                /* =====================================
                        EDIT MODE
                ===================================== */

                // Global Variable
                editProjectId = projectId;


                // Hidden Input
                editIdInput.value =
                projectId;


                // Button Text Change
                saveButton.innerHTML =

                `<i class="fa-solid fa-pen"></i>
                Update Project`;


                // Form Ke Top Par Scroll
                projectForm.scrollIntoView({

                    behavior:"smooth"

                });


                // Success Message
                showToast(

                    "Project Ready For Edit",

                    "info"

                );

            }

            catch(error){

                console.log(error);

                showToast(

                    error.message,

                    "error"

                );

            }

        });

    });

}/* ==========================================================
                PART 3.5
                DELETE PROJECT
========================================================== */

/* ==========================================================
        DELETE BUTTON FUNCTION
========================================================== */

function setupDeleteButtons(){

    // Sabhi Delete Buttons Select Karo
    const deleteButtons = document.querySelectorAll(".delete-btn");


    // Har Button Par Event Lagao
    deleteButtons.forEach((button)=>{


        button.addEventListener("click",()=>{

            // Project ID Store Karo
            deleteProjectId = button.dataset.id;

            // Modal Show Karo
            deleteModal.classList.add("show");

        });

    });

}


/* ==========================================================
        CONFIRM DELETE
========================================================== */

confirmDeleteBtn.addEventListener("click",async()=>{

    // Agar ID Nahi Hai To Return
    if(!deleteProjectId){

        return;

    }

    try{

        /* ======================================
                LOADING START
        ====================================== */

        loadingScreen.classList.add("show");


        /* ======================================
                DELETE FROM FIRESTORE
        ====================================== */

        await db

        .collection("projects")

        .doc(deleteProjectId)

        .delete();


        /* ======================================
                SUCCESS
        ====================================== */

        showToast(

            "Project Deleted Successfully",

            "success"

        );


        /* ======================================
                RESET
        ====================================== */

        deleteProjectId = null;

        deleteModal.classList.remove("show");

    }

    catch(error){

        console.log(error);

        showToast(

            error.message,

            "error"

        );

    }

    finally{

        /* ======================================
                LOADING STOP
        ====================================== */

        loadingScreen.classList.remove("show");

    }

});


/* ==========================================================
        CANCEL DELETE
========================================================== */

cancelDeleteBtn.addEventListener("click",()=>{

    // Modal Hide
    deleteModal.classList.remove("show");

    // ID Reset
    deleteProjectId = null;

});


/* ==========================================================
        CLOSE MODAL OUTSIDE CLICK
========================================================== */

deleteModal.addEventListener("click",(e)=>{

    // Agar Background Click Hua
    if(e.target===deleteModal){

        deleteModal.classList.remove("show");

        deleteProjectId = null;

    }

});/* ==========================================================
                PART 3.6
        DASHBOARD FINAL FEATURES
========================================================== */


/* ==========================================================
                TOAST FUNCTION
========================================================== */

function showToast(message,type="success"){

    // Purani Class Remove
    toast.className="";

    // Toast ID Wapas Add
    toast.id="toast";

    // Success / Error / Warning / Info
    toast.classList.add(type);

    // Message Set
    toast.innerText=message;

    // Toast Show
    toast.classList.add("show");

    // 3 Second Baad Hide
    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}


/* ==========================================================
                DARK MODE
========================================================== */

// Browser Me Saved Theme Read
const savedTheme=localStorage.getItem("theme");

// Agar Dark Theme Hai
if(savedTheme==="dark"){

    document.body.classList.add("dark-mode");

    themeBtn.innerHTML="☀️";

}


// Theme Button Click
themeBtn.addEventListener("click",()=>{

    // Dark Mode Toggle
    document.body.classList.toggle("dark-mode");


    // Dark Mode Active
    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML="☀️";

    }

    // Light Mode
    else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML="🌙";

    }

});


/* ==========================================================
                SIDEBAR TOGGLE
========================================================== */

menuBtn.addEventListener("click",()=>{

    sidebar.classList.toggle("show");

});


/* ==========================================================
                LOGOUT
========================================================== */

logoutBtn.addEventListener("click",async()=>{

    // Confirm
    const confirmLogout=

    confirm("Are you sure you want to logout?");

    if(!confirmLogout){

        return;

    }

    try{

        // Firebase Logout
        await firebase.auth().signOut();

        // Success
        showToast(

            "Logout Successful",

            "success"

        );

        // Login Page
        setTimeout(()=>{

            window.location.href="login.html";

        },1000);

    }

    catch(error){

        console.log(error);

        showToast(

            error.message,

            "error"

        );

    }

});


/* ==========================================================
                LOADING FUNCTIONS
========================================================== */

function showLoading(){

    loadingScreen.classList.add("show");

}

function hideLoading(){

    loadingScreen.classList.remove("show");

}


/* ==========================================================
                APP START
========================================================== */

window.addEventListener("load",()=>{

    // Loading Hide
    hideLoading();

    // Dashboard Ready
    console.log("Dashboard Ready");

    // Welcome Message
    showToast(

        "Welcome Admin",

        "info"

    );

});