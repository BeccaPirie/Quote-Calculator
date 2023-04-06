import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { useContext } from 'react';
import { UserContext } from './context/user/UserContext';

function App() {
  const { user } = useContext(UserContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={user ? <Navigate to='/' replace /> : <Login />}></Route>
        <Route path='/register' element={user ? <Navigate to='/' replace /> : <Register />}></Route>
        <Route path='/quotes' element={<Profile />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
