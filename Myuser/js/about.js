/* ==========================================================
                ABOUT COUNTER ANIMATION
========================================================== */

/*STEP 1  Counter wale sabhi elements select kar rahe hain.  Ye NodeList return karega*/
const counters = document.querySelectorAll(".counter");

/*STEP 2
Counter chalane wala function. Parameter counter Yani jis element ko animate karna hai*/
function startCounter(counter){
    /* Target value. HTML se data-target read kar rahe hain. Example data-target="25"*/
    const target = Number(counter.dataset.target);
    /*Current value.Start 0 se*/
    let current = 0;
    /*Har update me kitna increase hoga.*/
    const increment = Math.ceil(target / 100);
    /* Interval start. */
    const timer = setInterval(()=>{
        current += increment;
        if(current >= target){
            current = target;
            clearInterval(timer);
        }
        counter.textContent = current;
    },20);
}
/*STEP 3 Intersection Observer Counter tabhi chalega jab About section screen me aaye*/
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
},{threshold:0.5});
/*STEP 4  Sabhi counters observe karo*/
counters.forEach((counter)=>{
    observer.observe(counter);
});