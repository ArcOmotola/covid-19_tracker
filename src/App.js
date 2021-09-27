import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import { sortData } from './util';                             //helper function to sort no of cases in descending order
import './App.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {                                                 //fetches data for Worldwide when component first mounts
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, []);

  useEffect(() => {                                                   //fetches list of available countries from api
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        
        const sortedData = sortData(data)
        setTableData(sortedData);
        setCountries(countries);
        
      })
    }
    // console.log(countries)
    getCountriesData();
  }, []);


  const onCountryChange = async (event) => {                           //fetches data from api on selecting item from dropdown menu
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })
    
  }

  // console.log("CURRENT MAP CENTER>>>", mapCenter, countryInfo.country);
  console.log("CURRENT COUNTRY>>>", country);
  console.log("SELECT COUNTRY INFO>>>", countryInfo);
  // console.log("TABULAR CASES BY COUNTRY>>>", tableData); 
  // console.log("ZOOM-CURRENT>>>", mapZoom);
  

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide"> Worldwide </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{ country.name }</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
  
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        <Map 
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
