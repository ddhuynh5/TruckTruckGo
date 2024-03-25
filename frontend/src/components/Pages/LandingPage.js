import React from "react";

import Header from "../PageComponents/Header";
import Footer from "../PageComponents/Footer";
import Hero from "../PageComponents/landing/Hero";
import Features from "../PageComponents/landing/Features";
import Testimonials from "../PageComponents/landing/Testimonials";

export default function LandingPage() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="h-screen inset-0">
            <Header />
            <Hero />
            <Features />
            <Testimonials />
            <Footer scrollToTop={scrollToTop} />
        </div>
    );
}
