import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserIcon, ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ReactComponent as Logo } from "../../assets/images/truck_logo.svg";
import Cookies from "js-cookie";
import Divider from "../PageComponents/Divider";
import { logout } from "../Auth/AuthHelper";

const navigation = [
    { name: "Shop", page: "/shop", current: false },
    { name: "Community", page: "/community", current: false },
    { name: "Leaderboard", page: "/leaderboard", current: false },
    { name: "Resources", page: "/re", current: false },
];


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
};

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [id, setId] = useState("");
    const [roleId, setRoleId] = useState("");

    const handleLogout = async () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            const response = await logout();
            if (response.status >= 200 && response.status < 300) {
                navigate(`/`);
                if (location.pathname === "/")
                    window.location.reload(true);
            }
        }
    }

    useEffect(() => {
        const id = Cookies.get("uniqueId");
        const role = Cookies.get("role");

        setId(id);
        setRoleId(role);
    }, []);

    return (
        <Disclosure as="nav" className="py-2">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center mr-2">
                                    <Logo
                                        alt="Logo"
                                        className="cursor-pointer h-10 w-auto"
                                        onClick={() => {
                                            if (roleId && id) navigate(`/home`)
                                            else navigate(`/`)
                                        }}
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex">
                                        {navigation.map((item) => {
                                            if (item.name === "Resources") {
                                                return (
                                                    <Menu as="div" className="relative focus:outline-none">
                                                        <Menu.Button className="flex text-sm">
                                                            <div className="flex items-center">
                                                                <span
                                                                    className={classNames(
                                                                        "rounded-md px-3 py-2 -ml-3 text-lg font-small hover:underline",
                                                                        location.pathname === item.page ? "text-teal-500" : "text-black",
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </span>
                                                                <ChevronDownIcon className="h-4 w-4 -ml-2" />
                                                            </div>
                                                        </Menu.Button>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/about"
                                                                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                                        >
                                                                            About Us
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/faq"
                                                                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                                        >
                                                                            FAQ
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/support"
                                                                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                                        >
                                                                            Support
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                );
                                            } else {
                                                return (
                                                    <Link
                                                        to={item.page}
                                                        className={classNames(
                                                            "rounded-md px-3 py-2 text-lg font-small -ml-3 focus:outline-none focus:text-teal-500 no-underline hover:underline",
                                                            location.pathname === item.page ? "text-teal-500" : "text-black",
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>

                            </div>
                            {roleId && id ? (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Menu as="div" className="relative ml-3">
                                        <div className="flex justify-center">
                                            <Menu.Button className="relative flex rounded-full text-sm">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <UserIcon className="h-8 w-8" />
                                            </Menu.Button>
                                            <ShoppingCartIcon className="h-8 w-8 ml-4 cursor-pointer" onClick={() => { navigate("/cart") }} />
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/settings"
                                                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                        >
                                                            Settings
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/cart"
                                                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                        >
                                                            Cart
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                            onClick={handleLogout}
                                                        >
                                                            Sign out
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        key="login"
                                        to="/signin"
                                        className="text-gray-400 font-small mr-4 hidden sm:ml-6 sm:block"
                                        onClick={() => { navigate("/signin") }}
                                    >
                                        Login
                                    </Link>
                                    <button
                                        className="text-white bg-teal-500 hover:bg-teal-700 font-medium
                                                rounded-lg text-base px-2 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3"
                                        onClick={() => { navigate("/signup") }}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease duration-500 transform"
                        enterFrom="opacity-0 -translate-y-12"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease duration-300 transform"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-12"
                    >
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => {
                                    if (item.name === "Resources") {
                                        return (
                                            <Menu as="div" className="relative focus:outline-none">
                                                <Menu.Button className="flex text-sm">
                                                    <div className="flex items-center">
                                                        <span
                                                            className={classNames(
                                                                "block rounded-md px-3 py-2 text-base font-small hover:underline",
                                                                location.pathname === item.page ? "text-teal-500" : "text-black",
                                                            )}
                                                        >
                                                            {item.name}
                                                        </span>
                                                        <ChevronDownIcon className="h-4 w-4 -ml-2" />
                                                    </div>
                                                </Menu.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/about"
                                                                    className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                                >
                                                                    About Us
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/faq"
                                                                    className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                                >
                                                                    FAQ
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/support"
                                                                    className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700 no-underline")}
                                                                >
                                                                    Support
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        );
                                    } else {
                                        return (
                                            <Disclosure.Button
                                                key={item.name}
                                                as={Link}
                                                to={item.page}
                                                className={classNames(
                                                    location.pathname === item.page ? "text-teal-500" : "text-black",
                                                    "block rounded-md px-3 py-2 text-base font-medium no-underline hover:underline"
                                                )}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        );
                                    }
                                })}
                                {!roleId && !id && (
                                    <>
                                        <Divider content="" />
                                        <button
                                            className="text-white bg-teal-500 hover:bg-teal-700 font-medium
                                            rounded-lg text-base px-2 py-2 block mx-auto w-full focus:outline-none"
                                            onClick={() => { navigate("/signup") }}
                                        >
                                            Sign Up
                                        </button>
                                        <div className="text-center">
                                            <Link
                                                key="login"
                                                to="/signin"
                                                className="text-gray-400 font-small no-underline focus:outline-none"
                                                onClick={() => { navigate("/signin") }}
                                            >
                                                Login
                                            </Link>
                                        </div>
                                        <Divider content="" />
                                    </>
                                )}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}
