const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let users = []; // Temporary in-memory storage

// ➤ Get all users
app.get("/api/users", (req, res) => {
    res.json(users);
});

// ➤ Add a new user
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// ➤ Update user details
app.put("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = users.find(user => user.id === userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    res.json(user);
});

// ➤ Delete a user
app.delete("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({ message: "User deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
