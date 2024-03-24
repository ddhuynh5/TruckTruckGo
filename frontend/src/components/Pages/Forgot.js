import React from "react";
import { toast } from "react-toastify";

const Forgot = () => {

    const submitReset = async () => {

        const email = document.getElementById("email").value;

        if (email) {
            toast.info("Feature coming soon!", {
                closeButton: false
            });
        }

        /* if (email && terms) {
            try {
                const response = await axios.post("http://localhost:8000/password_reset", { email }, {
                    withCredentials: true
                });
                if (response.data["success"]) {
                    toast.success("Email sent!", {
                        closeButton: false
                    });
                }
            } catch (error) {
                if ((error.response && error.response.status === 400) || error.response.status === 401) {
                    throw error.response.data;
                } else {
                    console.error(error);
                    throw new Error("An error occurred while looking up item(s).");
                }
            }
        } */
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Forgot your password?
                    </h1>
                    <p className="font-light text-gray-500">Type in your email and we will send you a code to reset your password!</p>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="your@email.com" required={true} />
                        </div>
                        <button onClick={submitReset} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset password</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forgot;