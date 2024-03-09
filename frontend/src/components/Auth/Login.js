import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { login, saveCookies, getRoleName } from "./AuthHelper";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const [stored, setStored] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const changePage = () => {
        window.location = "/home";
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            if (email && password) {
                const response = await login(email, password);
                setIsLoading(true);

                saveCookies({
                    email: response[0].fields.email,
                    role: getRoleName(response[0].fields.role_id),
                    name: response[0].name,
                    sessionId: response[0].fields.session_id,
                    expiration: response[0].fields.expiration_time,
                    uniqueId: response[0].pk,
                });
                changePage();
            }
        } catch (error) {
            if (error && error["Login Attempts Remaining"]) {
                alert(`Incorrect password. Login attempts remaining: ${error["Login Attempts Remaining"]}`);
            } else if (error && error["error"]) {
                alert(error["error"]);
            } else {
                console.error(error);
                alert("An error occurred while logging in.");
            }
        }
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
        if (!rememberMe) {
            Cookies.set('remember', true);
        } else {
            Cookies.remove('remember');
        }
    };

    useEffect(() => {
        const remember = Cookies.get('remember');
        if (remember !== undefined) {
            setStored(remember === "true");
            setRememberMe(true);
        }
        if (stored) {
            changePage();
        }
    }, [stored]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    {/* {!isLoading ? (
                        <>
                            <h1 className="text-2xl font-bold text-center mb-4">Welcome Back!</h1>
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
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 pb-3"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <FaRegEye style={{ cursor: "pointer" }} />
                                        ) : (
                                            <FaRegEyeSlash style={{ cursor: "pointer" }} />
                                        )}
                                    </div>

                                    <a
                                        href="/forgotpass"
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
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                                    </div>
                                    <a
                                        href="/signup"
                                        className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 
                                                        focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Create Account
                                    </a>
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
                    ) :
                        <div className="loading-spinner px-8 py-6">
                            <div className="spinner" />
                            <p>Loading...</p>
                        </div>
                    } */}
                    <>
                        <h1 className="text-2xl font-bold text-center mb-4">Welcome Back!</h1>
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
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 pb-3"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <FaRegEye style={{ cursor: "pointer" }} />
                                    ) : (
                                        <FaRegEyeSlash style={{ cursor: "pointer" }} />
                                    )}
                                </div>

                                <a
                                    href="/forgotpass"
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
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                                </div>
                                <a
                                    href="/signup"
                                    className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 
                                                        focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create Account
                                </a>
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
                </div>
            </div>
        </>
    )
}

export default Login