const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

app.post("/register", (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, terms } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    password !== confirmPassword ||
    !terms
  ) {
    return res.render("register", {
      error: "Please fill all fields correctly and accept terms.",
    });
  }

  res.render("success", { firstName });
});

app.get("/", (req, res) => {
  res.redirect("/register");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
