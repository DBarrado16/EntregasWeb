import { useState } from 'react'
import logoUtad from './assets/logoUtad.png'
import InputTarea from './components/InputTarea.jsx'
import Logo from './components/Logo.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        
      </header>
      <main className="container">
        <Logo/>
        <h1 className="title">To Do List</h1>
        <h3 className="subtitle">(Con react)</h3>
        <InputTarea/>
      </main>
    </>
  )
}

export default App
