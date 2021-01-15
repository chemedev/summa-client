import { Link } from 'react-router-dom'

import Filter from './Filter'

const List = ({
  employees,
  ageAverage,
  setError,
  setEmployees,
  setAgeAverage
}) => {
  return (
    <>
      <Filter
        setError={setError}
        setEmployees={setEmployees}
        setAgeAverage={setAgeAverage}
      />
      <ul className="employee-list">
        <li className="employee-list__item">
          <span className="employee-list__id employee-list__id--title">
            # ID
          </span>
          <span className="employee-list__name employee-list__id--title">
            Nombre y apellido
          </span>
        </li>
        {employees.map(emp => {
          const { id, firstName, lastName } = emp
          return (
            <li className="employee-list__item" key={id}>
              <span className="employee-list__id employee-list__id--strip">
                {id}
              </span>
              <div className="employee-list__wrapper">
                <span className="employee-list__name">
                  {`${firstName} ${lastName}`}
                </span>
                <Link
                  className="employee-list__btn"
                  to={`/employees/${id}/details`}
                >
                  🔍
                </Link>
                <Link
                  className="employee-list__btn"
                  to={`/employees/${id}/edit`}
                >
                  ✏️
                </Link>
              </div>
            </li>
          )
        })}
        {ageAverage && (
          <li className="employee-list__item employee-list__item--avg">
            <span className="employee-list__id employee-list__id--avg">
              Edad promedio
            </span>
            <span className="employee-list__name employee-list__name--avg">
              {ageAverage}
            </span>
          </li>
        )}
      </ul>
    </>
  )
}

export default List
