const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a New User
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: false }).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

// Logout User
exports.logout = (req, res) => {
    res.clearCookie("token").json({ message: "Logout successful" });
};
