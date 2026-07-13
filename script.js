// Katli's Cosmetics — site scripts
// Owner inbox for Contact & Feedback form submissions
const OWNER_EMAIL = "katlegoishmael07@gmail.com";

/**
 * Wires up a Bootstrap-validated form so that, on a valid submission,
 * it builds a mailto: link from the field values and opens the
 * visitor's email app with the message pre-filled for Katli's Cosmetics.
 */
function setupMailtoForm(formId, successId, subjectPrefix) {
    const form = document.getElementById(formId);
    if (!form) return;

    const successBox = document.getElementById(successId);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        const data = new FormData(form);
        const lines = [];
        for (const [key, value] of data.entries()) {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            lines.push(`${label}: ${value}`);
        }

        const subject = encodeURIComponent(`${subjectPrefix} — ${data.get("name") || "Website visitor"}`);
        const body = encodeURIComponent(lines.join("\n"));

        window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;

        if (successBox) {
            successBox.classList.add("show");
        }

        form.reset();
        form.classList.remove("was-validated");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setupMailtoForm("contactForm", "contactSuccess", "Booking Enquiry");
    setupMailtoForm("feedbackForm", "feedbackSuccess", "Customer Feedback");
});
