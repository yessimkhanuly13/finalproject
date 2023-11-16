import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import {Input, Button} from "@nextui-org/react";
import { PopupContext } from '../App';
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';
import {useForm, Controller} from 'react-hook-form'

function Registration() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const {control, handleSubmit, register} = useForm();


  const [user, setUser] = useState({
    username:"",
    password:"",
  });

  const {setMessage, url, darkMode} = useContext(PopupContext);


  const handleChange = (e) =>{

    const {name, value} = e.target
    setUser({...user, [name]:value});

  }

  const handleRegistration = (data) =>{
    axios.post(`${url}/auth/registration`, data)
      .then(()=>{
        navigate('/');
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  return (
    <div className={!darkMode ? "min-h-screen flex items-center justify-center bg-gray-100" : "min-h-screen flex items-center justify-center bg-black"}>
      <div className={!darkMode ? "max-w-md w-full p-4 bg-white rounded-lg shadow-md" : "max-w-md w-full p-4 bg-black rounded-lg shadow-md"}>
        <div className="text-2xl text-center font-semibold mb-4">Registration</div>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="flex flex-col items-center">
            <Controller name='username' control={control} 
              render={({field})=> <Input {...field} isRequired type="email" label="Email"  placeholder="Enter your email" name='username'/>}
            />
            <Controller name='password' control={control}
              render={({field})=><Input
              {...field}
              isRequired
              name="password"
              label="Password"
              placeholder="Enter your password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={()=>setIsVisible(!isVisible)}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className='mt-2'
            />}
            />
              <p className={ !darkMode ? "text-sm text-gray-500 text-center my-2" : "text-sm text-white text-center my-2"}>
                Already have an account? <Link className="text-lime-600 hover:underline" to="/login">Sign In here</Link>
              </p>
            </div>
            <div className="flex justify-around mt-4">
                <Button variant='shadow' color='danger' onClick={()=>navigate('/')}>Go Back</Button>
                {/* <Button variant='shadow' color='success'>Submit</Button> */}
                <button>Submit</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Registration