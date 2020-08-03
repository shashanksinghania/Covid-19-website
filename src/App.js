import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';


function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(['worldwide']);

  useEffect(()=>{
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data => {
        setCountries(data.map(country => (
          {
            name: country.country,
            value: country.countryInfo.iso2, 
          }
          )
        ))
      })
    }
    getData();
  },[]);

  // dropdown event change handler
  const onCountryChange = (event) => {
    const newCountry = event.target.value;
    setSelectedCountry(newCountry);
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={selectedCountry} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)
            }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;