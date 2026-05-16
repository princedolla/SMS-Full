const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "All fields are required",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (result.length > 0) {
        return res.json({
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name, email, hashedPassword],
        (err) => {
          if (err) {
            return res.json(err);
          }

          res.json({
            message: "User Registered Successfully",
          });
        },
      );
    },
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (result.length === 0) {
        return res.json({
          message: "User not found",
        });
      }

      const user = result[0];

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.json({
          message: "Wrong password",
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log("Token generated:", token);
      res.json({
        token,
        message: "Login Success",
      });
    },
  );
});

module.exports = router;
