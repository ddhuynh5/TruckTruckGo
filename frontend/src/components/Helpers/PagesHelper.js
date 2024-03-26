import axios from "axios";
import { toast } from "react-toastify";

export const getCart = async (id) => {
    try {
        const response = await axios.post("https://trucktruckgo-backend.onrender.com/cart", {
            user_id: id,
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
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
        const response = await axios.post("https://trucktruckgo-backend.onrender.com/cartRemove", {
            UserID: UserID,
            ItemID: itemID
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
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
        const response = await axios.post("https://trucktruckgo-backend.onrender.com/cartAdd", {
            properties: {
                UserID: UserID,
                ItemID: item.id,
                Quantity: quantity,
                ItemName: item.title,
                Price: item.price,
                img: item.src
            }
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            toast.error(error.response.data, {
                closeButton: false
            });

            return;
        } else {
            toast.error("An error occurred while looking up item(s).", {
                closeButton: false
            });

            return;
        }
    }
};

export const updateItem = async (UserID, item, quantity) => {
    try {
        const response = await axios.post("https://trucktruckgo-backend.onrender.com/updateItem", {
            properties: {
                UserID: UserID,
                ItemID: item.id,
                Quantity: quantity,
            }
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            toast.error(error.response.data, {
                closeButton: false
            });

            return;
        } else {
            toast.error("An error occurred while looking up item(s).", {
                closeButton: false
            });

            return;
        }
    }
};

export const catalog = async (keywords) => {
    try {
        const response = await axios.post("https://trucktruckgo-backend.onrender.com/catalog", {
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
        const response = await axios.post("https://trucktruckgo-backend.onrender.com/points", {
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

export const order = async (id, total, items) => {
    try {
        const response = await axios.post("https://trucktruckgo-backend.onrender.com/order", {
            id: id,
            total: total,
            items: items,
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
}
