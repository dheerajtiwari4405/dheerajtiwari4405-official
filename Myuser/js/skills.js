/* ======= PORTFOLIO SKILLS========== */


/* ========== DOM== */

const portfolioSkillList = document.getElementById("portfolio-skill-list");


/* ==========================================================
                ARRAY
========================================================== */

let portfolioSkills = [];


/* ==========================================================
            FIRESTORE REALTIME
========================================================== */

db.collection("skills").onSnapshot((snapshot)=>{
    portfolioSkills=[];
    snapshot.forEach((doc)=>{
        portfolioSkills.push({
            id:doc.id,...doc.data()
        });
    });
    renderPortfolioSkills();
   
});
/* ==========================================================
                RENDER PORTFOLIO SKILLS
========================================================== */

function renderPortfolioSkills(){

    // Empty Container

    portfolioSkillList.innerHTML = "";

    // No Skill

    if(portfolioSkills.length === 0){

        portfolioSkillList.innerHTML = `

        <div class="empty-skill">

            <i class="fa-solid fa-code"></i>

            <h2>

                No Skills Available

            </h2>

            <p>

                Skills will appear here automatically.

            </p>

        </div>

        `;

        return;

    }

    // Loop

    portfolioSkills.forEach((skill)=>{

        const card = document.createElement("div");

        card.className = "portfolio-skill-card";

        card.innerHTML = `

        <div class="skill-header">

            <h3>

                ${skill.name}

            </h3>

            <i class="${skill.icon}"></i>

        </div>

        <p class="skill-type">

            ${skill.category}

        </p>

        <p class="skill-number">

            ${skill.percent}%

        </p>

        <div class="progress">

            <div

                class="progress-bar"

                style="width:${skill.percent}%">

            </div>

        </div>

        `;

        portfolioSkillList.appendChild(card);

    });

}
/* ==========================================================
                SKILL ANIMATION
========================================================== */

function animateSkills() {

    const cards = document.querySelectorAll(".portfolio-skill-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition =
                "all .6s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, index * 150);

    });

}


/* ==========================================================
            PROGRESS BAR ANIMATION
========================================================== */

function animateProgress() {

    const bars =
        document.querySelectorAll(".progress-bar");

    bars.forEach(bar => {

        const width = bar.style.width;

        bar.style.width = "0%";

        setTimeout(() => {

            bar.style.transition =
                "width 1.5s ease";

            bar.style.width = width;

        }, 300);
         portfolioSkillList.appendChild(card);
    });

    animateSkills();

animateProgress();

}