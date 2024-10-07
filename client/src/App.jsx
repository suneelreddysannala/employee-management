import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './signup'
import Login from './login'
import CreateEmployee from './create'
import EmployeeList from './employeelist'
import {BrowserRouter,Routes,Route} from 'react-router-dom'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/create' element={<CreateEmployee/>}></Route>
          <Route path='employeelist' element={<EmployeeList/>}></Route>
        </Routes>
        </BrowserRouter>

    </div>
   
  )
}

export default App
