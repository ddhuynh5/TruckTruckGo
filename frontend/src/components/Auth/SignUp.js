import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { signup, saveCookies, getAllSponsors } from "./AuthHelper";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Select from "react-select";

const SignUp = ({ accountModal, modalRef, updateView }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [sponsors, setSponsors] = useState([]);
    const [selectedSponsor, setSelectedSponsor] = useState(null);

    const changePage = () => {
        window.location = "/home";
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function getSponsors() {
        const items = await getAllSponsors();
        const all = items.all_sponsors;
        setSponsors(all);
    }

    const handleSponsorChange = (selectedOption) => {
        setSelectedSponsor(selectedOption);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const first = document.getElementById("first").value;
        const last = document.getElementById("last").value;
        const address = document.getElementById("address").value;

        try {
            if (email && password) {
                setIsLoading(true);

                const response = await signup(
                    address,
                    first,
                    last,
                    selectedSponsor.label,
                    null,
                    3,
                    selectedSponsor.value,
                    email,
                    password
                );

                toast.success("Signup success!");

                saveCookies({
                    email: response[0].fields.email,
                    role: "Driver",
                    name: response[0].name,
                    sessionId: response[0].fields.session_id,
                    expiration: response[0].fields.expiration_time,
                    uniqueId: response[0].pk,
                });

                setTimeout(() => {
                    changePage();
                }, 1000);
            } else {
                if (!email) {
                    toast.error("Email required")
                } else {
                    toast.error("Password required")
                }
                setIsLoading(false);
            }
        } catch (error) {
            if (error && error["Login Attempts Remaining"]) {
                toast.error(`Incorrect password. Login attempts remaining: ${error["Login Attempts Remaining"]}`);
            } else if (error && error["error"]) {
                toast.error(error["error"]);
            } else {
                toast.error("An error occurred during signup");
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (Cookies.get("remember") !== undefined) {
            changePage();
        } else {
            getSponsors();
        }
    }, []);

    return (
        <>
            {accountModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                    <div className="min-h-screen flex items-center justify-center w-full">
                        <div ref={modalRef} className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                            {!isLoading ? (
                                <>
                                    <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
                                    <form action="#">
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 relative">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Enter your password"
                                                required
                                                style={{
                                                    WebkitTextSecurity: showPassword ? "none" : "disc",
                                                    MozTextSecurity: showPassword ? "none" : "disc",
                                                    msTextSecurity: showPassword ? "none" : "disc"
                                                }}
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-2"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? (
                                                    <FaRegEye style={{ cursor: "pointer" }} />
                                                ) : (
                                                    <FaRegEyeSlash style={{ cursor: "pointer" }} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between mb-4">
                                            <div className="w-1/2 mr-2">
                                                <label htmlFor="First Name" className="block text-sm font-medium text-gray-700">First Name</label>
                                                <input
                                                    type="text"
                                                    id="first"
                                                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Jane"
                                                    required
                                                />
                                            </div>
                                            <div className="w-1/2 ml-2">
                                                <label htmlFor="Last Name" className="block text-sm font-medium text-gray-700">Last Name</label>
                                                <input
                                                    type="text"
                                                    id="last"
                                                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Doe"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                                            placeholder="123 Sesame Street"
                                            required
                                        />
                                        <Select
                                            options={sponsors.map((sponsor) => ({
                                                value: sponsor.sponsor_id,
                                                label: sponsor.sponsor_name,
                                            }))}
                                            value={selectedSponsor}
                                            onChange={handleSponsorChange}
                                            placeholder="Select Sponsor"
                                            className="mb-4"
                                        />
                                        <span
                                            onClick={() => { updateView("signin") }}
                                            className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 
                                                        focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer underline mb-4
                                                        float-right"
                                        >
                                            Already have an account?
                                        </span>
                                        <button
                                            onClick={(event) => handleSignUp(event)}
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                                                    shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Create Account
                                        </button>
                                    </form>
                                </>
                            ) :
                                <div className="loading-spinner flex items-center justify-center">
                                    <div className="spinner" />
                                    <p>Loading...</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SignUp;