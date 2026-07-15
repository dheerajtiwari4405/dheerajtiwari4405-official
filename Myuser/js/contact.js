/* =====================================================
                CONTACT FORM
===================================================== */

// Form

const contactForm = document.getElementById("contact-form");

// Inputs

const nameInput = document.getElementById("contact-name");

const emailInput = document.getElementById("contact-email");

const phoneInput = document.getElementById("contact-phone");

const subjectInput = document.getElementById("contact-subject");

const messageInput = document.getElementById("contact-message");


/* =====================================================
                SUBMIT FORM
===================================================== */

contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    // Input Values

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const phone = phoneInput.value.trim();

    const subject = subjectInput.value.trim();

    const message = messageInput.value.trim();


    // Validation

    if (!name || !email || !message) {

        alert("Please fill all required fields.");

        return;

    }


    try {

        // Save Firestore

        await db.collection("messages").add({

            name,

            email,

            phone,

            subject,

            message,

            isRead: false,

            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        });


        alert("✅ Message Sent Successfully.");

        contactForm.reset();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});