import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import List from './List'
import Header from './Header'
import Details from './Details'
import EmployeeForm from './EmployeeForm'
import fetchEmployees from '../utils/fetchEmployees'

function App() {
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState('')
  const [ageAverage, setAgeAverage] = useState(0)

  useEffect(() => {
    fetchEmployees(setError, setEmployees, setAgeAverage)
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
                ageAverage={ageAverage}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/employees/:id/details"
            render={props => (
              <Details
                setError={setError}
                setEmployees={setEmployees}
                setAgeAverage={setAgeAverage}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/employees/:id/edit"
            render={props => (
              <EmployeeForm
                employees={employees}
                updateEmployee={true}
                setError={setError}
                setEmployees={setEmployees}
                setAgeAverage={setAgeAverage}
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
                setEmployees={setEmployees}
                setAgeAverage={setAgeAverage}
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
