import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Products Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-green-500 mb-2">Products</h2>

            <p className="text-gray-600">Manage all products in stock.</p>
          </div>

          {/* Stock In Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-blue-500 mb-2">Stock In</h2>

            <p className="text-gray-600">Add new stock into inventory.</p>
          </div>

          {/* Stock Out Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-red-500 mb-2">Stock Out</h2>

            <p className="text-gray-600">Remove sold or used products.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
