import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup, saveToSessionStorage, getAllSponsors } from "../Helpers/AuthHelper";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Select from "react-select";
import Loading from "../PageComponents/Loading";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [sponsors, setSponsors] = useState([]);
    const [missingFields, setMissingFields] = useState([]);
    const [selectedSponsor, setSelectedSponsor] = useState(null);
    const navigate = useNavigate();

    const customStyles = (missingFields) => ({
        control: (base) => ({
            ...base,
            borderColor: missingFields.includes("selectedSponsor") ? "#ef4444" : base.borderColor,
        })
    });

    const changePage = () => {
        window.location = "/shop";
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

        const missing = [];

        if (!email) missing.push("email");
        if (!password) missing.push("password");
        if (!first) missing.push("first");
        if (!last) missing.push("last");
        if (!address) missing.push("address");
        if (!selectedSponsor) missing.push("selectedSponsor");

        setMissingFields(missing);

        if (missing.length === 0) {
            try {
                if (!email || !password || !first || !last || !address || !selectedSponsor) {
                    setIsLoading(false);
                } else {
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

                    toast.success("Signup success!", {
                        closeButton: false
                    });

                    saveToSessionStorage({
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
                }
            } catch (error) {
                if (error && error["Login Attempts Remaining"]) {
                    toast.error(`Incorrect password. Login attempts remaining: ${error["Login Attempts Remaining"]}`, {
                        closeButton: false
                    });
                } else if (error && error["Error"]) {
                    toast.error(error["Error"], {
                        closeButton: false
                    });
                } else {
                    toast.error("An error occurred during signup", {
                        closeButton: false
                    });
                }
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem("remember") === true) {
            changePage();
        } else {
            getSponsors();
        }
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                    {!isLoading ? (
                        <>
                            <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
                            <form action="#">
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={
                                            `
                                                shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                                                ${missingFields.includes("email") ? "border-red-500" : ""}
                                            `
                                        }
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div className="mb-4 relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className={
                                            `
                                                shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                                                ${missingFields.includes("password") ? "border-red-500" : ""}
                                            `
                                        }
                                        placeholder="Enter your password"
                                        required
                                        style={{
                                            WebkitTextSecurity: showPassword ? "none" : "disc",
                                            MozTextSecurity: showPassword ? "none" : "disc",
                                            msTextSecurity: showPassword ? "none" : "disc"
                                        }}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 pt-5"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="h-6 w-6 cursor-pointer" />
                                        ) : (
                                            <EyeSlashIcon className="h-6 w-6 cursor-pointer" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label htmlFor="First Name" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            id="first"
                                            className={
                                                `
                                                    shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                                                    ${missingFields.includes("first") ? "border-red-500" : ""}
                                                `
                                            }
                                            placeholder="Jane"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label htmlFor="Last Name" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            id="last"
                                            className={
                                                `
                                                    shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                                                    ${missingFields.includes("last") ? "border-red-500" : ""}
                                                `
                                            }
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        className={
                                            `
                                            shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                                            ${missingFields.includes("address") ? "border-red-500" : ""}
                                        `
                                        }
                                        placeholder="123 Sesame Street"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Sponsor" className="block text-sm font-medium text-gray-700">Companies</label>
                                    <Select
                                        options={sponsors.map((sponsor) => ({
                                            value: sponsor.sponsor_id,
                                            label: sponsor.sponsor_name,
                                        }))}
                                        styles={customStyles(missingFields)}
                                        value={selectedSponsor}
                                        onChange={handleSponsorChange}
                                        placeholder="Select Company"
                                    />
                                </div>
                                <span
                                    onClick={() => { navigate("/signin") }}
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
                        <Loading />
                    }
                </div>
            </div>
        </div>
    )
}

export default SignUp;