import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Form from "react-bootstrap/Form";


const Search = (props) => {
    const searchInputRef = useRef(null);
    const [keywords, setKeywords] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("searchTerm");

        if (searchTerm) {
            setKeywords(searchTerm);
        }

    }, [location]);

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchTerm = searchInputRef.current.value;
        if (searchTerm) {
            setKeywords(searchTerm);
            navigate(`/home?searchTerm=${searchTerm}`);
            if (location.pathname === "/home") {
                props.SearchCatalog(searchTerm);
            }
        }
        else return;
    };

    return (
        <div className="flex grow items-center justify-center">
            {/* <Form onSubmit={handleSearch} className="w-full max-w-sm">
                <Form.Control
                    type="search"
                    placeholder="Search Products"
                    className="search-input"
                    aria-label="Search Products"
                    ref={searchInputRef}
                    defaultValue={keywords ? keywords : ""}
                />
            </Form> */}
        </div>
    )
}

export default Search