const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary storage (simulating database)
let formDataStore = [];

// Serve the form page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission with server-side validation
app.post("/submit", (req, res) => {
    const { name, email, phone, message } = req.body;
    let errors = {};

    // Server-side validation
    if (!name) errors.name = "Name is required.";
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.email = "Invalid email format.";
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
        errors.phone = "Phone must be a 10-digit number.";
    }

    // If errors exist, re-render the form with errors
    if (Object.keys(errors).length > 0) {
        return res.render("index", { errors });
    }

    // Store validated data in temporary storage
    formDataStore.push({ name, email, phone, message });

    // Render response page
    res.render("response", { name, email, phone, message });
});

// View stored form data (for testing)
app.get("/data", (req, res) => {
    res.json(formDataStore);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
