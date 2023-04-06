import axios from 'axios';

export const catalog = async (keywords) => {
    try {
        const response = await axios.post('http://localhost:8000/catalog', {
            keywords: keywords
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while looking up item(s).");
        }
    }
};