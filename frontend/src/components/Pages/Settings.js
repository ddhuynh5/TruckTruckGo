import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../PageComponents/Header";
import Footer from "../PageComponents/Footer";
import Divider from "../PageComponents/Divider";
import Loading from "../PageComponents/Loading";
import { fetchLoginInfo } from "../Helpers/AuthHelper";
import { update, sponsor, all_sponsors, driver, deactivate } from "../Helpers/SettingsHelper";
import Select from "react-select";
import { toast } from "react-toastify";

const Settings = () => {
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [address, setAddress] = useState("");
    const [currentSponsor, setCurrentSponsor] = useState("");

    const [defaults, setDefaults] = useState({});
    const [sponsors, setSponsors] = useState([]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleUpdate = async () => {
        if (
            first !== defaults.first ||
            last !== defaults.last ||
            email !== defaults.email ||
            address !== defaults.address ||
            currentSponsor.value !== defaults.sponsor ||
            password !== ""
        ) {
            const updatedUserInfo = {
                first_name: first,
                last_name: last,
                email: email,
                password: password,
                address: address,
                role_id: 3,
                sponsor_id: currentSponsor.value
            };

            try {
                const response = await update(id, updatedUserInfo);

                if (response) {
                    toast.success("Update success!", {
                        closeButton: false
                    });
                }
            } catch (error) {
                if (error) {
                    toast.error("An error occurred while updating, please try again", {
                        closeButton: false
                    });
                }
            }

        }
        toast.info("No changes detected", {
            closeButton: false
        });
    };

    const handleDeactivate = async () => {
        try {
            const response = await deactivate(id);

            if (response) {
                toast.success("Removed all user info", {
                    closeButton: false
                });

                navigate("/");
            }
        } catch (error) {
            if (error) {
                toast.error("An error occurred while removing info, please try again", {
                    closeButton: false
                });
            }
        }

    };

    const handleSelectChange = (selectedOption) => {
        setCurrentSponsor(selectedOption);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

            const sponsorInfo = await sponsor(id);
            setCurrentSponsor({
                label: sponsorInfo[0]["sponsor_name"],
                value: sponsorInfo[0]["sponsor_id"]
            });

            const all = await all_sponsors(id);
            let sponsorsList = [];
            for (let sponsor of all["all_sponsors"]) {
                sponsorsList.push({
                    label: sponsor["sponsor_name"],
                    value: sponsor["sponsor_id"]
                });
            }

            setSponsors(sponsorsList);

            const driverInfo = await driver(id);
            setFirst(driverInfo[0].first_name);
            setLast(driverInfo[0].last_name)
            setEmail(driverInfo[0].email)
            setAddress(driverInfo[0].address);

            setDefaults({
                first: driverInfo[0].first_name,
                last: driverInfo[0].last_name,
                email: driverInfo[0].email,
                address: driverInfo[0].address,
                sponsor: sponsorInfo[0]["sponsor_id"]
            });

            setLoading(false);
        }

        if (id) {
            fetchData();
        }
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

                            {!loading ? (
                                <div className="mt-4 space-y-8">
                                    <div className="flex justify-center ">
                                        <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 md:space-y-2 gap-x-32">
                                            <div className="col-span-1 mt-2">
                                                <label htmlFor="first" className="block text-sm font-medium text-gray-700">First Name</label>
                                                <input
                                                    type="text"
                                                    id="first"
                                                    className="shadow-sm rounded-md px-3 py-2 border border-gray-300 
                                                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder={defaults.first}
                                                    onChange={(event) => { setFirst(event.target.value) }}
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
                                                    placeholder={defaults.last}
                                                    onChange={(event) => { setLast(event.target.value) }}
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
                                                    placeholder={defaults.email}
                                                    onChange={(event) => { setEmail(event.target.value) }}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                                                <input
                                                    type="text"
                                                    id="password"
                                                    className="shadow-sm rounded-md px-3 py-2 border border-gray-300 
                                                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Set a new password"
                                                    onChange={(event) => { setPassword(event.target.value) }}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    className="shadow-sm rounded-md px-3 py-2 border border-gray-300 
                                                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder={defaults.address}
                                                    onChange={(event) => { setAddress(event.target.value) }}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-1 md:pt-1">
                                                <label htmlFor="sponsors" className="block text-sm font-medium text-gray-700">Company</label>
                                                <div className="w-56">
                                                    <Select
                                                        id="sponsor"
                                                        options={sponsors}
                                                        value={currentSponsor}
                                                        onChange={handleSelectChange}
                                                        placeholder={currentSponsor}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center md:justify-end">
                                        <button
                                            onClick={handleUpdate}
                                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 
                                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={openModal}
                                            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 
                                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4"
                                        >
                                            Deactivate Account
                                        </button>
                                        {isOpen && (
                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                                                <div className="fixed inset-0 flex items-center justify-center">
                                                    <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:max-w-lg">
                                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                    <h3 className="text-base font-semibold leading-6 text-gray-900">Deactivate account</h3>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleDeactivate}>Deactivate</button>
                                                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeModal}>Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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