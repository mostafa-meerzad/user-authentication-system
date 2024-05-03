const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const users = [];

app.use(express.json());

app.post("/signup", async (req, res) => {
  // parse req.body to get needed fields
  const { username, password } = req.body;
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
    res.cookie(token, token, { httpOnly: true, secure: true });
    res
      .status(201)
      .json({ message: "User created", userId: newUser.id, token });
  } catch (err) {
    res.status(500).json({ message: "Error registering new user" });
  }
});
