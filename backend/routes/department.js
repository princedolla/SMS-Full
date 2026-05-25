const router = require("express").Router();
const db = require("../db");

// ==========================
// GET ALL DEPARTMENTS
// ==========================
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM Department
    ORDER BY dep_id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);
  });
});

// ==========================
// ADD DEPARTMENT
// ==========================
router.post("/add", (req, res) => {
  const department_name = req.body.department_name;

  // check if exists
  const checkSql = `
    SELECT * FROM Department WHERE department_name = ?
  `;

  db.query(checkSql, [department_name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "Department Already Exists",
      });
    }

    // insert new department
    const insertSql = `
      INSERT INTO Department (department_name)
      VALUES (?)
    `;

    db.query(insertSql, [department_name], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        message: "Department Added Successfully",
      });
    });
  });
});

// ==========================
// UPDATE DEPARTMENT
// ==========================
router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const department_name = req.body.department_name;

  const sql = `
    UPDATE Department
    SET department_name = ?
    WHERE dep_id = ?
  `;

  db.query(sql, [department_name, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      message: "Department Updated Successfully",
    });
  });
});

// ==========================
// DELETE DEPARTMENT
// ==========================
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    DELETE FROM Department
    WHERE dep_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      message: "Department Deleted Successfully",
    });
  });
});

module.exports = router;
