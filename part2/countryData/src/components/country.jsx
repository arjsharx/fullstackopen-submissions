import axios from "axios"
import { useEffect,useState } from "react"


const Country = countryProp => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const capital = countryProp.country.capital
    const [responseData, setResponseData] = useState(null)
    useEffect(() => {
      axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + capital + "&APPID="+ api_key)
        .then(response => {
          setResponseData(response.data)
        })
        .catch(error => { 
          console.error("Error fetching weather data:", error);
        })
    }, [capital, api_key])
    console.log(responseData)
    const imageSource =
    responseData?.weather?.[0]?.icon
      ? `https://openweathermap.org/img/wn/${responseData.weather[0].icon}@4x.png`
      : "";

    return (
        <div>
      <h1>
      {countryProp.country.name.common}
      </h1>
      <div>
        <p>Capital: {countryProp.country.capital}</p>
        <p>Area: {countryProp.country.area}</p>
      </div>
      <h2>Languages</h2>
      <ul>
      {
      Object.values(countryProp.country.languages).map(language => {
        return (
          <li key={language}>{language}</li>
        )
      }
      )}
      </ul>
      <img src={countryProp.country.flags.png}></img>
      <h2>Weather in {capital}</h2>
      {responseData ? (
        <>
          <p>Temperature: {(responseData.main.temp - 273.15).toFixed(2)} Celsius</p>
          <img src={imageSource} alt="Weather icon" />
          <p>Wind: {responseData.wind.speed} m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  )
}
export default Country
