import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import app from "../Firebase/firebase.init";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";



const auth = getAuth(app);

const Login = () => {
    const {userSingIn} = useContext(AuthContext)

    const [userEmail, setUserEmail] = useState();
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    // const from = location?.state?.form.pathname || "/";
    const from = location?.pathname || '/admin/dashboard';

    console.log('error', error);

    const handleLogin = (event) => {
        event.preventDefault();
    
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;



        userSingIn(email, password)
        .then((result) => {
            const userLogin = result.user;
                console.log(userLogin);
            toast.success("User logged in successfully", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate(from, { replace: true });

            // createToken(email)
        })
        .catch((err) => {
            setError(err);
        });
    };



      //! handle Forget Password

  const handleEmailForResetPassword = (e) => {
    const email = e.target.value;
    setUserEmail(email);

    // console.log(email);
  };




    const handleForgetPassword = () => {
        if (!userEmail) {
          alert("Please enter your email address");
        } else {
          sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                toast.info("password reset sent", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch((er) => {
                toast.error,
                    {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    }(er.message);
                console.error(er);
            });
        }
      };


    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" onBlur={handleEmailForResetPassword} 
                        type="email" placeholder="email" 
                        className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="text" placeholder="password" className="input input-bordered" 
                        />
                        <div>
                            <h2
                                onClick={handleForgetPassword}
                                className="hover:underline cursor-pointer"
                            >
                                Forgot Password ?
                            </h2>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                    </div>
                </form>

                <Link
                    to="/authentication/register"
                    className="hover:underline text-[#3d49ef] hover:text-[#0011ff]"
                >
                Do not have an account?
                </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;