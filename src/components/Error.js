import React from 'react'

const Error = ({ error }) => {
  const clase = error ? 'error error--show' : 'error'

  return <p className={clase}>{error}</p>
}

export default Error
