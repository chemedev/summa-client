import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import List from './List'
import Header from './Header'
import Details from './Details'
import EmployeeForm from './EmployeeForm'

function App() {
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState('')
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
      <div className="app">
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
          <Route
            exact
            path="/employees/:id/details"
            render={props => <Details setError={setError} {...props} />}
          />
          <Route
            exact
            path="/employees/:id/edit"
            render={props => (
              <EmployeeForm
                employees={employees}
                updateEmployee={true}
                setError={setError}
                {...props}
              />
            )}
          />
          <Route
            path="/employees/add"
            render={props => (
              <EmployeeForm
                updateEmployee={false}
                setError={setError}
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
