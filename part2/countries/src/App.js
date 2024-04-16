import axios from "axios"
import { useState, useEffect } from "react"

const CountryView = ({ country, temps }) => {
  return (
    <div>

      <h3>{country.name.common}</h3>
      <div>{country.capital[0]}</div>
      <div>area {country.area}</div>

      <h4>languages:</h4>
      <ul>
        {Object.entries(country.languages).map((i) => <li key={i[0]}>{i[1]}</li>)}
      </ul>
      <div>{country.flag}</div>
      <h3>weather in {country.name.common}</h3>
      <div>temperature {temps !== undefined && temps.main.temp} Celcius</div>
      <div>
        <img src={`https://openweathermap.org/img/wn/${ temps !== undefined  && temps.weather[0].icon}@2x.png`} />
      </div>
      <div>wind {temps !== undefined && temps.wind.speed} m/s</div>

    </div>
  )
}

const SearchResults = ({ onChangeSingleView, countriesToShow, temps }) => {

  if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
    return (
      <div>
        {
          countriesToShow.map(country =>
            <div key={country.cca2}>
              {country.name.common}
              <button onClick={() => onChangeSingleView(country)} > show</button>
            </div>)
        }
      </div>
    )
  }

  if (countriesToShow.length === 1) {
    return <CountryView country={countriesToShow[0]} temps={temps} />
  }

  return <div>Too many matches, specify another filter</div>
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  const [singleView, setSingleView] = useState(false)
  const [country, setCountry] = useState()
  const [temps, setTemp] = useState()
  const api_key = process.env.REACT_APP_API_KEY

  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().includes(countryName.toLowerCase())
  )


  const handleCountryName = (event) => {
    setCountryName(event.target.value)
    setSingleView(false)

  }

  const handleSingleView = (data) => {
    setCountry(data)
    setSingleView(true)
  }

  const getCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data))
  }

  useEffect(getCountries, [])

  const meteo = () => {

    if (country !== undefined) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${api_key}&units=metric`)
        .then(response => setTemp(response.data))
    }
  }

  useEffect(meteo, [country, api_key])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setCountry(countriesToShow[0])
    }
  }, [countriesToShow])



  return (
    <div>
      <div>
        find countries: <input value={countryName} onChange={handleCountryName} />
      </div>

      {singleView ?
        <CountryView
          temps={temps}
          country={
            countriesToShow.find(
              c => c.cca2 === country.cca2)
          }
        /> :
        <SearchResults
          onChangeSingleView={handleSingleView}
          countriesToShow={countriesToShow}
          temps={temps}
        />
      }
    </div>

  )

}

export default App