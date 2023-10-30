import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import AdminPanel from "./pages/AdminPanel"
import User from "./pages/User"
import Item from "./pages/Item"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import { createContext, useState } from "react"
import Popup from "./components/Popup"

export const Error = createContext();

function App() {
  const [error, setError] = useState('');


  return (
    <>
      <Error.Provider value={{error, setError}} >
        <Navbar/>
        {error && <Popup message={error} handleCloseError={()=>setError('')}/>}
        <Routes>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="/users/:id" element={<User/>}/>
          <Route path="/items/:id" element={<Item/>}/>
        </Routes>
      </Error.Provider>
    </>
  )
}

export default App
