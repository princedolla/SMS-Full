import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [department_name, setDepartmentName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getDepartments();
  }, []);

  // GET DEPARTMENTS
  const getDepartments = async () => {
    const res = await axios.get("http://localhost:5000/department");
    setDepartments(res.data);
  };

  // ADD DEPARTMENT
  const addDepartment = async () => {
    if (!department_name) {
      alert("Department Name Required");
      return;
    }

    const existing = departments.find(
      (dep) =>
        dep.department_name.toLowerCase() === department_name.toLowerCase(),
    );

    if (existing) {
      alert("Department Already Exists");
      return;
    }

    await axios.post("http://localhost:5000/department/add", {
      department_name,
    });

    alert("Department Added Successfully");
    setDepartmentName("");
    getDepartments();
  };

  // DELETE DEPARTMENT
  const deleteDepartment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmDelete) return;

    await axios.delete(`http://localhost:5000/department/delete/${id}`);

    alert("Department Deleted Successfully");
    getDepartments();
  };

  // EDIT DEPARTMENT
  const editDepartment = (dep) => {
    setDepartmentName(dep.department_name);
    setEditId(dep.dep_id);
  };

  // UPDATE DEPARTMENT
  const updateDepartment = async () => {
    if (!department_name) {
      alert("Department Name Required");
      return;
    }

    await axios.put(`http://localhost:5000/department/update/${editId}`, {
      department_name,
    });

    alert("Department Updated Successfully");
    setDepartmentName("");
    setEditId(null);
    getDepartments();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="p-10 w-full">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Departments Management
          </h1>
          <p className="text-gray-500 mt-2">
            Add, edit and manage company departments
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Department Name"
              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={department_name}
              onChange={(e) => setDepartmentName(e.target.value)}
            />

            {editId ? (
              <button
                onClick={updateDepartment}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl shadow"
              >
                Update Department
              </button>
            ) : (
              <button
                onClick={addDepartment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
              >
                Add Department
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Department Name</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.length > 0 ? (
                departments.map((dep) => (
                  <tr key={dep.dep_id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{dep.dep_id}</td>
                    <td className="p-4 font-medium">{dep.department_name}</td>
                    <td className="p-4 flex gap-3">
                      <button
                        onClick={() => editDepartment(dep)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteDepartment(dep.dep_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-500">
                    No Departments Found
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

export default Departments;
