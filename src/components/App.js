import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'

function App() {
  const [error, setError] = useState('')

  return (
    <BrowserRouter>
      <div className="App">
        <Header error={error} />
      </div>
    </BrowserRouter>
  )
}

export default App
