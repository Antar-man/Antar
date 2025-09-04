const express = require("express");
const mongoose = require("./db");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("Hello, World!"));
app.use("/auth", authRoutes);   // /auth/signup , /auth/login
app.use("/home", homeRoutes);   // protected route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
