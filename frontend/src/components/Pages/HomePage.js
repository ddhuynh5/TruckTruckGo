import '../../App.css';

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from './Header';
import { catalog, currencySymbolMap } from './PagesHelper';
import ItemModal from './ItemModal';
import Cookies from 'js-cookie';

export default function HomePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [roleName, setRoleId] = useState('');
    const [uniqueId, setUniqueId] = useState('');

    const [catalogData, setCatalogData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("searchTerm");

        if (searchTerm)
            SearchCatalog(searchTerm);
        else
            SearchCatalog("apple");

        const unique = Cookies.get("uniqueId");
        const role = Cookies.get("role");
        setRoleId(role);
        setUniqueId(unique);
        setPageLoading(false);
    }, [location]);

    async function SearchCatalog(data) {
        if (data) {
            setIsLoading(true);
            const items = await catalog(data);
            setCatalogData(items);
            setIsLoading(false);
        }
    }

    const openItemModal = (item) => {
        setSelectedItem(item);
    };

    const closeItemModal = () => {
        setSelectedItem(null);
    };

    const handleShowCheckout = (show) => {
        setShowCheckout(show);
    };

    return (
        <>
            <Header />
            {!showCheckout && (
                <div className="container">
                    {isLoading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading...</p>
                        </div>
                    )}
                    {!isLoading && catalogData && (
                        <ul className="image-gallery">
                            {catalogData.map((item) => (
                                <li
                                    key={item.id}
                                    className="list-item"
                                    onMouseOver={e => {
                                        e.currentTarget.classList.add("hovered");
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.classList.remove("hovered");
                                    }}
                                    onClick={() => openItemModal(item)}
                                >
                                    <img src={item.galleryURL} alt={item.title} />
                                    <p>{item.title}</p>
                                    <p>{currencySymbolMap[item.sellingStatus.currentPrice._currencyId]}{Number(item.sellingStatus.currentPrice.value).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                    {selectedItem && (
                        <ItemModal
                            isOpen={true}
                            closeItemModal={closeItemModal}
                            itemImage={selectedItem.galleryURL}
                            itemTitle={selectedItem.title}
                            item={selectedItem}
                        />
                    )}
                </div>
            )}
        </>
    );
}