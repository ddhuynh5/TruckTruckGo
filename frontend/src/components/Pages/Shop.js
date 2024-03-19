import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../PageComponents/Header";
import Footer from "../PageComponents/Footer";
import Divider from "../PageComponents/Divider";
import Loading from "../PageComponents/Loading";
import { catalog, addToCart } from "../Helpers/PagesHelper";
import { fetchLoginInfo } from "../Helpers/AuthHelper";

const Shop = () => {
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(true);
    const [catalogData, setCatalogData] = useState([]);
    const [searchedItems, setSearchedItems] = useState([]);
    const [search, setSearch] = useState("");
    const [id, setId] = useState("");

    const navigate = useNavigate();
    const isInitialMount = useRef(true);

    const defaultItems = useMemo(() => ["Shoes", "Headphones", "Guitars"], []);

    async function searchCatalog(data) {
        if (data) {
            setLoading(true);
            const products = await catalog(data);
            return products;
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        const searchQuery = document.getElementById("default-search").value;

        if (searchQuery) {
            const productsObj = {};
            let products = await searchCatalog(searchQuery);
            productsObj[searchQuery] = products;

            setSearchedItems(productsObj);
            setSearch(searchQuery);
            setDisplay(false);
            setLoading(false);
        }
    };

    const addItem = async (item) => {
        if (!id) {
            navigate("/signup");
            return;
        }

        const response = await addToCart(id, item, 1);

        if (response) {
            toast.success("Added to cart!", {
                closeButton: false
            });
        }
    };

    useEffect(() => {
        const productsObj = {};

        const fetchProducts = async () => {
            for (let item of defaultItems) {
                let products = await searchCatalog(item);
                products = products.slice(0, 4);
                productsObj[item] = products;
            }

            setCatalogData(productsObj);
            setLoading(false);
        };

        setId(fetchLoginInfo);

        if (isInitialMount.current) {
            fetchProducts();
            isInitialMount.current = false;
        }

    }, [defaultItems]);

    return (
        <div className="h-screen inset-0">
            <Header />
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="pb-12 md:pb-16">
                            <h1 className="text-center text-2xl md:text-3xl font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                                Shop
                            </h1>

                            <form className="max-w-md mx-auto mb-4">
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-700 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg dark:placeholder-gray-400" placeholder="Search Products..." required />
                                    <button
                                        onClick={(event) => { handleSearch(event) }}
                                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                                focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                dark:focus:ring-blue-800"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                            <Divider />

                            {display ? (
                                <>
                                    {!loading ? (
                                        <div className="mt-4 space-y-8">
                                            <div>
                                                <label className="block text-md font-semibold">{defaultItems[0]}</label>
                                                <div className="grid grid-col-1 md:grid-cols-4 gap-6">
                                                    {catalogData && catalogData["Shoes"] && Object.values(catalogData["Shoes"]).map((item) => (
                                                        <div key={item.id} className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex flex-col justify-between">
                                                            <img className="block rounded-lg mb-4" src={item.galleryURL} alt={item.title} />
                                                            <div>
                                                                <span className="flex text-md font-medium mb-4">
                                                                    {item.title}
                                                                </span>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-sm text-gray-500">
                                                                        $ {item.sellingStatus.currentPrice.value}
                                                                    </span>
                                                                    <button
                                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none 
                                                                        font-medium rounded-lg text-sm px-3 py-2.5 text-center 
                                                                        dark:bg-blue-600 dark:hover:bg-blue-700"
                                                                        onClick={() => {
                                                                            addItem({
                                                                                price: item.sellingStatus.currentPrice.value,
                                                                                title: item.title,
                                                                                src: item.galleryURL,
                                                                                id: item.itemId
                                                                            })
                                                                        }}
                                                                    >
                                                                        Add to Cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-md font-semibold">{defaultItems[1]}</label>
                                                <div className="grid grid-col-1 md:grid-cols-4 gap-6">
                                                    {catalogData && catalogData["Headphones"] && Object.values(catalogData["Headphones"]).map((item) => (
                                                        <div key={item.id} className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex flex-col justify-between">
                                                            <img className="block rounded-lg mb-4" src={item.galleryURL} alt={item.title} />
                                                            <div>
                                                                <span className="flex text-md font-medium mb-4">
                                                                    {item.title}
                                                                </span>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-sm text-gray-500">
                                                                        $ {item.sellingStatus.currentPrice.value}
                                                                    </span>
                                                                    <button
                                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none 
                                                                        font-medium rounded-lg text-sm px-3 py-2.5 text-center 
                                                                        dark:bg-blue-600 dark:hover:bg-blue-700"
                                                                        onClick={() => {
                                                                            addItem({
                                                                                price: item.sellingStatus.currentPrice.value,
                                                                                title: item.title,
                                                                                src: item.galleryURL,
                                                                                id: item.itemId
                                                                            })
                                                                        }}
                                                                    >
                                                                        Add to Cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-md font-semibold">{defaultItems[2]}</label>
                                                <div className="grid grid-col-1 md:grid-cols-4 gap-6">
                                                    {catalogData && catalogData["Guitars"] && Object.values(catalogData["Guitars"]).map((item) => (
                                                        <div key={item.id} className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex flex-col justify-between">
                                                            <img className="block rounded-lg mb-4" src={item.galleryURL} alt={item.title} />
                                                            <div>
                                                                <span className="flex text-md font-medium mb-4">
                                                                    {item.title}
                                                                </span>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-sm text-gray-500">
                                                                        $ {item.sellingStatus.currentPrice.value}
                                                                    </span>
                                                                    <button
                                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none 
                                                                        font-medium rounded-lg text-sm px-3 py-2.5 text-center 
                                                                        dark:bg-blue-600 dark:hover:bg-blue-700"
                                                                        onClick={() => {
                                                                            addItem({
                                                                                price: item.sellingStatus.currentPrice.value,
                                                                                title: item.title,
                                                                                src: item.galleryURL,
                                                                                id: item.itemId
                                                                            })
                                                                        }}
                                                                    >
                                                                        Add to Cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Loading />
                                    )}
                                </>
                            ) : (
                                <>
                                    {!loading ? (
                                        <div className="mt-4 space-y-8">
                                            <div>
                                                <label className="block text-md font-semibold">Results</label>
                                                <div className="grid grid-col-1 md:grid-cols-4 gap-6">
                                                    {searchedItems && searchedItems[search] && Object.values(searchedItems[search]).map((item) => (
                                                        <div key={item.id} className="p-5 rounded border-2 hover:shadow-lg cursor-pointer flex flex-col justify-between">
                                                            <img className="block rounded-lg mb-4" src={item.galleryURL} alt={item.title} />
                                                            <div>
                                                                <span className="flex text-md font-medium mb-4">
                                                                    {item.title}
                                                                </span>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-sm text-gray-500">
                                                                        $ {item.sellingStatus.currentPrice.value}
                                                                    </span>
                                                                    <button
                                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none 
                                                                        font-medium rounded-lg text-sm px-3 py-2.5 text-center 
                                                                        dark:bg-blue-600 dark:hover:bg-blue-700"
                                                                        onClick={() => {
                                                                            addItem({
                                                                                price: item.sellingStatus.currentPrice.value,
                                                                                title: item.title,
                                                                                src: item.galleryURL,
                                                                                id: item.itemId
                                                                            })
                                                                        }}
                                                                    >
                                                                        Add to Cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Loading />
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Shop;