import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [country, setCountry] = useState('')
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }
  useEffect(
    () => {
      if (country != '') {
        console.log('Fetching Data')
      }
    }, []
  )
  return (
    <div>
      <h1>find countries</h1>
      <input value={country} onChange={handleCountryChange}></input>

    </div>
  );
}
export default App;
