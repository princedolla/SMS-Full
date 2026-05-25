import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Reports() {

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalJobRoles, setTotalJobRoles] = useState(0);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    try {

      // TOTAL EMPLOYEES
      const employeesRes = await axios.get(
        "http://localhost:5000/report/employees"
      );

      // ACTIVE EMPLOYEES
      const activeRes = await axios.get(
        "http://localhost:5000/report/active"
      );

      // TOTAL DEPARTMENTS
      const depRes = await axios.get(
        "http://localhost:5000/report/departments"
      );

      // TOTAL JOB ROLES
      const jobRes = await axios.get(
        "http://localhost:5000/report/jobroles"
      );

      setTotalEmployees(
        employeesRes.data[0].totalEmployees
      );

      setActiveEmployees(
        activeRes.data[0].activeEmployees
      );

      setTotalDepartments(
        depRes.data[0].totalDepartments
      );

      setTotalJobRoles(
        jobRes.data[0].totalJobRoles
      );

    } catch (err) {
      console.log(err);
      alert("Failed to load reports");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="p-10 w-full">

        <h1 className="text-4xl font-bold mb-10">
          Reports Dashboard
        </h1>

        {/* REPORT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* TOTAL EMPLOYEES */}
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              Total Employees
            </h2>

            <p className="text-5xl font-bold">
              {totalEmployees}
            </p>
          </div>

          {/* ACTIVE EMPLOYEES */}
          <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              Active Employees
            </h2>

            <p className="text-5xl font-bold">
              {activeEmployees}
            </p>
          </div>

          {/* TOTAL DEPARTMENTS */}
          <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              Total Departments
            </h2>

            <p className="text-5xl font-bold">
              {totalDepartments}
            </p>
          </div>

          {/* TOTAL JOB ROLES */}
          <div className="bg-orange-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              Total Job Roles
            </h2>

            <p className="text-5xl font-bold">
              {totalJobRoles}
            </p>
          </div>

        </div>

        {/* REPORT TABLE */}
        <div className="bg-white mt-10 p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            HRMS Summary Report
          </h2>

          <table className="w-full border">

            <thead className="bg-gray-200">

              <tr>
                <th className="border p-4 text-left">
                  Report Type
                </th>

                <th className="border p-4 text-left">
                  Total
                </th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td className="border p-4">
                  Total Employees
                </td>

                <td className="border p-4">
                  {totalEmployees}
                </td>
              </tr>

              <tr>
                <td className="border p-4">
                  Active Employees
                </td>

                <td className="border p-4">
                  {activeEmployees}
                </td>
              </tr>

              <tr>
                <td className="border p-4">
                  Total Departments
                </td>

                <td className="border p-4">
                  {totalDepartments}
                </td>
              </tr>

              <tr>
                <td className="border p-4">
                  Total Job Roles
                </td>

                <td className="border p-4">
                  {totalJobRoles}
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;