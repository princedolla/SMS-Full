const router = require("express").Router();
const db = require("../db");

router.get("/summary", (req, res) => {

  db.query(
    `SELECT
      product_name,
      quantity,
      price,
      quantity * price AS total
     FROM stock`,
    (err, result) => {

      if (err) {
        return res.json(err);
      }

      res.json(result);
    }
  );
});

module.exports = router;