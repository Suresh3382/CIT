import React from 'react'
import Home from './Components/Layout/Home'
import { BrowserRouter as Router } from 'react-router-dom';


const App = () => {
  return (
    <>
      <Router>
        <Home />
      </Router>
    </>
  )
}

export default App