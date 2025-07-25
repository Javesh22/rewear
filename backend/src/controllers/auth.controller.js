import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required." });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already registered." });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password_hash: hashed });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                points: user.points,
                is_admin: user.is_admin ,
            },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials." });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                points: user.points,
                is_admin: user.is_admin,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error." });
    }
};

export const Me = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized." });
    }
    res.json({ user: req.user });
};