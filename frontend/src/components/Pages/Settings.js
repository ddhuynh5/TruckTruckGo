import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../PageComponents/Header";
import Footer from "../PageComponents/Footer";
import Divider from "../PageComponents/Divider";
import Loading from "../PageComponents/Loading";
import { fetchLoginInfo } from "../Helpers/AuthHelper";
import { sponsor, update } from "../Helpers/SettingsHelper";
import Select from "react-select";

const Settings = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [role, setRole] = useState("");
    const [currentSponsor, setCurrentSponsor] = useState("");
    const [sponsors, setSponsors] = useState([]);

    const handleUpdate = () => {

    };

    const handleSelectChange = (selectedOption) => {
        setCurrentSponsor(selectedOption.value);
    };

    const fetchUserInfo = () => {
        setEmail(localStorage.getItem("email") || sessionStorage.getItem("email"));
        setRole(localStorage.getItem("role") || sessionStorage.getItem("role"));

        const name = localStorage.getItem("name") || sessionStorage.getItem("name");
        setFirst(name.split(" ")[0]);
        setLast(name.split(" ")[1]);
    };

    useEffect(() => {
        const info = fetchLoginInfo();

        if (!info) {
            navigate("/");
        }

        setId(info);
    }, [navigate]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            if (id) {
                const response = await sponsor(id);
                setCurrentSponsor(response["current_sponsor"][0]["sponsor_name"]);

                let sponsorsList = [];
                for (let sponsor of response["all_sponsors"]) {
                    sponsorsList.push(sponsor["sponsor_name"]);
                }

                const mappedSponsors = sponsorsList.map(item => ({ value: item, label: item }));

                setSponsors(mappedSponsors);
            }
            setLoading(false);
        };

        fetchData();
        fetchUserInfo();
    }, [id]);

    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="pb-12 md:pb-16">
                            <h1 className="text-center text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Settings
                            </h1>

                            <Divider />

                            {/* !loading */true ? (
                                <div className="mt-4 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-4 justify-items-center space-y-4 md:space-y-0">
                                        <div className="col-span-1">
                                            <label htmlFor="first" className="block text-sm font-medium text-gray-700">First Name</label>
                                            <input
                                                type="text"
                                                id="first"
                                                className="shadow-sm rounded-md px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder={first}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="last" className="block text-sm font-medium text-gray-700">Last Name</label>
                                            <input
                                                type="text"
                                                id="last"
                                                className="shadow-sm rounded-md px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:mb-4"
                                                placeholder={last}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="shadow-sm rounded-md px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder={email}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                            <input
                                                type="text"
                                                id="role"
                                                className="shadow-sm rounded-md px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder={role}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <Select
                                                id="new-quantity"
                                                options={sponsors}
                                                value={sponsors.find(sponsor => sponsor.value === currentSponsor)}
                                                onChange={handleSelectChange}
                                                placeholder={currentSponsor}
                                                className=""
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                            <input
                                                type="text"
                                                id="role"
                                                className="shadow-sm rounded-md px-3 py-2 border border-gray-300 
                                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder={role}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex md:justify-end justify-center">
                                        <button
                                            /* onClick={submitReset} */
                                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 
                                                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Loading />
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Settings;