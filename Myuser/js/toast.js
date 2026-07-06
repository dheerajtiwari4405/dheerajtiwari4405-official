/* ==========================================================
                TOAST NOTIFICATION SYSTEM
========================================================== */

/*
------------------------------------------------------------
Toast Select
------------------------------------------------------------
*/

const toast = document.querySelector("#toast");

/*
------------------------------------------------------------
Function

message

type

success

error

------------------------------------------------------------
*/

function showToast(message,type){

    /*
    Previous Class Remove
    */

    toast.className="";

    /*
    Text
    */

    toast.textContent=message;

    /*
    Success
    */

    if(type==="success"){

        toast.classList.add("toast-success");

    }

    /*
    Error
    */

    else{

        toast.classList.add("toast-error");

    }

    /*
    Show
    */

    toast.classList.add("show");

    /*
    Hide After 3 Seconds
    */

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}