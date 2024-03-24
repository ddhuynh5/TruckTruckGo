import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveToSessionStorage, saveToLocalStorage, getRoleName } from "../Helpers/AuthHelper";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Loading from "../PageComponents/Loading";

const SignIn = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [missingFields, setMissingFields] = useState([]);
    const navigate = useNavigate();

    const changePage = () => {
        window.location = "/shop";
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const missing = [];

        if (!email) missing.push("email");
        if (!password) missing.push("password");

        setMissingFields(missing);

        if (missing.length === 0) {
            try {
                setIsLoading(true);
                const response = await login(email, password);
                toast.success("Login success!", {
                    closeButton: false
                });

                if (rememberMe === true) {
                    saveToLocalStorage({
                        email: response[0].fields.email,
                        role: getRoleName(response[0].fields.role_id),
                        name: response[0].name,
                        sessionId: response[0].fields.session_id,
                        expiration: response[0].fields.expiration_time,
                        uniqueId: response[0].pk,
                        rememberMe: true
                    });
                } else {
                    saveToSessionStorage({
                        email: response[0].fields.email,
                        role: getRoleName(response[0].fields.role_id),
                        name: response[0].name,
                        sessionId: response[0].fields.session_id,
                        expiration: response[0].fields.expiration_time,
                        uniqueId: response[0].pk,
                        rememberMe: false
                    });
                }

                setTimeout(() => {
                    changePage();
                }, 1000);
            } catch (error) {
                if (error && error["Login Attempts Remaining"]) {
                    toast.error(`Incorrect password. Login attempts remaining: ${error["Login Attempts Remaining"]}`, {
                        closeButton: false
                    });
                } else if (error && error["error"]) {
                    toast.error(error["error"], {
                        closeButton: false
                    });
                } else {
                    toast.error("An error occurred while logging in", {
                        closeButton: false
                    });
                }
                setIsLoading(false);
            }
        }
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    useEffect(() => {
        if (localStorage.getItem("remember") === true) {
            changePage();
        }
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                    {!isLoading && (
                        <>
                            <h1 className="text-2xl font-bold text-center mb-4">Welcome Back!</h1>
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
                                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2
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
                                        className="absolute inset-y-0 right-0 flex items-center pr-2"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="h-6 w-6 cursor-pointer" />
                                        ) : (
                                            <EyeSlashIcon className="h-6 w-6 cursor-pointer" />
                                        )}
                                    </div>

                                    <a
                                        href="/reset-password"
                                        className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 
                                                focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                                            onClick={() => { handleRememberMeChange() }}
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                                    </div>
                                    <span
                                        onClick={() => { navigate("/signup") }}
                                        className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 
                                                        focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer underline"
                                    >
                                        Create Account
                                    </span>
                                </div>
                                <button
                                    onClick={(event) => handleLogin(event)}
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                                                    shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Login
                                </button>
                            </form>
                        </>
                    )}

                    {isLoading && (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignIn;