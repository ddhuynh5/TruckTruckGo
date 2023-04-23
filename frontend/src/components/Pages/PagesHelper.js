import axios from 'axios';
import { toast } from 'react-toastify';

export const getCart = async (id) => {
    try {
        const response = await axios.post('http://localhost:8000/cart', {
            user_id: id,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response) {
            return response.data.cartItems;
        }
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while looking up item(s).");
        }
    }
};

export const removeFromCart = async (UserID, itemID) => {
    try {
        const response = await axios.post('http://localhost:8000/cartRemove', {
            UserID: UserID,
            ItemID: itemID
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while looking up item(s).");
        }
    }
};

export const addToCart = async (UserID, item, quantity) => {
    try {
        const response = await axios.post('http://localhost:8000/cartAdd', {
            properties: {
                UserID: UserID,
                ItemID: item.itemId,
                Quantity: quantity,
                ItemName: item.title,
                Price: item.sellingStatus.currentPrice.value,
                img: item.galleryURL
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if (response) {
            toast.success('Added to cart!');
            window.location.reload();
        }
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while looking up item(s).");
        }
    }
};

export const catalog = async (keywords) => {
    try {
        const response = await axios.post('http://localhost:8000/catalog', {
            keywords: keywords
        }, {
            withCredentials: true
        });
        const data = response.data;
        const resultArray = Object.entries(data.searchResult.item).map(([key, value]) => ({
            id: key,
            ...value,
        }));
        return resultArray;
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while looking up item(s).");
        }
    }
};

export const points = async (id) => {
    try {
        const response = await axios.post('http://localhost:8000/points', {
            id: id
        }, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while looking up item(s).");
        }
    }
};

export const currencySymbolMap = {
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
