import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import DashboardTopNav from "../components/DashboardTopNav";


const AdminDashboard = () => {
    return (
        <div className="p-5 bg-base-300 dark:bg-white">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-3 hidden md:flex bg-white rounded-md">
            <AdminSidebar />
          </div>
  
          <div className="lg:col-span-9">
            <DashboardTopNav />
            <div className="lg:mx-5 rounded-md border pt-2 bg-white dark:bg-black dark:text-white min-h-screen">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminDashboard;