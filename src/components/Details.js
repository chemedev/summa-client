import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import fetchEmployees from '../utils/fetchEmployees'

import Spinner from './Spinner'

const Details = ({ setError, setEmployees, setAgeAverage, ...props }) => {
  const id = props.match.params.id
  const history = useHistory()
  const [roles, setRoles] = useState([])
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: '',
    roleId: '',
    designerTypeId: '',
    programmingLanguageId: ''
  })

  const handleDelete = async e => {
    e.preventDefault()
    try {
      const url = `${process.env.REACT_APP_API_URL}/employees/${id}`
      await (await fetch(url, { method: 'DELETE' })).json()
      fetchEmployees(setError, setEmployees, setAgeAverage)
      history.push('/')
    } catch (error) {
      setError('No se pudo conectar con la API.')
    }
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      const url = `${process.env.REACT_APP_API_URL}/employees/${id}`
      const { data, error, msg } = await (await fetch(url)).json()
      if (error) setError(msg)
      else {
        setError('')
        const typeId = data[0].programmingLanguageId ?? data[0].designerTypeId
        data[0].typeId = typeId
        setTimeout(() => {
          setEmployee(data[0])
        }, 500)
      }
    }
    fetchEmployee()
  }, [id, setError])

  useEffect(() => {
    const fetchRoles = async () => {
      let role = employee.roleId === 1 ? 'designer' : 'developer'
      let url = `${process.env.REACT_APP_API_URL}/roles/${role}`
      const { data } = await (await fetch(url)).json()
      setRoles(data)
    }

    if (employee.roleId !== 0) fetchRoles()
  }, [employee.roleId])

  if (!employee.id) return <Spinner />

  const activity = roles[employee.typeId - 1]
  const role = employee.roleId === 1 ? 'Diseñador' : 'Desarrollador'
  return (
    <div className="details-Container">
      <p className="details-Container__title">
        {employee.firstName} {employee.lastName}
      </p>
      <p className="details-Container__line">
        <span>Edad: </span> {employee.age}
      </p>
      <p className="details-Container__line">
        <span>Rol: </span> {role}
      </p>
      <p className="details-Container__line">
        <span>Actividad: </span>
        {activity.name}
      </p>
      <input
        className="btn submit"
        type="button"
        value="Eliminar"
        onClick={handleDelete}
      />
    </div>
  )
}

export default Details
