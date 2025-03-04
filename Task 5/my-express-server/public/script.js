document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");

    fetchUsers(); // Load users on page load

    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (name === "" || email === "") {
            alert("⚠ Please fill in all fields!");
            return;
        }

        fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(data => {
            fetchUsers(); // Refresh user list
            userForm.reset();
        })
        .catch(error => console.error("Error:", error));
    });

    function fetchUsers() {
        fetch("/api/users")
        .then(response => response.json())
        .then(users => {
            userList.innerHTML = "";
            users.forEach(user => {
                const li = document.createElement("li");
                li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                li.innerHTML = `<span>${user.name} (${user.email})</span>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>`;
                userList.appendChild(li);
            });
        });
    }

    window.deleteUser = function (id) {
        if (confirm("Are you sure you want to delete this user?")) {
            fetch(`/api/users/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(() => fetchUsers())
            .catch(error => console.error("Error:", error));
        }
    };
});
