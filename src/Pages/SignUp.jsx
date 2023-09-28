import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { handleImagePreview, handleImgBBUpload } from "../APIs/imageuploadOperation";
import { toast } from "react-toastify";
import { postAUserInSignUp } from "../APIs/userOperations";


const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/admin/dashboard';

    const [imgURL, setImgURL] = useState();
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);


        //* Handle Image Remove From Preview
        const handleRemoveImage = () => {
            setImgURL(null);
            setImagePreview('');
        };


        //* Handle Image Upload
        const handleImageUpload = async (event) => {
            const image = event.target.files[0];
            setIsLoading(true);

            handleImgBBUpload(image)
            .then((response) => {

                setImgURL(response)

                //* Set Image Preview
                if(response){
                    handleImagePreview(image, setImagePreview, setIsLoading)
                }

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
                .then(() => {
                    const photoURL = imgURL;
                    updateUserDetails(name, photoURL);

    
                    const userData = {
                        name,
                        email,
                        password,
                        image: photoURL,
                        number,
                        role: "User",
                        status: "Email Login"
                    }

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

            <div className="card flex-shrink-0 w-full lg:shadow-2xl bg-base-100">
                    
                <form onSubmit={handleRegister} className="card-body">

                    <h1 className="font-semibold text-2xl">Register Now</h1>

                    {/* Name & Email */}
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

                    {/* Password & Number */}
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
                            <input name="number" type="number" placeholder="number" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>
                    </div>

                    {/* Profile & Preview */}
                    <div className="lg:flex gap-2">
                            
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile</span>
                            </label>
                            <input onChange={handleImageUpload} type="file" placeholder="image" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>

                        <div className="border-l flex justify-start lg:-mt-7 mt-2">
                            <>
                            {
                            isLoading ?
                                <p className="text-green-500">Uploading...</p>
                            :
                            <>
                            {imgURL ? 
                            <div
                            style={{ position: 'relative', display: 'inline-block' }}
                            >
                                <img src={imagePreview} 
                                className="object-cover lg:w-32 lg:h-32 rounded"
                                alt="Preview" />

                                <button
                                onClick={handleRemoveImage}
                                className="bg-slate-100 hover:scale-90 duration-500 m-2 text-20 rounded-full w-7 h-7"
                                style={{
                                                position: 'absolute',
                                                top: '0',
                                                right: '0',
                                                border: 'none',
                                                cursor: 'pointer',
                                }}
                                >
                                &times;
                                </button>
                            </div>
                            :
                            <div>
                                <img src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg" 
                                            className="object-cover w-32 h-32 rounded"
                                            alt="Preview" />
                            </div>
                            }
                                        
                            </>
                            }
                            </>
                        </div>

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