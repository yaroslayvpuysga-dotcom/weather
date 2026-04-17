import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// HilltopAds
const s = document.createElement('script');
s.src = "//stupid-police.com/bgXtV.scdRGVlK0FY/W/ct/he/mM9QuZZaUllHk/P/T_Yk5WNxjOYEyeMQznMhtgNuj/kS2/NdjaIBzjNIwx";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
document.head.appendChild(s);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)