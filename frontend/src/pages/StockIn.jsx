import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function StockIn() {
  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState([]);

  const [stock_id, setStockId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    getProducts();
    getRecords();
  }, []);

  const getProducts = async () => {
    const res = await API.get("/products");

    setProducts(res.data);
  };

  const getRecords = async () => {
    const res = await API.get("/stockin");

    setRecords(res.data);
  };

  const addStock = async () => {
    await API.post("/stockin", {
      stock_id,
      quantity,
    });

    alert("Stock Added");

    getRecords();
  };

  return (
    <div>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">Stock In</h1>

        <div className="bg-white p-5 rounded shadow mb-5">
          <select
            className="border p-2 mr-3"
            onChange={(e) => setStockId(e.target.value)}
          >
            <option>Select Product</option>

            {products.map((product) => (
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

          <button onClick={addStock} className="bg-green-500 text-white p-2">
            Add Stock
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
            {records.map((record, index) => (
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

export default StockIn;
