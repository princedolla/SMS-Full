import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Products() {
  const [products, setProducts] = useState([]);

  const [product_name, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await API.get("/products");

    setProducts(res.data);
  };

  const addProduct = async () => {
    await API.post("/products", {
      product_name,
      quantity,
      price,
    });

    alert("Product Added Successfully");

    setProductName("");
    setQuantity("");
    setPrice("");

    getProducts();
  };

  const editProduct = async (id) => {
    const newName = prompt("Enter New Product Name");

    const newQuantity = prompt("Enter New Quantity");

    const newPrice = prompt("Enter New Price");

    await API.put(`/products/${id}`, {
      product_name: newName,
      quantity: newQuantity,
      price: newPrice,
    });

    alert("Product Updated Successfully");

    getProducts();
  };

  const deleteProduct = async (id) => {
    try {
      const res = await API.delete(`/products/${id}`);

      alert(res.data.message);

      getProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Products Management
        </h1>

        {/* Form */}

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-3 rounded"
            />

            <button
              onClick={addProduct}
              className="bg-green-500 hover:bg-green-600 text-white rounded p-3"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">ID</th>

                <th className="p-3">Product Name</th>

                <th className="p-3">Quantity</th>

                <th className="p-3">Price</th>

                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center border-b">
                  <td className="p-3">{product.id}</td>

                  <td className="p-3">{product.product_name}</td>

                  <td className="p-3">{product.quantity}</td>

                  <td className="p-3">{product.price} FRW</td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => editProduct(product.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
