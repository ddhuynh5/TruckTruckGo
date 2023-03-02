import { useState } from 'react';
import axios from 'axios';

export default function Drivers() {
    const [response, setResponse] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();

        axios.get("http://localhost:8000/drivers", {})
            .then(response => setResponse(response.data))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
            {response ? <div>{JSON.stringify(response)}</div> : null}
        </form>
    );
}
