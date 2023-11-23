import { useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Assets
import loupe from "../../assets/images/loupe.svg";

const SearchBar = ({ setFilters, setRefresh, refresh }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [select, setSelect] = useState("name");

    const startSearch = (e) => {
        e.preventDefault()
        setFilters(`?${select}=${searchTerm}`);
        setRefresh(!refresh);
    };

    return (
        <form className={styles.__search_bar} onSubmit={(e)=>startSearch(e)}>
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
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;