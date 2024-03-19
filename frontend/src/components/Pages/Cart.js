import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import Header from "../PageComponents/Header";
import Footer from "../PageComponents/Footer";
import Divider from "../PageComponents/Divider";
import Loading from "../PageComponents/Loading";
import { getCart, updateItem, removeFromCart } from "../Helpers/PagesHelper";
import { fetchLoginInfo } from "../Helpers/AuthHelper";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Cart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(null);
    const [id, setId] = useState("");
    const [cart, setCart] = useState([]);

    const options = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" }
    ];

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

    const handleCheckout = () => {
        toast.info("This feature is coming soon!", {
            closeButton: false
        })
    };

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
            <Header />
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
                                                            <div key={index}>
                                                                <div className="flex items-center justify-between">
                                                                    <p className="text-sm text-gray-500">{item.ItemName}</p>
                                                                    <p className="text-sm text-gray-500">{item.Quantity}</p>
                                                                    <p className="text-sm">${item.Price}</p>
                                                                </div>
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
                                                        onClick={handleCheckout}
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

                            {(!cart || cart.length === 0) && (
                                <div className="mt-4 space-y-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <ShoppingCartIcon className="h-8 w-8 ml-4 " />
                                        <p className="text-lg font-medium">Your Cart is Empty.</p>
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