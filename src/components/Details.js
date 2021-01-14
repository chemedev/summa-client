import { useEffect, useState } from 'react'
import Spinner from './Spinner'

const Details = ({ setError, ...props }) => {
  const id = props.match.params.id
  const [roles, setRoles] = useState([])
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: '',
    roleId: '',
    designerTypeId: '',
    programmingLanguageId: ''
  })

  useEffect(() => {
    const fetchEmployee = async () => {
      const url = `http://localhost:3001/employees/${id}`
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
      let url = `http://localhost:3001/roles/${role}`
      const { data } = await (await fetch(url)).json()
      setRoles(data)
    }

    if (employee.roleId !== 0) fetchRoles()
  }, [employee.roleId])

  if (!employee.id) return <Spinner />

  const role = employee.roleId === 1 ? 'Diseñador' : 'Desarrollador'

  const activity = roles[employee.typeId - 1]

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
    </div>
  )
}

export default Details
