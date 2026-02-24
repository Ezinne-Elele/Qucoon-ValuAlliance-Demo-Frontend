import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "valualliance-demo-secret-2026";

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Update last login
        user.lastLogin = new Date().toISOString().replace("T", " ").slice(0, 16);
        await user.save();

        const token = jwt.sign(
            { userId: user.userId, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: "24h" }
        );
        res.json({
            token,
            user: {
                userId: user.userId, name: user.name, email: user.email,
                role: user.role, department: user.department, initials: user.initials,
                mfaEnabled: user.mfaEnabled,
            },
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/auth/me  — verify token and return user
router.get("/me", async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ userId: decoded.userId }).select("-passwordHash");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (err: any) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});

export default router;
