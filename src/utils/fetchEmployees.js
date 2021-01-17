const fetchEmployees = async (setError, setEmployees, setAgeAverage) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/employees?`
    const { data, error, msg } = await (await fetch(url)).json()
    if (error) setError(msg)
    else {
      setError('')
      setEmployees(data.employees)
      setAgeAverage(data.ageAverage)
    }
  } catch (error) {
    console.log(error)
    setError('API: conexión rechazada.')
  }
}

export default fetchEmployees
