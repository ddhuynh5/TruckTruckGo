import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Divider from "../PageComponents/Divider";

const Faq = () => {
    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="pb-12 md:pb-16">

                            <h1 className="text-center text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Frequently Asked Questions
                            </h1>

                            <Divider />

                            <div className="grid grid-col-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        How can I earn points in the app?
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        You can earn points by completing deliveries, driving safely, and referring other drivers to the app. Each completed delivery
                                        and safe driving behavior will earn you a certain number of points, and you'll receive a bonus for each new driver you refer.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        How do I know how many points I have?
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Your current point balance will be displayed on the app's home screen. You can also view your transaction history to see how you earned and used points over time.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        What can I use my points for?
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        You can redeem your points for various rewards, such as gift cards, fuel discounts, and access to exclusive promotions. The available rewards and redemption
                                        options may vary over time, so be sure to check the app frequently for updates.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        Can I transfer my points to another driver?
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        No, points are non-transferable and can only be used by the driver who earned them. However, you can refer other drivers to the app and earn bonus points
                                        when they sign up and start using the app.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        Can I use my points to pay for tolls or parking fees?
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Not currently, but we're working on adding more redemption options in the future. For now, you can use your points to save on fuel costs or other rewards offered in the app.
                                    </span>
                                </div>

                                <div className="p-5 rounded border">
                                    <span className="flex items-center text-lg font-medium mb-4">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                                        What happens if I don't use my points for a long time?
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Your points will not expire as long as you continue to use the app and earn points through deliveries and safe driving. However, we reserve the right to modify
                                        the point expiration policy at any time, so be sure to check the app's terms and conditions for the latest information.
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

export default Faq;