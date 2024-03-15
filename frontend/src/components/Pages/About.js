import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Divider from "../PageComponents/Divider";
import Driver1 from "../../assets/images/driver1.jpg";
import Driver2 from "../../assets/images/driver2.jpg";
import Driver3 from "../../assets/images/driver3.jpg";
import Driver4 from "../../assets/images/driver4.jpg";

const About = () => {
    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="pb-12 md:pb-16">

                            <h1 className="text-center text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                About Us
                            </h1>

                            <Divider content="" />

                            <div className="grid grid-col-1 md:grid-cols-2 gap-10 mt-4">
                                <div className="p-5">
                                    <span className="flex items-center text-xl font-medium mb-4">
                                        Driving Safety Forward: Empowering Truckers, Protecting Highways
                                    </span>
                                    <span className="text-lg text-gray-500">
                                        Cultivating safer roads, one journey at a time. Our platform pioneers a point-based reward system, fostering a culture of accountability and
                                        safety among truck drivers worldwide. Join us in revolutionizing the way we drive, ensuring safer highways for everyone.
                                    </span>
                                </div>

                                <div className="p-auto">
                                    <div class="container mx-auto">
                                        <div class="-m-1 flex flex-wrap md:-m-2">
                                            <div class="flex w-1/2 flex-wrap">
                                                <div class="w-full p-1 md:p-2">
                                                    <img className="block rounded-lg h-full w-full" src={Driver1} alt="driver1" />
                                                </div>
                                                <div class="w-full p-1 md:p-2">
                                                    <img className="block rounded-lg h-full w-full" src={Driver3} alt="driver3" />
                                                </div>
                                            </div>
                                            <div class="flex w-1/2 flex-wrap">
                                                <div class="w-full p-1 md:p-2">
                                                    <img className="block rounded-lg h-full w-full" src={Driver2} alt="driver2" />
                                                </div>
                                                <div class="w-full p-1 md:p-2">
                                                    <img className="block rounded-lg h-full w-full" src={Driver4} alt="driver4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 col-span-2 mt-4">
                                    <span className="flex text-xl font-medium mb-4">
                                        Transforming the Trucking Experience: Shop Smarter, Drive Safer
                                    </span>

                                    <ul className="list-disc ml-5">
                                        <li className="text-lg text-gray-500">
                                            Our ecommerce platform revolutionizes the trucking industry by offering a seamless shopping experience tailored specifically
                                            for truck drivers.
                                        </li>
                                        <li className="text-lg text-gray-500">
                                            With an extensive catalog of products ranging from truck accessories to safety equipment, drivers can easily
                                            find everything they need to enhance their journey on the road. Our user-friendly interface, secure payment options, and fast delivery
                                            ensure a hassle-free shopping experience, while our dedicated customer support team is always available to assist with any inquiries.
                                        </li>
                                        <li className="text-lg text-gray-500">
                                            Whether you're restocking essentials or upgrading your rig, our app is your one-stop destination for all things trucking.
                                        </li>
                                    </ul>
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

export default About;