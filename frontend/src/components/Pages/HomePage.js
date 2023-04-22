import '../../App.css';

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from './Header';
import { catalog } from './PagesHelper';
import ItemModal from './ItemModal';
import Cookies from 'js-cookie';

export default function HomePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [roleId, setRoleId] = useState('');
    const [uniqueId, setUniqueId] = useState('');

    const [catalogData, setCatalogData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


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

        if (!role || !uniqueId)
            navigate("/signin");
    }, [location]);

    const currencySymbolMap = {
        // Most widely used currencies atm, add more as needed
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        CHF: 'Fr.',
        CAD: 'C$',
        AUD: 'A$',
        NZD: 'NZ$',
        HKD: 'HK$',
        SGD: 'S$',
        CNY: '¥',
        KRW: '₩',
        INR: '₹',
        MXN: '$',
        BRL: 'R$',
        RUB: '₽',
        TRY: '₺',
        ZAR: 'R',
        AED: 'د.إ',
        SAR: '﷼',
        QAR: '﷼',
    };

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

    return (
        <>
            <Header SearchCatalog={SearchCatalog} />
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
                            <li key={item.id}>
                                <img onClick={() => openItemModal(item)} src={item.galleryURL} alt={item.title} />
                                <p>{item.title}</p>
                                <p>{currencySymbolMap[item.sellingStatus.currentPrice._currencyId]}{item.sellingStatus.currentPrice.value}</p>
                                <p>{item.stock}</p>
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
        </>
    );
}