require("dotenv").config();

const passport = require("passport");
require("./src/config/passport");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const integrationRoutes = require("./src/routes/IntegrationRoutes");
const authRoutes = require("./src/routes/AuthRoutes");
const spaceRoutes = require("./src/routes/SpaceRoutes");

app.use("/api/integrations", integrationRoutes);
app.use("/api", authRoutes);
app.use("/api", spaceRoutes);

const mongoURI = process.env.MONGO_URI;

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["openid", "profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.redirect(`http://localhost:5173/signin?token=${token}`);
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Cannot connect to database! ", err);
  });

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
