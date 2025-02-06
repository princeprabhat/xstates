import axios from "axios";
import React, { useEffect, useState } from "react";
import MessageBanner from "./MessageBanner";

const XStates = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedData, setSelectedData] = useState({
    selectedCountry: null,
    selectedState: null,
    selectedCity: null,
  });
  //   useEffect(() => {}, []);

  useEffect(() => {
    const fetchState = async (countryName) => {
      try {
        const stateData = await axios.get(
          `https://crio-location-selector.onrender.com/country=${countryName}/states`
        );
        setStates(stateData.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCity = async (countryName, stateName) => {
      try {
        const cityData = await axios.get(
          `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
        );
        setCities(cityData.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedData.selectedCountry && selectedData.selectedState)
      fetchCity(selectedData.selectedCountry, selectedData.selectedState);

    if (selectedData.selectedCountry) fetchState(selectedData.selectedCountry);
  }, [selectedData.selectedCountry, selectedData.selectedState]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );

        setCountries(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="container">
      <h1>Select Location</h1>
      <div className="container-dropdown">
        <select
          name="country"
          id="country"
          value={selectedData.selectedCountry || ""}
          onChange={(e) => {
            setSelectedData({
              selectedCountry: e.target.value,
              // selectedState: null,
              // selectedCity: null,
            });
            setStates([]);
            setCities([]);
          }}
        >
          <option value="">Select Country</option>
          {countries &&
            countries.map((el, idx) => {
              return (
                <option value={el} key={idx}>
                  {el}
                </option>
              );
            })}
        </select>
        <select
          name="state"
          id="state"
          value={selectedData.selectedState || ""}
          onChange={(e) => {
            setSelectedData({
              ...selectedData,
              selectedState: e.target.value,
            });
            setCities([]);
          }}
          disabled={!selectedData.selectedCountry}
        >
          <option value="">Select State</option>
          {states &&
            states.map((el, idx) => {
              return (
                <option value={el} key={idx}>
                  {el}
                </option>
              );
            })}
        </select>
        <select
          name="city"
          id="city"
          value={selectedData.selectedCity || ""}
          onChange={(e) => {
            setSelectedData({ ...selectedData, selectedCity: e.target.value });
          }}
          disabled={!selectedData.selectedState}
        >
          <option value="">Select City</option>
          {cities &&
            cities.map((el, idx) => {
              return (
                <option value={el} key={idx}>
                  {el}
                </option>
              );
            })}
        </select>
      </div>
      <MessageBanner
        country={selectedData.selectedCountry}
        state={selectedData.selectedState}
        city={selectedData.selectedCity}
      />
    </div>
  );
};

export default XStates;
