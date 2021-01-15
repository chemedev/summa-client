import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const EmployeeForm = ({ employees, updateEmployee, setError, ...props }) => {
  const history = useHistory()
  const [roles, setRoles] = useState([])

  let initialState = {}

  useEffect(() => {
    if (!updateEmployee) {
      setInput({
        firstName: '',
        lastName: '',
        age: '',
        roleId: 0,
        typeId: 0
      })
    }
  }, [updateEmployee])

  if (updateEmployee) {
    const id = parseInt(props.match.params.id)
    const [rawEmployee] = employees.filter(e => e.id === id)
    const employee = { ...rawEmployee }
    if (employee.roleId === 1) employee.typeId = employee.designerTypeId
    else employee.typeId = employee.programmingLanguageId
    delete employee.designerTypeId
    delete employee.programmingLanguageId
    initialState = { ...employee }
  } else {
    initialState = {
      firstName: '',
      lastName: '',
      age: '',
      roleId: 0,
      typeId: 0
    }
  }

  const [input, setInput] = useState(initialState)

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'roleId') setInput(state => ({ ...state, typeId: 0 }))

    if (name === 'roleId' || name === 'typeId') value = parseInt(value)

    setInput(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const body = { ...input }
    if (body.roleId === 1) body.designerTypeId = body.typeId
    else body.programmingLanguageId = body.typeId
    delete body.typeId

    let method = updateEmployee ? 'PUT' : 'POST'
    const url = updateEmployee
      ? `http://localhost:3001/employees/${input.id}`
      : 'http://localhost:3001/employees'
    const options = {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }

    const res = await fetch(url, options)
    if (res.ok) {
      history.push('/')
    } else {
      const data = await res.json()
      setError(data.msg)
    }
  }

  useEffect(() => {
    const fetchRoles = async () => {
      let role = input.roleId === 1 ? 'designer' : 'developer'
      let url = `http://localhost:3001/roles/${role}`
      const { data } = await (await fetch(url)).json()
      setRoles(data)
    }

    if (input.roleId !== 0) {
      fetchRoles()
    }
  }, [input.roleId])

  return (
    <form className="form-Employee" onSubmit={handleSubmit}>
      <label className="form-Employee__label">Nombre:</label>
      <input
        placeholder="John"
        className="form-Employee__input-text"
        type="text"
        name="firstName"
        value={input.firstName}
        onChange={handleChange}
      />
      <label className="form-Employee__label">Apellido:</label>
      <input
        placeholder="Doe"
        className="form-Employee__input-text"
        type="text"
        name="lastName"
        value={input.lastName}
        onChange={handleChange}
      />
      <label className="form-Employee__label">Edad:</label>
      <input
        placeholder="18"
        className="form-Employee__input-text"
        type="number"
        name="age"
        min="0"
        value={input.age}
        onChange={handleChange}
      />
      <label className="form-Employee__label">Rol:</label>
      <div className="form-Employee__wrapper">
        <input
          id="designer"
          type="radio"
          name="roleId"
          value={1}
          checked={input.roleId === 1}
          onChange={handleChange}
          hidden
        />
        <label className="btn form-Employee__radio" htmlFor="designer">
          Diseñador
        </label>
        <input
          id="developer"
          type="radio"
          name="roleId"
          value={2}
          checked={input.roleId === 2}
          onChange={handleChange}
          hidden
        />
        <label className="btn form-Employee__radio" htmlFor="developer">
          Desarrollador
        </label>
      </div>
      <label className="form-Employee__label">Posición:</label>
      <select
        className="btn select form-Employee__select"
        value={input.typeId}
        onChange={handleChange}
        disabled={!input.roleId}
        name="typeId"
      >
        <option name="--SELECCIONAR--" value={0}>
          --SELECCIONAR--
        </option>
        {roles &&
          roles.map(role => (
            <option name={role.name} value={role.id} key={role.id}>
              {role.name}
            </option>
          ))}
      </select>
      <input
        className="btn submit form-Employee__submit"
        type="submit"
        value={updateEmployee ? 'Actualizar' : 'Cargar'}
      />
    </form>
  )
}

export default EmployeeForm
