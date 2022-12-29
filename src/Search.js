import { useState } from "react";

const Search = ({ addDest }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const hanleAddressList = () => {
        //addresses list
    }


  return (
    <>
      <h1>Where to ?</h1>
      <form onSubmit={(e) => addDest(e)}>
        <input className="textbox" 
        type="text"
        placeholder="Enter Address.."
        value={inputValue} 
        onChange={(e) => handleChange(e)}/>
        <input className="btn" type="submit" value={"Search"} />
      </form>
    </>
  );
};

export default Search;
