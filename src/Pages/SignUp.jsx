import { Link } from "react-router-dom";


const SignUp = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    
                <div className="card-body">

                    <h1 className="font-semibold text-2xl">Register Now</h1>
                    
                    <div className="lg:flex gap-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>
                    </div>

                    <div className="lg:flex gap-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered focus:outline-none focus:border-green-600" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Number</span>
                            </label>
                            <input type="text" placeholder="number" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>
                    </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile</span>
                            </label>
                            <input type="file" placeholder="image" className="input input-bordered focus:outline-none focus:border-green-600" />
                        </div>
                    
                    <div className="form-control mt-6">
                    <button className="btn btn-primary">Signup</button>
                    </div>
                </div>
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