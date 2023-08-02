import './App.css';
import { useEffect, useState } from 'react';
import countryService from './services/countries'
const CountryView = ({ names }) => {
  if (Array.isArray(names) && names.length === 0) {
    return null;
  }
  return (
    <ul>
      {names.map(
        (country, index) => <li key={index} > {country} </li>
      )}
    </ul>
  )
}
const CountryDetails = (props) => {
  const country = props.detailedCountry
  const langs = country.languages
  console.log(country);
  const langs_arr = []
  for (let lang in langs) {
    console.log(langs[lang]);
    langs_arr.push(langs[lang])
  }
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <br />
      <h1>Languages</h1>
      <ul>
        {
          langs_arr.map(
            (lang, index) => <li key={index}>{lang}</li>
          )
        }
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </>
  )
}
function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filterednames, setFilterednames] = useState([])
  const [warning, setWarning] = useState(false)
  const [singlecountry, setSinglecountry] = useState(false)
  const [detailedCountry, setDetailedCountry] = useState({})
  const handleCountryChange = (event) => {
    const country_txt = event.target.value
    setCountry(country_txt)
    if (country != null) {
      const names = countries.reduce(
        (filtered, country) => {
          //console.log(country.name.common);
          if (country.name.common.includes(country_txt)) {
            filtered.push(country.name.common);
          }
          return filtered;
        }, []
      )
      console.log('Filtered list is ', names);
      setFilterednames(names);
      if (names.length > 10) {
        setFilterednames([]);
        setWarning(true)
      } else if (names.length == 1) {
        setWarning(false)
        setSinglecountry(true)
        var detailedCountry_temp = countries.find(
          (country) => {
            return country.name.common == names[0];
          }
        )
        setDetailedCountry(detailedCountry_temp);
      }
      else {
        setWarning(false)
        setSinglecountry(false)
      }
    }
  }
  useEffect(
    () => {

      console.log('Fetching Data')
      countryService.getAll().then(
        (res) => {
          setCountries(res.data)
          console.log('Input list is ', res.data);
        }
      ).catch(function (error) {
        alert('Some Error occured', error)
      });


    }, []
  )
  return (
    <div>
      <h1>find countries</h1>
      <input value={country} onChange={handleCountryChange}></input>
      {singlecountry ? <CountryDetails detailedCountry={detailedCountry}></CountryDetails> : <CountryView names={filterednames}></CountryView>}
      {warning ? <p>too many matches,specify another filter</p> : null}
    </div>
  );
}
export default App;
