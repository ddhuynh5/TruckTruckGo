import React, { useState } from 'react';
import { catalog } from './PagesHelper';

function CatalogPage() {
    const [keywords, setKeywords] = useState('');
    const [catalogData, setCatalogData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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



    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const data = await catalog(keywords);
            const resultArray = Object.entries(data.searchResult.item).map(([key, value]) => ({
                id: key,
                ...value,
            }));
            setCatalogData(resultArray);
            for (const key in resultArray)
                console.log(resultArray[key])
        } catch (error) {
            if (error && error['error']) {
                alert(error['error']);
            } else {
                console.error(error);
                alert('An error occurred while searching for item(s).');
            }
        }

        setIsLoading(false);
    };

    return (
        <div className="container" style={{ padding: "100px" }}>
            <h1>Product Catalog Lookup</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type='text'
                    id='keywords'
                    value={keywords}
                    onChange={(event) => setKeywords(event.target.value)}
                    placeholder="Search Scrummy Bears Driving"
                />
                <button type='submit' disabled={isLoading}>
                    Search
                </button>
            </form>

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
    );
}

export default CatalogPage;
