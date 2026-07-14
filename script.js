const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const formData = new FormData(contactForm);

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "";

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                window.location.href = "thank-you.html";
                return;
            }

            const result = await response.json();

            if (result.errors) {
                formStatus.textContent = result.errors
                    .map(error => error.message)
                    .join(", ");
            } else {
                formStatus.textContent =
                    "Your message could not be sent. Please try again.";
            }
        } catch (error) {
            formStatus.textContent =
                "A connection error occurred. Please try again.";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}