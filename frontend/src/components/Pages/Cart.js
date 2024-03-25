import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import Header from "../PageComponents/Header";
import Footer from "../PageComponents/Footer";
import Divider from "../PageComponents/Divider";
import Loading from "../PageComponents/Loading";
import { getCart, updateItem, removeFromCart, order } from "../Helpers/PagesHelper";
import { fetchLoginInfo } from "../Helpers/AuthHelper";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Cart = () => {
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [total, setTotal] = useState(null);
    const [totalPoints, setTotalPoints] = useState(null);

    const [id, setId] = useState("");
    const [cart, setCart] = useState([]);

    const options = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" }
    ];

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const calculateSubtotal = (newCart) => {
        let newTotal = 0;

        for (let cartItem of newCart) {
            newTotal += cartItem.Price * cartItem.Quantity;
        }

        return newTotal;
    };

    const removeItem = async (id, item) => {
        const response = await removeFromCart(id, item);

        if (response) {
            const newCart = cart.filter(cartItem => cartItem.ItemID !== item);
            setCart(newCart);

            const newTotal = calculateSubtotal(newCart);
            setTotal(newTotal);
        }
    };

    const updateSelectedItem = async (id, item, quantity) => {
        const response = await updateItem(id, item, quantity);

        if (response) {
            const updatedCart = cart.map(cartItem => {
                if (cartItem.ItemID === item.id) {
                    return { ...cartItem, Quantity: quantity };
                }
                return cartItem;
            });
            setCart(updatedCart);

            const newTotal = calculateSubtotal(updatedCart);
            setTotal(newTotal);

            toast.success("Updated cart!", {
                closeButton: false
            });
        }
    }

    const handleCheckout = async () => {
        if (totalPoints - total >= 0) {
            try {
                const items = cart.map(({ ItemName, Price }) => ({ ItemName, Price }));;
                const response = await order(id, total, items);

                if (response) {
                    toast.success("Order placed, thanks for shopping with TruckTruckGo!", {
                        closeButton: false
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error) {
                toast.error(error["error"], {
                    closeButton: false
                });
            }
        } else {
            toast.info("Not enough points! Please remove item(s) or get more points.", {
                closeButton: false
            });
        }
    };

    const handlePoints = (points) => {
        setTotalPoints(points);
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
        setLoading(true);
        const info = fetchLoginInfo();

        if (!info) {
            navigate("/");
            return;
        }

        setId(info);

        const fetchCart = async () => {
            const currentCart = await getCart(id);
            setCart(currentCart);
            setLoading(false);
        };

        fetchCart();
    }, [id, navigate]);

    useEffect(() => {
        const fetchTotal = () => {
            if (cart && cart.length > 0) {
                let subTotal = 0;

                for (let item of cart) {
                    subTotal += item.Price * item.Quantity;
                }

                setTotal(subTotal);
            }
        };

        fetchTotal();
    }, [id, cart]);

    return (
        <div className="h-screen inset-0">
            <Header handlePoints={handlePoints} />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="pb-12 md:pb-16">
                            <h1 className="text-center text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Cart
                            </h1>
                            <Divider />

                            {!loading || (cart && cart.length != 0) ? (
                                <div className="mt-4 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="col-span-1 grid grid-cols-1 gap-6">
                                            {cart && Object.values(cart).map((item, index) => (
                                                <div key={index} className="p-5 rounded border-2 flex flex-col justify-between">
                                                    <img className="block rounded-lg mb-4 w-1/2" src={item.ImageURL} alt={item.ItemName} />
                                                    <div>
                                                        <span className="flex text-md font-medium mb-4">
                                                            {item.ItemName}
                                                        </span>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-500">
                                                                $ {item.Price}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                Quantity:
                                                                <Select
                                                                    id="new-quantity"
                                                                    options={options}
                                                                    value={options.find(option => option.value === item.Quantity)}
                                                                    onChange={(selectedOption) => {
                                                                        updateSelectedItem(
                                                                            id,
                                                                            {
                                                                                price: item.Price,
                                                                                title: item.ItemName,
                                                                                src: item.ImageURL,
                                                                                id: item.ItemID
                                                                            },
                                                                            selectedOption.value
                                                                        )
                                                                    }}
                                                                    placeholder={item.Quantity}
                                                                />
                                                            </span>
                                                            <button
                                                                className="text-blue-500 cursor-pointer focus:outline-none 
                                                                            font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                                                                onClick={() => { removeItem(id, item.ItemID) }}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {(cart && cart.length != 0) && (
                                            <div className="col-span-1 justify-end">
                                                <div className="p-10 bg-gray-100">
                                                    <p className="text-md">Order Summary</p>
                                                    <Divider />
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <p className="text-sm text-gray-500">Item</p>
                                                            <p className="text-sm text-gray-500">Quantity</p>
                                                            <p className="text-sm text-gray-500">Price</p>
                                                        </div>
                                                        {Object.values(cart).map((item, index) => (
                                                            <div key={index} className="flex items-center justify-between">
                                                                <p className="text-sm text-gray-500 truncate">{item.ItemName}</p>
                                                                <p className="text-sm text-gray-500">{item.Quantity}</p>
                                                                <p className="text-sm">${item.Price}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Divider />
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm text-gray-500">Subtotal</p>
                                                        <p className="text-sm text-green-700">${total}</p>
                                                    </div>
                                                    <button
                                                        className="text-white bg-blue-500 cursor-pointer focus:outline-none mt-4
                                                                font-medium rounded-lg text-sm px-3 py-2.5 text-center w-full
                                                                hover:bg-blue-700"
                                                        onClick={openModal}
                                                    >
                                                        Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Loading />
                            )}

                            {(!cart || cart.length === 0) && !loading && (
                                <div className="mt-4 space-y-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <ShoppingCartIcon className="h-8 w-8 ml-4 " />
                                        <p className="text-lg font-medium">Your Cart is Empty.</p>
                                    </div>
                                </div>
                            )}

                            {isOpen && (
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                                    <div className="fixed inset-0 flex items-center justify-center">
                                        <div ref={modalRef} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:max-w-lg">
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <h3 className="text-xl font-semibold leading-6 text-gray-900">Ready to Checkout?</h3>
                                                        <div className="mt-2">
                                                            <Divider />
                                                            {cart && Object.values(cart).map((item, index) => (
                                                                <ul key={index} className="list-disc">
                                                                    <li>
                                                                        <div className="flex flex-row mb-4">
                                                                            <div>
                                                                                <span className="text-md font-medium">
                                                                                    {item.ItemName} - {' '}
                                                                                </span>
                                                                                <span className="text-md text-gray-500">
                                                                                    ${item.Price}
                                                                                </span>
                                                                                <span className="text-md text-gray-500">
                                                                                    {' '}x {item.Quantity}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            ))}
                                                            <Divider />
                                                            <p className="text-base font-medium">Final Cost: ${total}</p>
                                                            <p className="text-sm italic">Items will be sent to your address</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto" onClick={handleCheckout} >Confirm Checkout</button>
                                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:ml-3 " onClick={closeModal}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Cart;