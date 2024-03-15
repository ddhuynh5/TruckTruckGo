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

                            <Divider content="" />

                            <div className="grid grid-col-1 md:grid-cols-3 gap-6 mt-4">
                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        Getting Started
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        If you're new to our platform, this section provides resources to help you get started, including guides, tutorials, and FAQs.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        Account Assistance
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Need help with your account? Find information on how to manage your account settings, update your profile, and reset your password.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        Technical Support
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Encountering technical issues? Our technical support team is available to troubleshoot and resolve any problems you may be experiencing.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        Billing and Payments
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        For questions regarding billing, payments, or subscription plans, this section provides answers to commonly asked questions.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
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