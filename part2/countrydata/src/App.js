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
const WarningMsg = ({ isWarning }) => {

}
function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filterednames, setFilterednames] = useState([])
  const [warning, setWarning] = useState(false)
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
        //alert('Too many matches,specify another filter');
        //setCountry('');
        setFilterednames([]);
        setWarning(true)
      } else {
        setWarning(false)
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
      <CountryView names={filterednames}></CountryView>
      {warning ? <p>too many matches,specify another filter</p> : null}
    </div>
  );
}
export default App;
