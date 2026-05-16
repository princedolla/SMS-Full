import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function StockOut() {
  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState([]);

  const [stock_id, setStockId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    getProducts();
    getRecords();
  }, []);

  // =========================
  // GET PRODUCTS
  // =========================
  const getProducts = async () => {
    try {
      const res = await API.get("/products");

      console.log("PRODUCTS:", res.data);

      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err.response?.data);

      setProducts([]);
    }
  };

  // =========================
  // GET STOCKOUT RECORDS
  // =========================
  const getRecords = async () => {
    try {
      const res = await API.get("/stockout");

      console.log("RECORDS:", res.data);

      setRecords(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err.response?.data);

      setRecords([]);
    }
  };

  // =========================
  // REMOVE STOCK
  // =========================
  const removeStock = async () => {
    try {
      const res = await API.post("/stockout", {
        stock_id,
        quantity,
      });

      alert(res.data.message);

      getRecords();
    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.message || "Error removing stock");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">Stock Out</h1>

        <div className="bg-white p-5 rounded shadow mb-5">
          <select
            className="border p-2 mr-3"
            onChange={(e) => setStockId(e.target.value)}
          >
            <option value="">Select Product</option>

            {Array.isArray(products) &&
              products.map((product) => (
                <option value={product.id} key={product.id}>
                  {product.product_name}
                </option>
              ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 mr-3"
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button onClick={removeStock} className="bg-red-500 text-white p-2">
            Remove Stock
          </button>
        </div>

        <table className="table-auto w-full bg-white">
          <thead>
            <tr>
              <th className="border p-3">Product</th>

              <th className="border p-3">Quantity</th>

              <th className="border p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(records) &&
              records.map((record, index) => (
                <tr key={index}>
                  <td className="border p-3">{record.product_name}</td>

                  <td className="border p-3">{record.quantity}</td>

                  <td className="border p-3">
                    {new Date(record.date).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockOut;
