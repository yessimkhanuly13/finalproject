import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from '../utils/Button';
import Input from '../utils/Input';

function Registration() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username:"",
    password:"",
  });

  const handleChange = (e) =>{

    const {name, value} = e.target
    setUser({...user, [name]:value});

  }

  const handleRegistration = () =>{
    axios.post(`http://localhost:3434/auth/registration`, user)
      .then(()=>{
        navigate('/');
      })
      .catch((e)=>{
        console.log(e);
      })
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col'>
        <Input type="email" name="username" onChange={handleChange}/>
        <Input type="password" name="password" onChange={handleChange}/>
      </div>
      <div className='flex'>
        <Button name="Go Back" onClick={()=>navigate('/')} />
        <Button name="Submit" onClick={handleRegistration} />
      </div>
    </div>
  )
}

export default Registration