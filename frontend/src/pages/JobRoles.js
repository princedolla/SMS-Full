import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function JobRoles() {
  const [jobs, setJobs] = useState([]);

  const [jobTitle, setJobTitle] = useState("");
  const [qualification, setQualification] = useState("");
  const [status, setStatus] = useState("Active");

  const [editId, setEditId] = useState(null);

  // LOAD DATA
  useEffect(() => {
    getJobs();
  }, []);

  // GET JOBS
  const getJobs = async () => {
    const res = await axios.get("http://localhost:5000/jobrole");
    setJobs(res.data);
  };

  // CLEAR FORM
  const clearForm = () => {
    setJobTitle("");
    setQualification("");
    setStatus("Active");
    setEditId(null);
  };

  // ADD JOB ROLE
  const addJob = async () => {
    if (!jobTitle || !qualification) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/jobrole/add", {
      jobTitle,
      qualification,
      status,
    });

    alert("Job Role Added Successfully");

    clearForm();
    getJobs();
  };

  // CLICK EDIT
  const editJob = (job) => {
    setJobTitle(job.jobTitle);
    setQualification(job.qualification);
    setStatus(job.status);
    setEditId(job.jobid);
  };

  // UPDATE JOB
  const updateJob = async () => {
    if (!jobTitle || !qualification) {
      alert("Please fill all fields");
      return;
    }

    await axios.put(`http://localhost:5000/jobrole/update/${editId}`, {
      jobTitle,
      qualification,
      status,
    });

    alert("Job Role Updated Successfully");

    clearForm();
    getJobs();
  };

  // DELETE JOB
  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/jobrole/delete/${id}`);

    alert("Job Role Deleted Successfully");

    getJobs();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="p-10 w-full">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Job Roles Management
          </h1>
          <p className="text-gray-500 mt-2">
            Add, edit, and manage job positions
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Job Title"
              className="border p-3 rounded-xl"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Qualification"
              className="border p-3 rounded-xl"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />

            <select
              className="border p-3 rounded-xl"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* ADD / UPDATE BUTTON */}
            {editId ? (
              <button
                onClick={updateJob}
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-5 py-3"
              >
                Update Job Role
              </button>
            ) : (
              <button
                onClick={addJob}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3"
              >
                Add Job Role
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
                <th className="p-4 text-left">Job Title</th>
                <th className="p-4 text-left">Qualification</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.jobid} className="border-b">
                    <td className="p-4">{job.jobid}</td>
                    <td className="p-4 font-medium">{job.jobTitle}</td>
                    <td className="p-4">{job.qualification}</td>
                    <td className="p-4">
                      <span
                        className={
                          job.status === "Active"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {job.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => editJob(job)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteJob(job.jobid)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No Job Roles Found
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

export default JobRoles;
