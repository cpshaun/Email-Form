import { useState } from 'react'
import './App.css'

import Form from './components/Form'

function App() {

  return (
    <div>
      <h1>Simple Email Form</h1>
      <Form />
      <p className="footer-text">
        Developed by  
        <a href="https://shaunis.me" target="_blank" rel="noopener noreferrer"> Chua Peng Shaun</a>
      </p>
    </div>
  )
}

export default App
