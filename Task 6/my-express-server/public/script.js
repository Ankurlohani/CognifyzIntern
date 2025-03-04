document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        alert(data.message || data.error);
    });

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        alert(data.message || data.error);
    });
});
