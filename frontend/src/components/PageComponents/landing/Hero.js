import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="text-center pb-12 md:pb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">TruckTruckGo</span>
                        </h1>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                                Drive Safe, Earn Points, Shop Smart: Your Journey to Safer Roads Starts Here!
                            </p>
                            <div className="max-w-xs mx-auto space-x-1 sm:max-w-none sm:flex sm:justify-center sm:space-x-4" data-aos="zoom-y-out" data-aos-delay="300">
                                <button
                                    className="text-white bg-teal-500 hover:bg-teal-700 sm:w-auto sm:ml-4 
                                                rounded-lg text-base px-2 py-2"
                                    onClick={() => { navigate("/signup") }}
                                >
                                    Get Started
                                </button>
                                <button
                                    className=" text-white bg-gray-900 hover:bg-gray-800 sm:w-auto sm:ml-4 
                                                rounded-lg text-base px-2 py-2"
                                    onClick={() => { navigate("/about") }}
                                >
                                    <div className="flex items-center justify-center">
                                        <span>Learn more</span>
                                        <svg className="w-3 h-3 fill-current shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero