import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import AdminDashbrd from './Components/AdminDashbrd';
import UserDashbrd from './Components/UserDashbrd';
import Navbar2 from './Components/Navbar2';
import EmployeeForm from './Components/EmployeeForm';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
       
        <Route path='/' exact element={<Login/>}/>
        <Route path='/navbar' exact element={<Navbar/>}/>
        <Route path='/navbar2' exact element={<Navbar2/>}/>
        <Route path='/admin' exact element={<AdminDashbrd/>}/>
        <Route path='/user' exact element={<UserDashbrd/>}/>
        <Route path='/form' exact element={<EmployeeForm/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
