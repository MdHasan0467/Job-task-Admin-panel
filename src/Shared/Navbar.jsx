import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";


const Navbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="border lg:mx-5 h-20 rounded-md bg-white dark:bg-black dark:text-white">
            <div className="flex justify-around py-5">
                <div>
                    <h1>One</h1>
                </div>
        
        
                <div>
                    <h1>Two</h1>
                </div>
        
            {/* Drawer For Mobile Device */}
                {
                //     userType === 'Admin' &&
                // <div className="navbar-end p-2 md:hidden">
                //     <div className="drawer">
                //     <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
        
                //     <div className="drawer-content">
                //         {/* Page content here */}
                //         <label
                //         htmlFor="admin-drawer"
                //         className="ml-10 bg-blue-500 text-white hover:bg-blue-700 p-2"
                //         >
                //         More options
                //         </label>
                //     </div>
        
                //     <MobileAdminDrawerSide />
                //     </div>
                // </div>
                }
        
                {/* Drawer For Mobile Device */}
                {
                //     userType === 'Buyer' &&
                //   <div className="navbar-end p-2 md:hidden">
                //     <div className="drawer">
                //       <input id="buyer-drawer" type="checkbox" className="drawer-toggle" />
        
                //       <div className="drawer-content">
                //         {/* Page content here */}
                //         <label
                //           htmlFor="buyer-drawer"
                //           className="ml-10 bg-blue-500 text-white hover:bg-blue-700 p-2"
                //         >
                //           More options
                //         </label>
                //       </div>
        
                //       <MobileBuyerDrawerSide />
                //     </div>
                //   </div>
                }
        
                {
                //     userType === 'User' &&
                //   <div className="navbar-end p-2 md:hidden">
                //     <div className="drawer">
                //       <input id="user-drawer" type="checkbox" className="drawer-toggle" />
        
                //       <div className="drawer-content">
                //         {/* Page content here */}
                //         <label
                //           htmlFor="user-drawer"
                //           className="ml-10 bg-blue-500 text-white hover:bg-blue-700 p-2"
                //         >
                //           More options
                //         </label>
                //       </div>
        
                //       <MobileUserDrawerSide />
                //     </div>
                //   </div>
                }
        
        
        
        
        
                {/* user image */}
                <div className="dropdown dropdown-end md:hidden flex">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.photoURL} className="border" />
                    </div>
                    </label>
        
                    {/* Dropdown by clicking user image */}
                    <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 space-y-1 shadow menu menu-sm dropdown-content dark:bg-gray-800 bg-[#27E8B3] rounded-box w-60"
                    >
                    <li>
                        <a className="justify-between">{user?.displayName}</a>
                    </li>
                    <li>
                        <a>{user?.email}</a>
                    </li>
                    <li>
                        <a>Logout</a>
                    </li>
                    </ul>
        
                </div>
    
            </div>
        </div>
    );
};

export default Navbar;