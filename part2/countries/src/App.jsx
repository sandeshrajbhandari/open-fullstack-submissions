import { useState, useEffect } from "react";
import nationService from "./services/nation";
import axios from "axios";

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY;
  const [weather, setWeather] = useState(null);

  const getWeather = async (city) => {
    console.log(api_key);
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather({
          temp: response.data.main.temp - 273.15,
          icon_id: response.data.weather[0].icon,
          wind: response.data.wind.speed,
        });
      });
  };

  const handleChange = async (event) => {
    setCountryInput(event.target.value);

    console.log("changing name to " + event.target.value);
    const newList = countryList.filter((c) =>
      c.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchList(newList);
    console.log("setting Sarch list");
    console.log(event.target.value.toLowerCase());
    if (
      newList.length == 1 &&
      newList[0].toLowerCase() === event.target.value.toLowerCase()
    ) {
      console.log("setting country details");
      let capital1 = "";
      await nationService.getCountry(newList[0]).then((response) => {
        setCountry(response.data);
        console.log(response.data);
        getWeather(response.data.capital[0]); // added async behavior
      });
      console.log("weather is " + weather);
    } else {
      setCountry(null);
    }
    console.log("last step");
  };

  useEffect(() => {
    nationService.getAll().then((response) => {
      console.log("setting data");
      setCountryList(response.data.map((country) => country.name.common));
      console.log("set data");
    });
  }, [country]);

  const showDetails = (country) => () => {
    handleChange({ target: { value: country } });
  };

  const displaySearch = () => {
    if (searchList.length > 10) {
      return "Too many matches, specify another filter";
    } else if (searchList.length >= 1 && !country) {
      return searchList.map((c) => (
        <div key={c}>
          {c} <button onClick={showDetails(c)}>show</button>
        </div>
      ));
    } else if (searchList.length === 1 && country) {
      console.log("displaying country details");
      return (
        <div>
          <h1>{country.name.common}</h1>
          <div>capital: {country.capital}</div>
          <div>area: {country.area}</div>
          <h2>languages</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt="flag" width="100px" />
          <h2>Weather in {country.name.common}</h2>
          <p>temperature {weather.temp.toFixed(2)} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon_id}@2x.png`}
            alt="weather icon"
          />
          <p>wind: {weather.wind} m/s</p>
        </div>
      );
    }
  };
  return (
    <>
      <div>
        find countries <input value={countryInput} onChange={handleChange} />
      </div>

      <div>{displaySearch()}</div>
    </>
  );
}

export default App;
