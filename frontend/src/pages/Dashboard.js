import Sidebar from "../components/Sidebar";
function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-10 w-full bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-10">Dashboard</h1>
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-white p-5 shadow rounded">
            <h1 className="text-2xl font-bold">Employees</h1>
          </div>
          <div className="bg-white p-5 shadow rounded">
            <h1 className="text-2xl font-bold">Departments</h1>
          </div>
          <div className="bg-white p-5 shadow rounded">
            <h1 className="text-2xl font-bold">Job Roles</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
