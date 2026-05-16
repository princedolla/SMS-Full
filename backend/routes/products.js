const router = require("express").Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM stock ORDER BY id DESC", (err, result) => {
    if (err) {
      return res.json(err);
    }

    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { product_name, quantity, price } = req.body;

  db.query(
    "INSERT INTO stock(product_name,quantity,price) VALUES(?,?,?)",
    [product_name, quantity, price],
    (err) => {
      if (err) {
        return res.json(err);
      }

      res.json({
        message: "Product Added Successfully",
      });
    },
  );
});

router.put("/:id", (req, res) => {
  const { product_name, quantity, price } = req.body;

  db.query(
    "UPDATE stock SET product_name=?, quantity=?, price=? WHERE id=?",
    [product_name, quantity, price, req.params.id],
    (err) => {
      if (err) {
        return res.json(err);
      }

      res.json({
        message: "Product Updated Successfully",
      });
    },
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM stockin WHERE stock_id = ?", [id], (err) => {
    if (err) {
      return res.json({
        message: "Error deleting stockin data",
      });
    }
    db.query("DELETE FROM stockout WHERE stock_id = ?", [id], (err) => {
      if (err) {
        return res.json({
          message: "Error deleting stockout data",
        });
      }
      db.query("DELETE FROM stock WHERE id = ?", [id], (err) => {
        if (err) {
          return res.json({
            message: "Error deleting product",
          });
        }

        res.json({
          message: "Product Deleted Successfully",
        });
      });
    });
  });
});
module.exports = router;
