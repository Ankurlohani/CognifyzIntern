document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const messageInput = document.getElementById("message");
    const submitButton = document.getElementById("submitBtn");
    const passwordStrengthIndicator = document.getElementById("passwordStrength");

    // Real-time validation
    nameInput.addEventListener("input", () => validateField(nameInput, /^[a-zA-Z ]{3,}$/, "Name must be at least 3 characters long"));
    emailInput.addEventListener("input", () => validateField(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email"));
    phoneInput.addEventListener("input", () => validateField(phoneInput, /^\d{10}$/, "Enter a valid 10-digit phone number"));
    passwordInput.addEventListener("input", checkPasswordStrength);

    form.addEventListener("submit", function (event) {
        let isValid = true;

        if (!validateField(nameInput, /^[a-zA-Z ]{3,}$/, "Name must be at least 3 characters long")) isValid = false;
        if (!validateField(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email")) isValid = false;
        if (!validateField(phoneInput, /^\d{10}$/, "Enter a valid 10-digit phone number")) isValid = false;
        if (!checkPasswordStrength()) isValid = false;
        if (messageInput.value.trim() === "") {
            showError(messageInput, "Message cannot be empty");
            isValid = false;
        } else {
            hideError(messageInput);
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function validateField(input, regex, errorMessage) {
        if (!regex.test(input.value)) {
            showError(input, errorMessage);
            return false;
        } else {
            hideError(input);
            return true;
        }
    }

    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = "Weak";
        let color = "red";

        if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
            strength = "Strong";
            color = "green";
        } else if (password.length >= 6) {
            strength = "Medium";
            color = "orange";
        }

        passwordStrengthIndicator.textContent = `Strength: ${strength}`;
        passwordStrengthIndicator.style.color = color;

        return strength !== "Weak";
    }

    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    function hideError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = "none";
    }

    // Client-Side Routing for Smooth Page Navigation
    const links = document.querySelectorAll("a[data-route]");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const route = this.getAttribute("data-route");

            fetch(route)
                .then(response => response.text())
                .then(html => {
                    document.querySelector(".container").innerHTML = html;
                    history.pushState(null, "", route);
                });
        });
    });

    window.addEventListener("popstate", function () {
        location.reload();
    });
});
