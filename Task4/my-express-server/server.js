const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Set up EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static("public"));

// GET request: Render the form page
app.get("/", (req, res) => {
    res.render("index");
});

// POST request: Handle form submission
app.post("/submit", (req, res) => {
    const { name, email, phone, message } = req.body;
    let errors = [];

    // Server-side validation
    if (!name || name.trim() === "") {
        errors.push("Name is required!");
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        errors.push("Invalid email format!");
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        errors.push("Enter a valid 10-digit phone number!");
    }

    if (errors.length > 0) {
        return res.render("index", { errors, name, email, phone, message });
    }

    // Simulate temporary storage (in a real app, store data in a database)
    console.log("Form Submitted Successfully:", { name, email, phone, message });

    // Render success page
    res.render("success", { name });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
