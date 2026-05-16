import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    const res = await API.get("/reports/summary");

    setReports(res.data);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Reports Summary</h1>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">Product</th>

                <th className="p-3">Quantity</th>

                <th className="p-3">Price</th>

                <th className="p-3">Total Value</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-3">{report.product_name}</td>

                  <td className="p-3">{report.quantity}</td>

                  <td className="p-3">{report.price} FRW</td>

                  <td className="p-3 font-bold text-green-600">
                    {report.total} FRW
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

export default Reports;
