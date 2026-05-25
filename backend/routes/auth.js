const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const sql = `INSERT INTO Users(name,email,password) VALUES(?,?,?)`;
  db.query(sql, [name, email, hashPassword], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Registration Successful");
    }
  });
});


// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM Users WHERE email=?`;
  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.send(err);
    }
    if (result.length == 0) {
      return res.send("User Not Found");
    }
    const user = result[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.send("Wrong Password");
    }
    const token = jwt.sign({ id: user.u_id }, "secretkey");
    res.json({message: "Login Success",token: token,});
  });
});
module.exports = router;
