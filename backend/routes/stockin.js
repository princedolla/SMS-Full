const router = require("express").Router();
const db = require("../db");

router.post("/", (req, res) => {

  const { stock_id, quantity } = req.body;

  db.query(
    "INSERT INTO stockin(stock_id,quantity) VALUES(?,?)",
    [stock_id, quantity],
    (err) => {

      if (err) {
        return res.json(err);
      }

      db.query(
        "UPDATE stock SET quantity = quantity + ? WHERE id=?",
        [quantity, stock_id]
      );

      res.json({
        message: "Stock Added Successfully"
      });
    }
  );
});

router.get("/", (req, res) => {

  db.query(
    `SELECT
      stock.product_name,
      stockin.quantity,
      stockin.date
     FROM stockin
     JOIN stock ON stock.id = stockin.stock_id
     ORDER BY stockin.id DESC`,
    (err, result) => {

      if (err) {
        return res.json(err);
      }

      res.json(result);
    }
  );
});

module.exports = router;