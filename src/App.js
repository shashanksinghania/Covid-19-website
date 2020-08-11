import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util.js'
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);


  useEffect(()=> {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  },[]);

  useEffect(()=>{
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data => {
        const countryData = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2, 
          }));


        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countryData);
      });
    };
    
    getData();
  },[]);

  const onCountryChange = async (event) => {
    const newCountry = event.target.value;

    const url = newCountry === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${newCountry}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      //All data for the country
      setCountryInfo(data);
      setSelectedCountry(newCountry);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })

  }

  console.log("COUNRTY INFO>>>>>", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
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

      <div className="app__stats">
        <InfoBox title="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>

        <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
        
        <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
      </div>

      <Map 
        countries = {mapCountries}
        center={mapCenter}
        zoom={mapZoom}
      />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide New Cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
