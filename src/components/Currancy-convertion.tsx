import { useEffect, useState } from "react";
import restAPIService  from "../services/rest-api-service"
import { CanceledError } from "../services/post-service"
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

interface ConversionRates {
  USD: number;
  AED: number;
  AFN: number;
  // ... (add all other currencies)
  ZWL: number;
}

const CurrencyConversion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state?.userID;
  console.log("userID: " + userID);

  const [error, setError] = useState(null);
  const [rates, setRates] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
     const fetchData = async () => { 
         try {
             const { req, abort } =  restAPIService.getCurrencyRate();
             abortController.abort = abort;
             const res = await req;
             if (res) {
              console.log(res)
              setRates(res.data.conversion_rates);
              console.log("conversion_rates:" + res.data.conversion_rates)
             }
         } catch (err) {
             console.log(err);
             if (err instanceof CanceledError) return;
             //setError(err.message);
         }
     };
     fetchData();
     return () => {
        abortController.abort();
     }
 
 }, [])


  // useEffect(() => {
  //   const { req, abort } = restAPIService.getCurrencyRate();
  //   req.then((res) => {
  //     console.log(res)
  //     setRates(res.data.conversion_rates);
  //     console.log("conversion_rates:" + res.data.conversion_rates)
  //   }).catch((err) => {
  //     console.log(err)
  //      if (err instanceof CanceledError) return
  //     setError(err.message)
  //   });
  //   return () => {
  //     abort();
  //   };
  // }, []);

  const handleButtonClick = () => {
    console.log(`userID: ${userID}`);
    navigate('/feed');
};

  if (error) {
    return <p className='text-danger'>{error}</p>;
  }

  if (!rates) {
    return <div className="text-center fw-bold fs-1">Loading...</div>
  } else {
    return (
      <div style={{ backgroundColor: "#FFF8DC" }}>
       <div className="container">
      <div className="container">
        <button onClick={handleButtonClick} className="btn btn-secondary btn-sm text-dark float-end">
          go back to feed
        </button>
      </div>
      <h1 className="my-3 text-center text-primary">Conversion Rates Table:</h1>
        <p className="text-center fw-bold">This table displays the current conversion rates for various currencies all over the world.</p>
        <table className="table border border-primary">
  <thead>
    <tr>
      <th className="text-center">Currency</th>
      <th className="text-center">Rate</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(rates).map(([currency, rate]) => (
      <tr key={currency}>
        <td>{currency}</td>
        <td>{Number(rate)}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
      </div>
      // <div>
      //   <h1>Convertion Rates Table:</h1>
      //   {Object.entries(rates).map(([currency, rate]) => (
      //     <div key={currency}>{currency}: {Number(rate)}</div>
      //   ))}
      // </div>
      
    );
  }
  
};

export default CurrencyConversion;