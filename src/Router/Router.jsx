import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AdminDashboard from "../Layouts/adminDashboard";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";


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
            {
                path: '/admin/dashboard', element: <AdminDashboard />
            },
        ]
    }
])
export default router;