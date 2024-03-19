import React from "react";

const Policy = () => {
    return (
        <div className="inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-6xl">
                    <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Privacy Policy
                    </h1>

                    <p className="mb-4 font-light text-gray-600">
                        This privacy policy ("Policy") describes how TruckTruckGo ("Company," "we," "us," or "our")
                        collects, uses, and shares personal data when you visit or make use of our website.
                    </p>

                    <h2 className="text-base font-semibold">We may collect various types of personal data from you, including but not limited to:</h2>
                    <ul className="list-disc ml-5 mb-4">
                        <li className="font-light text-gray-600">
                            Contact information such as name, email address, and phone number
                        </li>
                        <li className="font-light text-gray-600">
                            Usage data such as IP address, browser type, operating system, and device information
                        </li>
                        <li className="font-light text-gray-600">
                            Location data if you choose to share it with us
                        </li>
                        <li className="font-light text-gray-600">
                            Any other information you voluntarily provide to us
                        </li>
                    </ul>

                    <h2 className="text-base font-semibold">We use the information we collect for various purposes, including but not limited to:</h2>
                    <ul className="list-disc ml-5 mb-4">
                        <li className="font-light text-gray-600">
                            Providing and maintaining our services
                        </li>
                        <li className="font-light text-gray-600">
                            Personalizing your experience on our Website
                        </li>
                        <li className="font-light text-gray-600">
                            Communicating with you, including responding to your inquiries and providing customer support
                        </li>
                        <li className="font-light text-gray-600">
                            Analyzing usage trends and improving our services
                        </li>
                    </ul>

                    <h2 className="text-base font-semibold">Changes to This Policy</h2>
                    <p className="mb-4 font-light text-gray-600">
                        We may update this Policy from time to time. Any changes will be posted on this page with a revised effective date.
                        We encourage you to review this Policy periodically for any updates.
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Policy;