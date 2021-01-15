import { useEffect, useState } from 'react'

const useFetch = url => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abort = new AbortController()

    fetch(url, { signal: abort.signal })
      .then(res => {
        if (!res.ok) throw Error('Could not fetch that resource.')
        return res.json()
      })
      .then(({ data }) => {
        setData(data)
        setError(null)
      })
      .catch(err => err.name !== 'AbortError' && setError(err.message))
      .finally(setIsPending(false))

    return () => abort.abort()
  }, [url])

  return [data, isPending, error]
}

export default useFetch
