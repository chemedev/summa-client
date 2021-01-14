import { useState, useEffect } from 'react'

const Filter = ({ setError, setEmployees, setAgeAverage }) => {
  const [option, setOption] = useState(0)
  const [select, setSelect] = useState('Todos')
  const [search, setSearch] = useState(false)
  const [roles, setRoles] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    setSearch(true)
  }

  const handleChange = value => {
    setOption(value)
    setSelect('Todos')
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      let url = 'http://localhost:3001/employees?'
      if (option !== 0) {
        const query = 'roleId'
        url += `${query}=${option}`
      }
      if (select !== 'Todos') {
        let query
        if (option === 1) query = 'designerTypeId'
        else query = 'programmingLanguageId'

        url += `&${query}=${select}`
      }

      const { data, error, msg } = await (await fetch(url)).json()

      if (error) setError(msg)
      else {
        setError('')
        setEmployees(data.employees)
        setAgeAverage(data.ageAverage)
      }
    }

    if (search) {
      fetchEmployees()
      setSearch(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    const fetchRoles = async () => {
      let role = option === 1 ? 'designer' : 'developer'
      let url = `http://localhost:3001/roles/${role}`
      const { data } = await (await fetch(url)).json()
      setRoles(data)
    }

    if (option !== 0) {
      fetchRoles()
    }
  }, [option])

  return (
    <form className="form-Filter" onSubmit={handleSubmit}>
      <div className="form-Filter__container">
        <input
          hidden
          id="all"
          type="radio"
          checked={option === 0}
          name="role"
          onChange={() => handleChange(0)}
          className="form-Filter__radio"
        />
        <label className="btn form-Filter__label" htmlFor="all">
          👥 Todos
        </label>
        <input
          hidden
          id="designer"
          type="radio"
          name="role"
          checked={option === 1}
          onChange={() => handleChange(1)}
          className="form-Filter__radio"
        />
        <label className="btn form-Filter__label" htmlFor="designer">
          🎨 Disñr
        </label>
        <input
          hidden
          id="developer"
          type="radio"
          name="role"
          checked={option === 2}
          onChange={() => handleChange(2)}
          className="form-Filter__radio"
        />
        <label className="btn form-Filter__label" htmlFor="developer">
          👨‍💻 Devs
        </label>
      </div>
      <div className="form-Filter__container">
        <select
          className="btn select"
          value={select}
          onChange={e => setSelect(e.target.value)}
          disabled={!option}
        >
          <option value="Todos">Todos</option>
          {roles &&
            roles.map(role => (
              <option value={role.id} key={role.id}>
                {role.name}
              </option>
            ))}
        </select>
        <input className="btn submit" type="submit" value="Filtrar" />
      </div>
    </form>
  )
}

export default Filter
