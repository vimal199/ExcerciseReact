import './App.css';
import { useEffect, useState } from 'react';
import countryService from './services/countries'
import countries from './services/countries';
const CountryView = ({ names, countries, showCountry, setShowCountry }) => {
  if (Array.isArray(names) && names.length === 0) {
    return null;
  }
  var detailedCountry_temp = {}
  const handleShow = (country) => {
    console.log('detailed country', country);
    detailedCountry_temp = countries.find(
      (country_in) => {
        return country_in.name.common == country;
      }
    )
    console.log('detailed country json', detailedCountry_temp);
    setShowCountry(detailedCountry_temp)
    //<CountryDetails detailedCountry={detailedCountry_temp}></CountryDetails>;
  }
  return (
    <>
      <ul>
        {names.map(
          (country, index) => {
            return (<li key={index} > {country}
              <button type='button' onClick={() => handleShow(country)}>show</button>
            </li>)
          }
        )}

      </ul>
      <CountryDetails detailedCountry={showCountry}></CountryDetails>
    </>
  )
}
const CountryDetails = (props) => {
  if (Object.keys(props.detailedCountry).length === 0)
    return
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
  const [showCountry, setShowCountry] = useState({})
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
      {singlecountry ? <CountryDetails detailedCountry={detailedCountry}></CountryDetails> : <CountryView names={filterednames} countries={countries} showCountry={showCountry} setShowCountry={setShowCountry}  ></CountryView>}
      {warning ? <p>too many matches,specify another filter</p> : null}
    </div>
  );
}
export default App;
