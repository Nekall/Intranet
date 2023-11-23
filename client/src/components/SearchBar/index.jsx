import { useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Assets
import loupe from "../../assets/images/loupe.svg";

const SearchBar = ({ setFilters, setRefresh, refresh }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [select, setSelect] = useState("name");

    const startSearch = () => {
        setFilters(`?${select}=${searchTerm}`);
        setRefresh(!refresh);
    };

    return (
        <div className={styles.__search_bar}>
            <img className={styles.__loupe_icon} src={loupe} alt="loupe" />
            <input
                type="text"
                placeholder="search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
                onChange={(event) => setSelect(event.target.value)}
                value={select}
            >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="city">City</option>
            </select>
            <button onClick={startSearch}>Search</button>
        </div>
    );
}

export default SearchBar;