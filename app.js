require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

require("dotenv").config();

const passport = require("passport");
require("./src/config/passport");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const path = require("path");
const { renderToString } = require("react-dom/server");
const fs = require("fs");

const app = express();
const React = require("react");
const Embed = require("./src/components/Embed.jsx").default;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.static("public"));

const integrationRoutes = require("./src/routes/IntegrationRoutes");
const authRoutes = require("./src/routes/AuthRoutes");
const spaceRoutes = require("./src/routes/SpaceRoutes");
const reviewRoutes = require("./src/routes/ReviewRoutes");

app.use("/api/integrations", integrationRoutes);
app.use("/api", authRoutes);
app.use("/api", spaceRoutes);
app.use("/api", reviewRoutes);

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

app.get("/login", (req, res) => {
  res.redirect("http://localhost:5173/signin");
});

app.get("/embed/:type/:spaceId", async (req, res) => {
  const { type, spaceId } = req.params;
  let reviews = [];
  try {
    const response = await fetch(
      `http://localhost:5000/api/reviews/${spaceId}/liked`
    );
    reviews = await response.json();
    reviews = reviews.reviews;
    console.log(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
  const componentMarkup = renderToString(
    <Embed type={type} reviews={reviews} />
  );

  const html = fs.readFileSync(
    path.resolve(__dirname, "views", "index.html"),
    "utf8"
  );

  console.log(path.resolve(__dirname, "views", "index.html"));

  const finalHtml = html.replace("<!-- APP -->", componentMarkup);

  res.send(finalHtml);
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
