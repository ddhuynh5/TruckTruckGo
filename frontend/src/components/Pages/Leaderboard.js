import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../PageComponents/Header";
import Footer from "../PageComponents/Footer";
import Divider from "../PageComponents/Divider";
import Loading from "../PageComponents/Loading";

const Leaderboard = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllDrivers = async () => {
        try {
            const response = await axios.get("https://trucktruckgo-backend.onrender.com/drivers");
            const data = response.data;
            return data;
        } catch (error) {
            if ((error.response && error.response.status === 400) || error.response.status === 401) {
                throw error.response.data;
            } else {
                console.error(error);
                throw new Error("An error occurred while looking up item(s).");
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllDrivers();

                setDrivers(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="pb-12 md:pb-16">
                            <h1 className="text-center text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Welcome to our Leaderboard!
                            </h1>
                            <p className="text-lg text-gray-600">
                                This is where we celebrate the top performers among our truck drivers.
                                Each driver earns points based on their driving performance, safety records, and overall contributions
                                to our community. Take a look at our leaderboard to see who's leading the pack and setting the bar high
                                for excellence in driving. Congratulations to all our top drivers for their hard work and dedication on the road!
                            </p>

                            <Divider />

                            <div className="text-center bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
                                <div className="bg-gray-100 py-2 px-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Top Users</h2>
                                </div>

                                {!loading ? (
                                    <ul className="divide-y divide-gray-200">
                                        {drivers
                                            .slice()
                                            .sort((a, b) => b.points - a.points)
                                            .map((item, index) => (
                                                <li key={index} className="flex items-center py-4 px-6">
                                                    <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}</span>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium text-gray-800">{item.first} {item.last}</h3>
                                                        <p className="text-gray-600 text-base">Points: {item.points}</p>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                ) : (
                                    <Loading />
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Leaderboard;