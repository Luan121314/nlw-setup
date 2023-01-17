import { useState } from 'react'
import './styles/global.css'
import { Habit } from './components/Habit'


function App() {
  const [count, setCount] = useState(0)

  return (<>
   <Habit completed={2}/>
   <Habit completed={2}/>
   <Habit completed={2}/>
   <Habit completed={2}/>
   <Habit completed={2}/>
   <Habit completed={2}/>
  </>
  )
}

export default App
