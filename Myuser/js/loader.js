/* =====================================================
                PREMIUM LOADER
===================================================== */

/*
Loader

Select
*/

const loader = document.querySelector("#loader");

/*
Progress Bar

Select
*/

const progress = document.querySelector(".loading-progress");

/*
Loading Text

Select
*/

const loadingText = document.querySelector(".loading-text");

/*
Starting Value

0%
*/

let percentage = 0;

/*
Loading Messages

Array
*/

const messages = [

    "Initializing...",

    "Loading HTML...",

    "Loading CSS...",

    "Loading JavaScript...",

    "Preparing Projects...",

    "Almost Ready..."

];

/*
Timer

Har 40ms me chalega.
*/

const loading = setInterval(()=>{

    /*
    Percentage Increase
    */

    percentage++;

    /*
    Progress Width
    */

    progress.style.width = percentage + "%";

    /*
    Different Messages
    */

    if(percentage <20){

        loadingText.textContent=messages[0];

    }

    else if(percentage<40){

        loadingText.textContent=messages[1];

    }

    else if(percentage<60){

        loadingText.textContent=messages[2];

    }

    else if(percentage<80){

        loadingText.textContent=messages[3];

    }

    else if(percentage<95){

        loadingText.textContent=messages[4];

    }

    else{

        loadingText.textContent=messages[5];

    }

    /*
    Finish
    */

    if(percentage>=100){

        clearInterval(loading);

        setTimeout(()=>{

            loader.classList.add("loader-hide");

        },500);

    }

},40);