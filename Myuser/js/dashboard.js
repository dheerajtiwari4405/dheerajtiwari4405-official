
/* =====================================================
            DOM ELEMENTS
=====================================================

HTML ke important elements ko JavaScript me
select kar rahe hain.

Inke bina hum un par koi action nahi kar sakte.
*/
const menuBtn = document.querySelector("#menu-btn");
const sidebar = document.querySelector(".sidebar");
const themeBtn = document.querySelector("#theme-btn");
const logoutBtn = document.querySelector("#logout-btn");
const body = document.body;

/* =======SIDEBAR TOGGLE=========

Mobile me sidebar hidden rahega.
Menu button dabane par sidebar open/close hoga.
*/
menuBtn.addEventListener("click",()=>{
    /*
    Sidebar me "show" class add/remove hogi.
    */
    sidebar.classList.toggle("show");
});
/* ==== DARK / LIGHT MODE===
Browser ke LocalStorage se check karo
ki user ne pehle kaunsi theme use ki thi.
*/
const savedTheme = localStorage.getItem("theme");
/*
Agar Dark Theme mili.
*/
if(savedTheme==="dark"){
    /*
    Body me dark class add.
    */
    body.classList.add("dark");
    /*
    Theme button ka icon badal do.
    */
    themeBtn.innerHTML="☀️";
}
/* ===== THEME BUTTON=========
Har click ar Dark aur Light mode
ek dusre me badlenge.
*/
themeBtn.addEventListener("click",()=>{
    /*
    Dark class add/remove.
    */
    body.classList.toggle("dark");
    /*
    Agar body me dark class hai.
    */
    if(body.classList.contains("dark")){
        /*
        Browser me save.
        */
        localStorage.setItem("theme","dark");
        /*
        Button icon.
        */
        themeBtn.innerHTML="☀️";
    }
    /*
    Agar Light Mode hai.
    */
    else{
        /*
        Browser me save.
        */
        localStorage.setItem("theme","light");
        /*
        Button icon.
        */
        themeBtn.innerHTML="🌙";
    }
});
/* =====ACTIVE MENU==
Jis menu par click hoga
sirf wahi Active dikhega.
*/
const menuItems = document.querySelectorAll(".sidebar ul li");
menuItems.forEach((item)=>{
    item.addEventListener("click",()=>{
        /*
        Sabse pehle sabka active remove.
        */
        menuItems.forEach((menu)=>{
            menu.classList.remove("active");
        });
        /*
        Jis par click hua
        usme active add.
        */
        item.classList.add("active");
    });
});
/* ==== FIREBASE AUTH PROTECTION====
Dashboard sirf login user hi dekh sakta hai.
Agar user login nahi hai to
use login page par bhej do.
*/
auth.onAuthStateChanged((user)=>{
    /*
    Agar user login nahi hai
    */
    if(!user){
        /*
        Login page par redirect
        */
        window.location.href="login.html";
        return;
    }
    /*
    User login hai
    */
    console.log("Welcome :", user.email);
});
/* ==== LOGOUT BUTTON===
Logout button click hone par
Firebase se logout karao.
*/
logoutBtn.addEventListener("click",()=>{
    /*
    User se confirmation lo.
    */
    const confirmLogout = confirm(
        "Kya aap Logout karna chahte hain?"
    );
    /*
    Agar Cancel dabaya
    */
    if(!confirmLogout){
        return;
    }
    /*
    Logout Button Disable
    */
    logoutBtn.disabled = true;
    /*
    Button Text Change
    */
    logoutBtn.innerHTML = "Logging Out...";
    /*
    Firebase Logout
    */
    auth.signOut()
    .then(()=>{
        /*
        LocalStorage Theme delete nahi karenge.
        Sirf login related data delete karenge.
        */
        sessionStorage.clear();
        /*
        Success Message
        */
        alert("Logout Successful ✅");
        /*
        Login Page
        */
        window.location.href="login.html";
    })
    .catch((error)=>{
        /*
        Console Error
        */
        console.log(error);
        /*
        User Message
        */
        alert("Logout Failed ❌");
        /*
        Button Restore
        */
        logoutBtn.disabled = false;
        logoutBtn.innerHTML = "Logout";
    });
});

/* ==SIDEBAR AUTO CLOSE==
Mobile me agar sidebar open hai
aur user sidebar ke bahar click kare
to sidebar close ho jayega.
*/
document.addEventListener("click",(event)=>{
    /*
    Screen Width Check
    */
    if(window.innerWidth <= 992){
        /*
        Agar click sidebar aur menu button
        ke bahar hua
        */
        if(
            !sidebar.contains(event.target) && !menuBtn.contains(event.target)
        ){
            /*
            Sidebar Hide
            */
            sidebar.classList.remove("show");
        }
    }
});

/* == ESC KEY====
Keyboard se ESC dabane par
Sidebar close.
*/
document.addEventListener("keydown",(event)=>{
    /*
    ESC Key
    */
    if(event.key==="Escape"){
        sidebar.classList.remove("show");
    }
});
/* ==== PAGE LOADING====
Dashboard Load hone par
Smooth Animation.
*/
window.addEventListener("load",()=>{
    /*
    Body Fade
    */
    body.classList.add("fade");
});
/* === DASHBOARD COUNTERS======
Dashboard ke cards me data dikhayenge.
Jaise:
Projects
Messages
Visitors
Resume Downloads
*/
/*
Projects Card
*/
const totalProjects = document.querySelector("#total-projects");
/*
Messages Card
*/
const totalMessages = document.querySelector("#total-messages");
/*
Visitors Card
*/
const totalVisitors = document.querySelector("#total-visitors");
/*
Resume Downloads Card
*/
const resumeDownloads = document.querySelector("#resume-downloads");
/* =====================================================
        PROJECT COUNT
=====================================================

Firestore ke projects collection se

Total Documents Count karenge.
*/

function loadProjectCount(){

    db.collection("projects")

    .get()

    .then((snapshot)=>{

        /*
        Total Projects
        */

        totalProjects.innerHTML = snapshot.size;

    })

    .catch((error)=>{

        console.log(error);

    });

}



/* =====================================================
        MESSAGE COUNT
===================================================== */

function loadMessageCount(){

    db.collection("messages")

    .get()

    .then((snapshot)=>{

        totalMessages.innerHTML = snapshot.size;

    })

    .catch((error)=>{

        console.log(error);

    });

}



/* =====================================================
        VISITOR COUNT
=====================================================

Abhi Firebase Analytics
nahi use kar rahe.

Isliye LocalStorage Demo.
*/

function loadVisitorCount(){

    let visitors = localStorage.getItem("visitors");


    /*
    Pehli baar
    */

    if(visitors===null){

        visitors = 1;

    }

    else{

        visitors = Number(visitors)+1;

    }

    /*
    Save
    */

    localStorage.setItem(

        "visitors",

        visitors

    );

    /*
    Card Update
    */

    totalVisitors.innerHTML = visitors;

}



/* =====================================================
        RESUME DOWNLOAD
=====================================================

Demo Value

Baad me Firestore se karenge.
*/

function loadResumeDownloads(){

    let download = localStorage.getItem(

        "resume"

    );

    if(download===null){

        download = 0;

    }

    resumeDownloads.innerHTML = download;

}



/* =====================================================
        LOAD DASHBOARD
=====================================================

Page Load hote hi

Saare Cards Update.
*/

window.addEventListener("load",()=>{

    loadProjectCount();

    loadMessageCount();

    loadVisitorCount();

    loadResumeDownloads();

});



/* =====================================================
        ANIMATED COUNTER
=====================================================

Card me Number

0 se Start hokar

Final Number tak jayega.
*/

function animateCounter(

element,

target

){

    let start = 0;

    let speed = 20;


    const timer = setInterval(()=>{

        start++;

        element.innerHTML = start;

        if(start>=target){

            clearInterval(timer);

        }

    },speed);

}


/* =====================================================
            PROJECT FORM
=====================================================

HTML Form ko JavaScript me select kar rahe hain.
*/

const projectForm = document.querySelector("#project-form");

const titleInput = document.querySelector("#project-title");

const categoryInput = document.querySelector("#project-category");

const descriptionInput = document.querySelector("#project-description");

const githubInput = document.querySelector("#github-link");

const liveInput = document.querySelector("#live-link");

const projectList = document.querySelector("#project-list");


/* =====================================================
            FORM SUBMIT
===================================================== */

projectForm.addEventListener("submit",(event)=>{

    /*
    Page Refresh Stop
    */

    event.preventDefault();


    /*
    Input Values
    */

    const title = titleInput.value.trim();

    const category = categoryInput.value.trim();

    const description = descriptionInput.value.trim();

    const github = githubInput.value.trim();

    const live = liveInput.value.trim();


    /*
    Validation
    */

    if(title===""){

        alert("Project Title Required");

        titleInput.focus();

        return;

    }

    if(category===""){

        alert("Category Required");

        categoryInput.focus();

        return;

    }

    if(description===""){

        alert("Description Required");

        descriptionInput.focus();

        return;

    }


    /*
    Button Disable
    */

    const button = projectForm.querySelector("button");

    button.disabled = true;

    button.innerHTML = "Saving...";


    /*
    Firestore Save
    */

    db.collection("projects")

    .add({

        title:title,

        category:category,

        description:description,

        github:github,

        live:live,

        createdAt:new Date()

    })

    .then(()=>{

        /*
        Success
        */

        alert("Project Added Successfully ✅");


        /*
        Form Reset
        */

        projectForm.reset();


        /*
        Button Restore
        */

        button.disabled=false;

        button.innerHTML="Add Project";


        /*
        Reload Projects
        */

        loadProjects();

    })

    .catch((error)=>{

        console.log(error);

        alert("Project Save Failed ❌");

        button.disabled=false;

        button.innerHTML="Add Project";

    });

});
/* =====================================================
            LOAD ALL PROJECTS
=====================================================

Ye function Firestore se saare projects
real-time me read karega.
*/

function loadProjects(){

    /*
    Firestore Listener
    */

    db.collection("projects")

    .orderBy("createdAt","desc")

    .onSnapshot((snapshot)=>{

        /*
        Purane Cards Remove
        */

        projectList.innerHTML="";


        /*
        Agar koi Project nahi hai
        */

        if(snapshot.empty){

            projectList.innerHTML=`

            <div class="no-project">

                No Project Found

            </div>

            `;

            return;

        }


        /*
        Sabhi Documents Loop
        */

        snapshot.forEach((doc)=>{

            /*
            Firestore Data
            */

            const project=doc.data();


            /*
            Project Card
            */

            projectList.innerHTML+=`

            <div class="project-card">

                <h3>${project.title}</h3>

                <p><strong>Category :</strong>

                ${project.category}</p>

                <p>${project.description}</p>

                <div class="project-buttons">

                    <button

                    class="edit-btn"

                    onclick="editProject('${doc.id}')">

                    Edit

                    </button>

                    <button

                    class="delete-btn"

                    onclick="deleteProject('${doc.id}')">

                    Delete

                    </button>

                </div>

            </div>

            `;

        });

    });

}



/* =====================================================
            DELETE PROJECT
=====================================================

Delete Button click hone par
Firestore se project delete hoga.
*/

function deleteProject(id){

    /*
    Confirmation
    */

    const result=confirm(
        "Kya aap Project Delete karna chahte hain?"
    );
    /*
    Cancel
    */
    if(!result){
        return;
    }
    /*
    Delete
    */
    db.collection("projects")
    .doc(id)
    .delete()
    .then(()=>{
        alert(
            "Project Deleted Successfully ✅"
        );
    })
    .catch((error)=>{
        console.log(error);
        alert(
            "Delete Failed ❌"
        );
    });
}
/* ======EDIT PROJECT========

Abhi sirf Demo.
Next Part me complete Edit banega.
*/
function editProject(id){
    console.log(
        "Edit Project ID :",
        id
    );
}
/* ====== PAGE LOAD======

Dashboard open hote hi
Projects Load.
*/
window.addEventListener("load",()=>{
    loadProjects();
});
/* =====EDIT PROJECT====

Global Variable
Isme current edit hone wale
Project ki ID store hogi.
*/
let editProjectId = null;
/* =====EDIT BUTTON=== */

function editProject(id){
    /*
    Firestore se Data Read
    */
    db.collection("projects")
    .doc(id)
    .get()
    .then((doc)=>{
        /*
        Data
        */
        const project = doc.data();
        /*
        ID Save
        */
        editProjectId = id;
        /*
        Form Fill
        */
        titleInput.value = project.title;
        categoryInput.value = project.category;
        descriptionInput.value = project.description;
        githubInput.value = project.github;
        liveInput.value = project.live;
      /*
        Button Change
        */
        projectForm.querySelector("button").innerHTML="Update Project";
    });
}
/* =====================================================
            UPDATE PROJECT
===================================================== */
function updateProject(){
    db.collection("projects")
    .doc(editProjectId)
    .update({
        title:titleInput.value.trim(),
        category:categoryInput.value.trim(),
        description:descriptionInput.value.trim(),
        github:githubInput.value.trim(),
        live:liveInput.value.trim()
    })
    .then(()=>{
        alert("Project Updated Successfully ✅");
        projectForm.reset();
        editProjectId = null;
        projectForm.querySelector("button").innerHTML="Add Project";
    })
    .catch((error)=>{
        console.log(error);
    });
}
/* ===FORM SUBMIT UPDATE CHECK======

Project Add karna hai ya Update?
*/
projectForm.addEventListener("submit",(event)=>{
    /*
    Agar Edit Mode hai
    */
    if(editProjectId){
        event.preventDefault();
        updateProject();
    }
});

/* ======SEARCH PROJECT=== */
const searchInput = document.querySelector("#search-project");
if(searchInput){
searchInput.addEventListener("keyup",()=>{
const value = searchInput.value.toLowerCase();
const cards = document.querySelectorAll(".project-card");
cards.forEach((card)=>{
const text = card.innerText.toLowerCase();
if(text.includes(value)){
card.style.display="block";
}
else{
card.style.display="none";
}
});
});
}

/* =====================================================
            LOG
===================================================== */

console.log("Project System Ready 🚀");