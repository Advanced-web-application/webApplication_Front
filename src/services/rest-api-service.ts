import apiClient, { CanceledError } from "./api-client"


export { CanceledError }

const getCurrencyRate = () => {
    const abortController = new AbortController()
    const req = apiClient.get(`/restAPI`, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export default { getCurrencyRate}