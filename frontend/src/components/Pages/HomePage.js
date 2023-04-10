import '../../App.css';

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Header from './Header';
import { catalog } from './PagesHelper';

export default function HomePage() {
    const location = useLocation();
    const [catalogData, setCatalogData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("searchTerm");

        if (searchTerm)
            SearchCatalog(searchTerm);
        else
            SearchCatalog("apple");
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
                {catalogData && (
                    <ul className="image-gallery">
                        {catalogData.map((item) => (
                            <li key={item.id}>
                                <img src={item.galleryURL} alt={item.title} />
                                <p>{item.title}</p>
                                <p>{currencySymbolMap[item.sellingStatus.currentPrice._currencyId]}{item.sellingStatus.currentPrice.value}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}