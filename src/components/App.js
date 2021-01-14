import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import List from './List'
import Header from './Header'

function App() {
  const [error, setError] = useState('')
  const [employees, setEmployees] = useState([])
  const [ageAverage, setAgeAverage] = useState(0)

  useEffect(() => {
    const fetchEmployees = async () => {
      const url = 'http://localhost:3001/employees?'
      const { data, error, msg } = await (await fetch(url)).json()
      if (error) setError(msg)
      else {
        setError('')
        setEmployees(data.employees)
        setAgeAverage(data.ageAverage)
      }
    }
    fetchEmployees()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header error={error} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <List
                employees={employees}
                setError={setError}
                setEmployees={setEmployees}
                setAgeAverage={setAgeAverage}
                averageAge={ageAverage}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
