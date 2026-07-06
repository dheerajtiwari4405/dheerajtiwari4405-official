/* ==========================================================
            CONTACT FORM VALIDATION
========================================================== */

/*
-------------------------------------------------------------
STEP 1

Form Select

-------------------------------------------------------------
*/

const contactForm = document.querySelector("#contact-form");

/*
-------------------------------------------------------------
Submit Event

-------------------------------------------------------------
*/

contactForm.addEventListener("submit",(event)=>{

    /*
    Page Refresh Stop

    */

    event.preventDefault();

    /*
    Inputs

    */

    const name=document.querySelector("#name").value.trim();

    const email=document.querySelector("#email").value.trim();

    const phone=document.querySelector("#phone").value.trim();

    const message=document.querySelector("#message").value.trim();

    /*
    Empty Validation

    */

    if(name===""){

        showToast("Please Enter Name","error");

        return;

    }

    if(email===""){

        showToast("Please Enter Email","error");

        return;

    }

    if(phone===""){

        showToast("Please Enter Phone Number","error");

        return;

    }

    if(message===""){

        showToast("Please Enter Message","error");

        return;

    }

    /*
    Success

    */

    showToast("Message Sent Successfully 🚀","success");

    contactForm.reset();

});