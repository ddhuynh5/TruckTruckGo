import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { sendPasswordResetEmail, validatePasswordResetURL, updatePassword } from "../Helpers/AuthHelper";
import Divider from "../PageComponents/Divider";
import Loading from "../PageComponents/Loading";

const Forgot = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [defaultForgot, setDefaultForgot] = useState(true);
    const [sentEmail, setSentEmail] = useState(false);
    const [missing, setMissing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [emailAddress, setEmailAddress] = useState(null);

    const handleResetRequest = async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        setEmailAddress(email);

        if (email) {
            try {
                setIsLoading(true);
                const response = await sendPasswordResetEmail(email);

                if (response) {
                    setDefaultForgot(false);
                    setSentEmail(true);
                }
            } catch (error) {
                setDefaultForgot(true);
                toast.error(error["error"], {
                    closeButton: false
                });
            }
        } else {
            setMissing(true);
        }

        setIsLoading(false);
    };

    const handleResetPasswordRequest = async (event) => {
        event.preventDefault();

        const newPassword = document.getElementById("password").value;
        const confirm = document.getElementById("confirm").value;

        if (newPassword && confirm) {
            try {
                setIsLoading(true);
                const responseValidation = await validatePasswordResetURL(token);

                if (responseValidation) {
                    try {
                        const responseUpdate = await updatePassword(token, newPassword);

                        if (responseUpdate) {
                            toast.success("Updated password!", {
                                closeButton: false
                            });

                            navigate("/signin");
                        }
                    } catch (error) {
                        toast.error(error["error"], {
                            closeButton: false
                        });
                    }
                }
            } catch (error) {
                toast.error(error["error"], {
                    closeButton: false
                });
            }
        } else {
            setMissing(true);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        const getTokenFromURL = () => {
            const params = new URLSearchParams(location.search);
            const queryToken = params.get("token");
            setToken(queryToken);
        };

        getTokenFromURL();
    }, [location.searc]);

    useEffect(() => {
        if (token)
            setDefaultForgot(false);
    }, [token])

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="min-h-screen flex items-center justify-center w-full">
                {isLoading && (
                    <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                        <Loading />
                    </div>
                )}
                {defaultForgot && !isLoading && (
                    <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Forgot your password?
                        </h1>
                        <p className="font-light text-gray-500">Type in your email and we will send you a code to reset your password!</p>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={
                                        `
                                            bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                            ${missing ? "border-red-500" : ""}
                                        `
                                    }
                                    placeholder="your@email.com"
                                    required={true}
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
                            <button onClick={(event) => { handleResetRequest(event) }} className="w-full text-white bg-indigo-600 hover:bg-indigo-700 
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset password</button>
                        </form>
                    </div>
                )}

                {!defaultForgot && sentEmail && (
                    <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-prose">
                        <h1 className="mb-1 font-bold leading-tight tracking-tight text-xl md:text-2xl">
                            It's on its way!
                        </h1>
                        <Divider />
                        <div className="font-light text-gray-500">
                            <p className="mb-2">
                                Password reset email has been sent to:{' '}
                                <span className="underline mb-4 inline text-blue-700">
                                    {emailAddress}
                                </span>
                            </p>
                            <p className="mb-4">
                                Please check your inbox and follow the instructions provided to reset your password.
                            </p>
                            <p className="mb-4">
                                If you do not receive the email within a few minutes, please check your spam folder.
                            </p>
                            <p>
                                If you encounter any issues, feel free to contact support for assistance.
                            </p>
                        </div>
                    </div>
                )}

                {!defaultForgot && token && !isLoading && (
                    <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Enter your new password
                        </h1>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={
                                        `
                                        bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4
                                        ${missing ? "border-red-500" : ""}
                                    `
                                    }
                                    placeholder="Squeaky clean, new password"
                                    required={true}
                                />
                                <label htmlFor="confirm" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirm"
                                    id="confirm"
                                    className={
                                        `
                                        bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                        focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                        ${missing ? "border-red-500" : ""}
                                    `
                                    }
                                    placeholder="Measure twice, cut once!"
                                    required={true}
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
                            <button onClick={(event) => { handleResetPasswordRequest(event) }} className="w-full text-white bg-indigo-600 hover:bg-indigo-700 
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset password</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Forgot;