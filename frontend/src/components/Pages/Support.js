import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Divider from "../PageComponents/Divider";

const Support = () => {
    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="pb-12 md:pb-16">
                            <h1 className="text-center text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Support
                            </h1>

                            <Divider />

                            <div className="grid grid-col-1 md:grid-cols-3 gap-6 mt-4">
                                <div className="p-5 rounded border hover:shadow-lg cursor-pointer">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fillRule="evenOdd" stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6l0 13" /><path d="M12 6l0 13" /><path d="M21 6l0 13" /></svg>
                                        Getting Started
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        If you're new to our platform, this section provides resources to help you get started, including guides, tutorials, and FAQs.
                                    </span>
                                </div>

                                <div className="p-5 rounded border hover:shadow-lg cursor-pointer">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                                        Account Assistance
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Need help with your account? Find information on how to manage your account settings, update your profile, and reset your password.
                                    </span>
                                </div>

                                <div className="p-5 rounded border hover:shadow-lg cursor-pointer">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" /></svg>
                                        Technical Support
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Encountering technical issues? Our technical support team is available to troubleshoot and resolve any problems you may be experiencing.
                                    </span>
                                </div>

                                <div className="p-5 rounded border hover:shadow-lg cursor-pointer">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" /><path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" /></svg>
                                        Billing and Payments
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        For questions regarding billing, payments, or subscription plans, this section provides answers to commonly asked questions.
                                    </span>
                                </div>

                                <div className="p-5 rounded border hover:shadow-lg cursor-pointer">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
                                        Contact Us
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Can't find the information you're looking for? Feel free to reach out to our support team directly. You can contact us via email, phone, or live chat during our business hours.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Support;