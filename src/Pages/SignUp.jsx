import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { handleImgBBUpload } from "../APIs/imageuploadOperation";
import { toast } from "react-toastify";
import { postAUserInSignUp } from "../APIs/userOperations";


const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);


    const [imgURL, setImgURL] = useState();

    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/admin/dashboard';



    

        //* Handle Image Upload
        const handleImageUpload = async (event) => {
            const image = event.target.files[0];

            handleImgBBUpload(image)
            .then((response) => {
                console.log(response);
                setImgURL(response)
            })
        };



        //* register function
        const handleRegister = (event) => {
            event.preventDefault();
            const form = event.target;
            const name = form.name.value;
            const email = form.email.value;
            const password = form.password.value;
            const number = form.number.value;



            if (imgURL) {
                createUser(email, password)
                .then((result) => {
                    const photoURL = imgURL;
                    updateUserDetails(name, photoURL);
                    console.log(result);
    
                    const userData = {
                        name,
                        email,
                        password,
                        image: photoURL,
                        number,
                        role: "User",
                        status: "Email Login"
                    }

                    console.log(userData);
    
                    postAUserInSignUp(userData)
                    .then((response) => {

                        if(response?.acknowledged === true && response.insertedId) {
                            console.log(response);
                            navigate(from, { replace: true });
                            toast.success("successfully Email Login", {
                                position: "bottom-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            })
                        }
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
            }
    
        };
    
    
        //* handle profile update with name and photoURL
        const updateUserDetails = (name, photoURL) => {
        updateUser(name, photoURL)
            .then(() => {
            navigate("/");
            })
            .catch((error) => {
            console.error(error);
            });
        };



    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    
                <form onSubmit={handleRegister} className="card-body">

                    <h1 className="font-semibold text-2xl">Register Now</h1>
                    
                    <div className="lg:flex gap-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="name" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="text" placeholder="email" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>
                    </div>

                    <div className="lg:flex gap-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered focus:outline-none focus:border-green-600" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Number</span>
                            </label>
                            <input name="number" type="text" placeholder="number" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>
                    </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile</span>
                            </label>
                            <input onChange={handleImageUpload} type="file" placeholder="image" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>
                    
                    <div className="form-control mt-6">
                    <button className="btn btn-primary">Signup</button>
                    </div>
                </form>
                <Link
                    to="/authentication/login"
                    className="hover:underline text-[#3d49ef] hover:text-[#0011ff]"
                >
                Already have an account?
                </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;