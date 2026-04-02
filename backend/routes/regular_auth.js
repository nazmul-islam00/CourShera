import { Router } from "express";
import prisma from "../db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator";
import validInfo from "../middleware/validInfo";
import authorization from "../middleware/authorization";

const router = Router();

// Register route
router.post("/register", validInfo, async (req, res) => {
    try {
        // Destructure the req.body (name, password, dob, email, etc.)
        const { name, password, dob, email } = req.body;

        // Check for existing user by email
        const existingUser = await prisma.clients.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(401).json("Email already registered");
        }

        // Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Create new user in clients table
        const newUser = await prisma.clients.create({
            data: {
                name,
                password: bcryptPassword,
                date_of_birth: dob ? new Date(dob) : null,
                email,
            },
        });

        // Generate jwt token
        const token = jwtGenerator(newUser.client_id);
        res.json({ token });
        console.log("Succesful Registration");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

//login route

// Login route
router.post("/login", validInfo, async (req, res) => {
    try {
        // Destructure the req.body
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.clients.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json("Password or Email is incorrect");
        }

        // Check if incoming password matches
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        // Generate jwt token
        const token = jwtGenerator(user.client_id);
        res.json({ token });
        console.log("Succesful Login");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

//update route

// Update route
router.put("/update/:id", validInfo, async (req, res) => {
    try {
        // Destructure the req.body (name, password, dob, email, etc.)
        const { name, password, dob, email } = req.body;

        // Find user by id
        const userId = parseInt(req.params.id, 10);
        const user = await prisma.clients.findUnique({ where: { client_id: userId } });
        if (!user) {
            return res.status(404).json("User not found");
        }

        // Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Update user data
        await prisma.clients.update({
            where: { client_id: userId },
            data: {
                name,
                password: bcryptPassword,
                date_of_birth: dob ? new Date(dob) : null,
                email,
            },
        });

        res.status(201).json({ status: "success" });
        console.log("Succesful Update");
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

export default router;