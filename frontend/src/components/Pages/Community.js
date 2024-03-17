import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Divider from "../PageComponents/Divider";

const Community = () => {
    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="pb-12 md:pb-16">
                            <h1 className="text-center text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Community
                            </h1>
                            <Divider />

                            <div className="grid grid-col-1 gap-6 mt-4">
                                <div className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex">
                                    <svg className="self-center flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" /><path d="M3 13h2l2 3l2 -6l1 3h3" /></svg>
                                    <div className="ml-4">
                                        <span className="flex text-lg font-medium">
                                            How to Maintain Healthy Habits on the Road
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Exchange strategies for staying healthy on the road, from nutritious eating to exercise routines.
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex">
                                    <svg className="self-center flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M8 21l8 0" /><path d="M12 17l0 4" /></svg>
                                    <div className="ml-4">
                                        <span className="flex text-lg font-medium">
                                            Favorite Trucking Podcasts and Audiobooks
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Explore a curated list of engaging podcasts and audiobooks to keep you entertained during your journey.
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex">
                                    <svg className="self-center flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 4l2 1l2 -1" /><path d="M12 2v6.5l3 1.72" /><path d="M17.928 6.268l.134 2.232l1.866 1.232" /><path d="M20.66 7l-5.629 3.25l.01 3.458" /><path d="M19.928 14.268l-1.866 1.232l-.134 2.232" /><path d="M20.66 17l-5.629 -3.25l-2.99 1.738" /><path d="M14 20l-2 -1l-2 1" /><path d="M12 22v-6.5l-3 -1.72" /><path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232" /><path d="M3.34 17l5.629 -3.25l-.01 -3.458" /><path d="M4.072 9.732l1.866 -1.232l.134 -2.232" /><path d="M3.34 7l5.629 3.25l2.99 -1.738" /></svg>
                                    <div className="ml-4">
                                        <span className="flex text-lg font-medium">
                                            Advice on Dealing with Inclement Weather
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Get insider tips on navigating through challenging weather conditions like rain, snow, and high winds.
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex">
                                    <svg className="self-center flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385" /><path d="M6 9l4 4" /><path d="M13 10l-4 -4" /><path d="M3 21h7" /><path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z" /></svg>
                                    <div className="ml-4">
                                        <span className="flex text-lg font-medium">
                                            Discussion on New Regulations and Compliance Issues
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Stay informed about the latest regulations and compliance updates affecting the trucking industry.
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex">
                                    <svg className="self-center flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" /><path d="M14.5 5.5l4 4" /><path d="M12 8l-5 -5l-4 4l5 5" /><path d="M7 8l-1.5 1.5" /><path d="M16 12l5 5l-4 4l-5 -5" /><path d="M16 17l-1.5 1.5" /></svg>
                                    <div className="ml-4">
                                        <span className="flex text-lg font-medium">
                                            Equipment Maintenance Tips and Tricks
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Discover expert advice on maintaining your truck and equipment to ensure optimal performance.
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex">
                                    <svg className="self-center flex-shrink-0 mr-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21v-4" /><path d="M12 13v-4" /><path d="M12 5v-2" /><path d="M10 21h4" /><path d="M8 5v4h11l2 -2l-2 -2z" /><path d="M14 13v4h-8l-2 -2l2 -2z" /></svg>
                                    <div className="ml-4">
                                        <span className="flex text-lg font-medium">
                                            Navigating Through Traffic and Construction Zones
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            oin the discussion on effective strategies for navigating through traffic congestion and construction zones safely.
                                        </span>
                                    </div>
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

export default Community;