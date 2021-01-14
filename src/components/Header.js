import { Link, useRouteMatch } from 'react-router-dom'

import Error from './Error'

const Header = ({ error }) => {
  const CustomLink = ({ exact, to, classes, children }) => {
    const match = useRouteMatch({ exact, path: to })
    return (
      <Link className={match ? `${classes} btn--active` : classes} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <header className="app-Header">
      <Link to="/" className="btn btn__home">
        Corp 💼
      </Link>
      <CustomLink exact to="/employees/add" classes="btn btn__employees">
        Enrolar empleado
      </CustomLink>
      <CustomLink exact to="/" classes="btn btn__employees">
        Listar empleados
      </CustomLink>
      <Error error={error} />
    </header>
  )
}

export default Header
