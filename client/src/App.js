import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Quotes from './pages/Quotes';
import Admin from './pages/Admin';
import { useContext } from 'react';
import { UserContext } from './context/user/UserContext';
import { QuoteContext } from './context/quotes/QuoteContext';
import { useEffect } from 'react';
import axios from 'axios';
import Profile from './pages/Profile';

function App() {
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(QuoteContext)

  useEffect(() => {
    const fetchUsersQuotes = async() => {
      if(user) {
        try {
            const res = await axios.get(`/quotes/user-quotes/${user._id}`, {
              headers: {authorization:'Bearer ' + user.token}
          })
            dispatch({type:"FETCH_QUOTES", payload: res.data})
        } catch (err) {
            console.error(err.response.data)
        }
      } 
    }
    fetchUsersQuotes()
}, [user])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:id' element={<Home />}></Route>
        <Route path='/login' element={user ? <Navigate to='/' replace /> : <Login />}></Route>
        <Route path='/register' element={user ? <Navigate to='/' replace /> : <Register />}></Route>
        <Route path='/quotes' element={<Quotes />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
