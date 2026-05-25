const router = require("express").Router();
const db = require("../db");

// ==========================
// GET EMPLOYEES
// ==========================
router.get("/", (req, res) => {
  const sql = `
    SELECT Employee.*, Department.department_name, JobRole.jobTitle
    FROM Employee
    LEFT JOIN Department ON Employee.dep_id = Department.dep_id
    LEFT JOIN JobRole ON Employee.jobid = JobRole.jobid ORDER BY Employee.emp_id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.json(result);
  });
});

// ==========================
// ADD EMPLOYEE
// ==========================
router.post("/add", (req, res) => {
  const { name, address, hireDate, status, dep_id, jobid } = req.body;

  const sql = `
    INSERT INTO Employee (name, address, hireDate, status, dep_id, jobid)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, address, hireDate, status, dep_id, jobid], (err) => {
    if (err) return res.send(err);

    res.send("Employee Added");
  });
});

// ==========================
// EDIT / UPDATE EMPLOYEE
// ==========================
router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, address, hireDate, status, dep_id, jobid } = req.body;

  const sql = `
    UPDATE Employee
    SET name = ?, address = ?, hireDate = ?, status = ?, dep_id = ?, jobid = ?
    WHERE emp_id = ?
  `;

  db.query(sql, [name, address, hireDate, status, dep_id, jobid, id], (err) => {
    if (err) return res.send(err);

    res.send("Employee Updated");
  });
});

// ==========================
// DELETE EMPLOYEE
// ==========================
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    DELETE FROM Employee
    WHERE emp_id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) return res.send(err);

    res.send("Employee Deleted");
  });
});

module.exports = router;
