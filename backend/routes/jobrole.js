const router = require("express").Router();
const db = require("../db");

// ==========================
// GET JOB ROLES
// ==========================
router.get("/", (req, res) => {
  const sql = `
    SELECT * FROM JobRole
    ORDER BY jobid DESC
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
// ADD JOB ROLE
// ==========================
router.post("/add", (req, res) => {
  const { jobTitle, qualification, status } = req.body;

  // CHECK DUPLICATE
  const checkSql = `
    SELECT * FROM JobRole WHERE jobTitle = ?
  `;

  db.query(checkSql, [jobTitle], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "Job Role Already Exists",
      });
    }

    // INSERT JOB ROLE
    const sql = `
      INSERT INTO JobRole (jobTitle, qualification, status)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [jobTitle, qualification, status], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        message: "Job Role Added Successfully",
      });
    });
  });
});

// ==========================
// UPDATE JOB ROLE
// ==========================
router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { jobTitle, qualification, status } = req.body;

  const sql = `
    UPDATE JobRole
    SET jobTitle = ?, qualification = ?, status = ?
    WHERE jobid = ?
  `;

  db.query(sql, [jobTitle, qualification, status, id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      message: "Job Role Updated Successfully",
    });
  });
});

// ==========================
// DELETE JOB ROLE
// ==========================
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    DELETE FROM JobRole
    WHERE jobid = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      message: "Job Role Deleted Successfully",
    });
  });
});

module.exports = router;
