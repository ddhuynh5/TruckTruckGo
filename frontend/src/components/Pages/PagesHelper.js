import axios from "axios";
import { toast } from "react-toastify";

export const getCart = async (id) => {
    try {
        const response = await axios.post("http://localhost:8000/cart", {
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
        const response = await axios.post("http://localhost:8000/cartRemove", {
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
        const response = await axios.post("http://localhost:8000/cartAdd", {
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
        const response = await axios.post("http://localhost:8000/updateItem", {
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
        const response = await axios.post("http://localhost:8000/catalog", {
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
        const response = await axios.post("http://localhost:8000/points", {
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

export const order = async (id, email, total, items) => {
    try {
        const response = await axios.post("http://localhost:8000/order", {
            id: id,
            email: email,
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
