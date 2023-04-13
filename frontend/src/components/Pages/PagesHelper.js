import axios from 'axios';

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
