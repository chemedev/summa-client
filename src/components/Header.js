import { Link } from 'react-router-dom'

import Error from './Error'

const Header = ({ error }) => {
  return (
    <header className="app-Header">
      <Link to="/" className="btn btn__home">
        Corp 💼
      </Link>
      <Link to="/employees/add" className="btn btn__employees">
        Enrolar empleado
      </Link>
      <Link to="/" className="btn btn__employees">
        Listar empleados
      </Link>
      <Error error={error} />
    </header>
  )
}

export default Header
