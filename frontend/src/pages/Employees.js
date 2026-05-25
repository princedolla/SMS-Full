import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");

  const [editId, setEditId] = useState(null);

  // LOAD EMPLOYEES
  useEffect(() => {
    getEmployees();
  }, []);

  // GET EMPLOYEES
  const getEmployees = async () => {
    const res = await axios.get("http://localhost:5000/employee");
    setEmployees(res.data);
  };

  // CLEAR FORM
  const clearForm = () => {
    setName("");
    setAddress("");
    setStatus("Active");
    setEditId(null);
  };

  // ADD EMPLOYEE
  const addEmployee = async () => {
    if (!name || !address) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/employee/add", {
      name,
      address,
      hireDate: "2026-01-01",
      status,
      dep_id: 1,
      jobid: 1,
    });

    alert("Employee Added");

    clearForm();
    getEmployees();
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:5000/employee/delete/${id}`);

    alert("Employee Deleted");
    getEmployees();
  };

  // CLICK EDIT BUTTON
  const editEmployee = (emp) => {
    setName(emp.name);
    setAddress(emp.address);
    setStatus(emp.status);
    setEditId(emp.emp_id);
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async () => {
    if (!name || !address) {
      alert("Please fill all fields");
      return;
    }

    await axios.put(`http://localhost:5000/employee/update/${editId}`, {
      name,
      address,
      hireDate: "2026-01-01",
      status,
      dep_id: 1,
      jobid: 1,
    });

    alert("Employee Updated");

    clearForm();
    getEmployees();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Employees Management</h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Employee Name"
              className="border p-3 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <select
              className="border p-3 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Retired">Retired</option>
            </select>

            {/* ADD / UPDATE BUTTON */}
            {editId ? (
              <button
                onClick={updateEmployee}
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-5 py-3"
              >
                Update Employee
              </button>
            ) : (
              <button
                onClick={addEmployee}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-5 py-3"
              >
                Add Employee
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Job Role</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.emp_id} className="border-b">
                    <td className="p-4">{emp.emp_id}</td>
                    <td className="p-4">{emp.name}</td>
                    <td className="p-4">{emp.address}</td>
                    <td className="p-4">{emp.status}</td>
                    <td className="p-4">{emp.department_name}</td>
                    <td className="p-4">{emp.jobTitle}</td>

                    <td className="p-4 flex gap-2">
                      {/* EDIT */}
                      <button
                        onClick={() => editEmployee(emp)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteEmployee(emp.emp_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-6 text-gray-500">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;
