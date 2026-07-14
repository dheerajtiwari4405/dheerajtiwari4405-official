// /* ======================================================
//             LOCAL PROJECT 
// ======================================================
// Is array ko website ka mini database samjho.Future me sirf ek object add karoge.Naya card automatically ban jayega.==================================================== */

// const projects=[{
//     title:"Random Color Generator",
//     category:"javascript",
//     description:"Generate Unlimited Random Colors",
//     github:"#",
//     live:"#"
// },];

/*
===================================
FIRESTORE PROJECT ARRAY
===================================
*/

let projects = [];

/*
===================================
LOAD PROJECTS FROM FIRESTORE
===================================
*/


db.collection("projects")
.orderBy("createdAt", "desc")
.onSnapshot((snapshot)=>{

    // Array ko khali karo
    projects = [];

    // Firestore ka data array me dalo
    snapshot.forEach((doc)=>{

        projects.push({

            id: doc.id,

            ...doc.data()

        });

    });

    // Website par cards dikhao
    displayProjects(projects);

});
// Website load hote hi Firestore se data lao

db.collection("projects")
.onSnapshot((snapshot)=>{

    // Purana array khali karo

    projects.length = 0;

    // Firestore ka data array me dalo

    snapshot.forEach((doc)=>{

        projects.push({

            id: doc.id,

            ...doc.data()

        });

    });

    // Cards dobara banao

    displayProjects(projects);

});

/*
=====================================
                PROJECT CARD RENDERING
=======Ye function project array se HTML banayega.Agar kal 100 projects ho gaye...To bhi sirf array me object add karna padega.Card automatically ban jayega.=== */
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
function displayProjects(projectList){
    /*
    -----------------------------------------------------------
    Purane cards remove.Agar filter dobara chale to duplicate card na bane.
    -----------------------------------------------------------
    */
    projectContainer.innerHTML = "";
    /*Loop Array ke har project par chalega.*/
    projectList.forEach((project)=>{
        /*Card Create createElement() Browser me naya div banata hai. */
        const card = document.createElement("div");
        /*CSS Class card ko project-card class de rahe hain.*/
        card.classList.add("project-card");
        /*HTML Insert Card ke andar ka HTML.*/

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span>${project.category}</span>
            <div class="project-buttons">
                <a href="${project.live}" target="_blank">
                    Live Demo
                </a>
                <a href="${project.github}" target="_blank">
                    GitHub
                </a>
            </div>`;
            /* ==========CARD CLICK EVENT==========*/
card.addEventListener("click", () => {
    modal.classList.add("show");
    modalContent.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <p>
            <strong>Category :</strong>
            ${project.category}
        </p>
        <div class="modal-buttons">
            <a href="${project.live}" target="_blank">
                Live Demo
            </a>
            <a href="${project.github}" target="_blank">
                GitHub
            </a>
        </div>`;
});
        /*Card Screen par Add.*/
        projectContainer.appendChild(card);
    });
}
        /*Website Load  ↓  Function Call*/

// displayProjects(projects);
/* ==============MODAL ELEMENTS================= */
const modal = document.querySelector("#project-modal");
const modalContent = document.querySelector("#modal-content");
const closeModal = document.querySelector("#close-modal");
/* =============FILTER BUTTONS=========== */
/*Saare Filter Buttons NodeList Return karega.*/

const filterButtons = document.querySelectorAll(".filter-btn");
/*Saare Buttons par loop.*/

filterButtons.forEach((button)=>{
    /*Click Event*/

    button.addEventListener("click",()=>{

        /*Filter Name,Example
        html
        css
        javascript
        firebase
        */
        const category = button.dataset.filter;
        /*Sab buttons se  active  remove.*/

filterButtons.forEach((btn)=>{
    btn.classList.remove("active");
});

/*============Jis button par click hua  usi par active.=========*/

button.classList.add("active");
        /*Agar All  button hai */

if(category==="all"){
    displayProjects(projects);
}
/*--------filter() Sirf matching data return karega.-------*/

const filteredProjects = projects.filter((project)=>{
    return project.category===category;
        });
    });
});
/* ============== LIVE SEARCH===============/*
Search Input Select*/
const searchInput = document.querySelector("#search-input");
/*Input Event  Har baar user kuch type karega  ye event chalega*/

searchInput.addEventListener("input", () => {

    /*User ne jo text likha.*/
    const searchText = searchInput.value.toLowerCase();
    /*Filter array.*/

    const result = projects.filter((project)=>{
        /*Project Name  Lowercase taki Weather aur weather dono same ho */
        return project.title
        .toLowerCase()
        .includes(searchText);
    });
    /*Screen Update*/
    displayProjects(result);
});
/* ============CLOSE MODAL=========== */
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});