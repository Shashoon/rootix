import { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ addDest }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    event.preventDefault();

    setInputValue(event.target.value);
  };

  const submitAddress = () => {
    console.log(inputValue);
    addDest(inputValue);
    setInputValue("");
  };

  return (
    <div className="search-bar" id="search-bar">
      <div className="input-bar">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          </svg>
        </a>
        <input
          value={inputValue}
          onChange={handleChange}
          placeholder="e.g Dizengoff 42, Tel Aviv"
        />
      </div>
      <button className="search-btn" onClick={submitAddress}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
