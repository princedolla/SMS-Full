const router = require("express").Router();
const db = require("../db");

router.post("/", (req, res) => {

  const { stock_id, quantity } = req.body;

  db.query(
    "SELECT quantity FROM stock WHERE id=?",
    [stock_id],
    (err, result) => {

      if (result.length === 0) {
        return res.json({
          message: "Product not found"
        });
      }

      const currentQuantity = result[0].quantity;

      if (currentQuantity < quantity) {
        return res.json({
          message: "Not enough stock"
        });
      }

      db.query(
        "INSERT INTO stockout(stock_id,quantity) VALUES(?,?)",
        [stock_id, quantity]
      );

      db.query(
        "UPDATE stock SET quantity = quantity - ? WHERE id=?",
        [quantity, stock_id]
      );

      res.json({
        message: "Stock Removed Successfully"
      });
    }
  );
});

router.get("/", (req, res) => {

  db.query(
    `SELECT
      stock.product_name,
      stockout.quantity,
      stockout.date
     FROM stockout
     JOIN stock ON stock.id = stockout.stock_id
     ORDER BY stockout.id DESC`,
    (err, result) => {

      if (err) {
        return res.json(err);
      }

      res.json(result);
    }
  );
});

module.exports = router;