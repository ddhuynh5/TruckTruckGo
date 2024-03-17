import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Divider from "../PageComponents/Divider";
import Loading from "../PageComponents/Loading";
import { fetchLoginInfo } from "../Auth/AuthHelper";

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        const info = fetchLoginInfo();

        if (!info) {
            navigate("/");
        }

        setId(info);
        setLoading(false);
    }, [id]);

    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="text-center pb-12 md:pb-16">
                            <h1 className="text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Settings
                            </h1>
                            <Divider />


                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Settings;