import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AdminDashboard from "../Layouts/adminDashboard";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import ControlPanel from "../Pages/ControlPanel";


const router = createBrowserRouter([
    {
        path: '/', element: <Main />,
        children: [
            {
                path: '/', element: <Home />
            },
            {
                path: '/authentication/login', element: <Login />
            },
            {
                path: '/authentication/register', element: <SignUp />
            },
            
        ]
    },

    {
        path: '/admin/dashboard', element: <AdminDashboard />,
        children: [
            {
                path: '/admin/dashboard/control-panel', element: <ControlPanel />
            },
        ]
    }
])
export default router;