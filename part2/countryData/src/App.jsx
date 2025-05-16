import { useState,useEffect } from "react";
import axios from "axios";
import Country from "./components/country";
const App = () => {
  const [countries, setCountry] = useState([])
  const [search, setSearch] = useState('')
  const [state, setState] = useState(null)

  const getCountries = () => {
    const data = axios.get("https://restcountries.com/v3.1/all")
    data.then(response => {setCountry(response.data)})
    console.log(countries)
  }
  useEffect(getCountries,[])
  const onSearch = (e) => {
    setSearch(e.target.value)
    setState(null)
  }
 
  const filteredCountries = search.length === 0 ? countries : 
  countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  useEffect(() => {
    if (filteredCountries.length === 1) {
      setState(filteredCountries[0]);
    }
  }, [filteredCountries])
  return (
    <div>
      <p>find country: <input value={search} onChange={onSearch}></input></p>
      {filteredCountries.length> 10 && search && !state && (
        "Too many results, please be more specific"
      )}
      <ul>
      {filteredCountries.length <= 10 && search && !state && (
        filteredCountries.map((country,index) => {
          return (
            <li key={index}>
              {country.name.common} <button onClick={() => setState(filteredCountries[index])}>show</button>
            </li>
          )
        })
      )}
      </ul>
      {state && (
        <Country country={state}/>
        
      )}
    </div>
  )
}
export default App