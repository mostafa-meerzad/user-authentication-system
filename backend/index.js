const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const PORT = 3000;
const users = [];

app.use(express.json());

//configure passport's localStrategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((user) => user.username === username);
    if (!user) return done(null, false);
    if (!bcrypt.compare(password, user.password)) return done(null, false);
    return done(null, user);
  })
);

app.post("/signup", async (req, res) => {
  // parse req.body to get needed fields
  const { username, password } = req.body;
  console.log(username)
  console.log(password)
  // check if user already exists
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }

  try {
    // hash password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };
    users.push(newUser);

    // generate JWT
    const token = jwt.sign({ userId: newUser.id }, "my-app-secret", {
      expiresIn: "1h",
    });
    // send token in a cookie
    // res.cookie("token", token, { httpOnly: true, secure: true });
    console.log("token created")
    res
      .status(201)
      .json({ message: "User created", userId: newUser.id, token });
  } catch (err) {
    res.status(500).json({ message: "Error registering new user" });
  }
});

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwt.sign(req.body.userId, "my-app-secret", {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ success: true, token });
  }
);

app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
});
