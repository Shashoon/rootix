import { useEffect, useState } from "react";

const Search = ({ addDest }) => {
  const [cityInputValue, setCityInputValue] = useState("");
  const [addressInputValue, setAddressInputValue] = useState("");
  const [citiesList, setCitiesLit] = useState([]);
  const [addressesList, setAddressesList] = useState([]);

  useEffect(() => {
    handleCitiesList();
  }, [cityInputValue]);

  useEffect(() => {
    handleAddresslist();
  }, [addressInputValue]);

  const handleCityChange = (e) => {
    setCityInputValue(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddressInputValue(e.target.value);
  };

  const handleCitiesList = () => {
    fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&q=" +
      cityInputValue
    ).then((res) => {
      res.json().then((response) => {
        const list = response.result.records.map((curr) => curr.שם_ישוב);

        setCitiesLit(list);
      });
    });
  };

  const handleAddresslist = () => {
    fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&limit=3200&q=" +
      cityInputValue + '%2C' + addressInputValue
    ).then((res) => {
      res.json().then((response) => {
        const list = response.result.records.map((curr) => curr.שם_רחוב);
        setAddressesList(list);
      });
    });
  };

  return (
    <>
      <h1>Where to ?</h1>
      <form onSubmit={(e) => addDest(e)}>
        <div className="inputs-deck">
          <div className="form-input">
            <input
              className="textbox"
              list="cities-data"
              placeholder="Choose City.."
              value={cityInputValue}
              onChange={(e) => handleCityChange(e)}
            />
            <datalist id="cities-data">
              <option value="">טוען רשימת ערים...</option>
              {citiesList.map((curr) => (
                <option key={curr} value={curr}></option>
              ))}
            </datalist>
          </div>
          <div className="form-input">
            <input
              className="textbox"
              list="addresses-data"
              placeholder="Choose Address.."
              value={addressInputValue}
              onChange={(e) => handleAddressChange(e)}
            />
            <datalist id="addresses-data">
              <option value="">טוען רשימת רחובות...</option>
              {addressesList.map((curr, index) => (
                <option key={index} value={curr}></option>
              ))}
            </datalist>
          </div>
        </div>
        <input className="btn" type="submit" value="Add Location" />
      </form>
    </>
  );
};

export default Search;
