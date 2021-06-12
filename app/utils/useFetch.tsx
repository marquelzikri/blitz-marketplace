import { useState, useEffect } from "react"

function useFetch({ url, opts }: { url: string; opts?: any }) {
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch(url, opts)
      .then((res) => res.json())
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch(() => {
        setHasError(true)
        setLoading(false)
      })
  }, [url, opts])
  return [response, loading, hasError]
}

export default useFetch
