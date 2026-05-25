const router = require("express").Router();
const db = require("../db");

// TOTAL EMPLOYEES
router.get("/employees", (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalEmployees
    FROM Employee
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// ACTIVE EMPLOYEES
router.get("/active", (req, res) => {
  const sql = `
    SELECT COUNT(*) AS activeEmployees
    FROM Employee
    WHERE status='Active'
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// TOTAL DEPARTMENTS
router.get("/departments", (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalDepartments
    FROM Department
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// TOTAL JOB ROLES
router.get("/jobroles", (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalJobRoles
    FROM JobRole
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
