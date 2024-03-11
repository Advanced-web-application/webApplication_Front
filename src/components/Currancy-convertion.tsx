import { useEffect, useState } from "react";
import restAPIService  from "../services/rest-api-service"
import { CanceledError } from "../services/post-service"

interface ConversionRates {
  USD: number;
  AED: number;
  AFN: number;
  // ... (add all other currencies)
  ZWL: number;
}

const CurrencyConversion = () => {
  const [error, setError] = useState(null);
  const [rates, setRates] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
     const fetchData = async () => { 
         try {
             const { req, abort } =  await restAPIService.getCurrencyRate();
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



  if (error) {
    return <p className='text-danger'>{error}</p>;
  }

  if (!rates) {
    return <div>Loading...</div>;
  } else {
    return (
       <div className="container">
        <h1 className="my-3">Conversion Rates Table:</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
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