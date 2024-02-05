import { useEffect, useState } from "react";
import restAPIService  from "../services/rest-api-service"
import { CanceledError } from "../services/post-service"


function Currancy() {
    let conversionRates = new Map()
    const [error, setError] = useState()
    useEffect(() => {
        const { req, abort } = restAPIService.getCurrencyRate()
        req.then((res) => {
             conversionRates = new Map(Object.entries(res.data));
        }).catch((err) => {
            console.log(err)
            if (err instanceof CanceledError) return
            setError(err.message)
        })
        return () => {
            abort()
        }

    }, [])
    return (
        <>
            <div>
                {error && <p className='text-danger'>{error}</p>}
            </div>
            <div>
                <h1>Conversion Rates</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...conversionRates].map(([currency, rate], index) => (
                            <tr key={index}>
                                <td>{currency}</td>
                                <td>{rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
     
   
        
}

export default Currancy
