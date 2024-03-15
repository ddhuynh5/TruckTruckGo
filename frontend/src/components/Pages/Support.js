import React from "react";
import Header from "./Header";
import Divider from "../PageComponents/Divider";

const Support = () => {
    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="text-center pb-12 md:pb-16">
                            <h1 className="text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Support
                            </h1>
                            <Divider content="" />


                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Support;