const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form page using EJS
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/submit", (req, res) => {
    const { name, email } = req.body;
    res.render("response", { name, email });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
