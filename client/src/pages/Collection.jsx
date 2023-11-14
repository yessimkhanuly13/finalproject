import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { PopupContext } from '../App';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

function Collection() {
    const [collection, setCollection] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [itemdata, setItemData] = useState({
        topic:"",
        desc:"",
        customField1_bool: false,
        customField1_name: "",
        customField1_value: "",
        customField2_bool: false,
        customField2_name: "",
        customField2_value: "",
        customField3_bool: false,
        customField3_name: "",
        customField3_value: "" 
    });

    const [tags, setTags] = useState([]);

    const collectionId = useParams();
    
    const {setMessage, url, darkMode} = useContext(PopupContext)

    const getCollectionById = () =>{
        const user = JSON.parse(localStorage.getItem('currentUser'));
        axios.get(`${url}/collections/${collectionId.id}`)
            .then((res)=>{
                setCollection(res.data)
                if(res.data.userId === user._id){
                    setIsOwner(true);
                }
            })
            .catch((e)=>{
                setMessage(e.response.data.message)
            })
    }


    const addNewItem = () =>{

        const {topic, desc, customField1_bool, customField1_name, customField1_value, customField2_bool, customField2_name, customField2_value, customField3_bool, customField3_name, customField3_value} = itemdata;

        axios.put(`${url}/collections/additem/${collection._id}`, {userId: collection.userId, topic, desc, customField1_bool, customField1_name, customField1_value, customField2_bool, customField2_name, customField2_value, customField3_bool, customField3_name, customField3_value })
            .then((res)=>{
                setMessage(res.data.message);
                setItemData({
                    topic:"",
                    desc:""
                });
            })
            .catch((e)=>{
                setMessage(e.response.data.message);
            })
    }

    const handleData = (e) =>{
        const fields = ['customField1_bool', 'customField2_bool', 'customField3_bool'];

        const {name, value} = e.target;
        if(fields.includes(name) ){
            setItemData({...itemdata, [name]: !itemdata[name] })
        }else{
            setItemData({...itemdata, [name]: value});
        }
        console.log(e.target)
    }

    useEffect(()=>{
        getCollectionById();
    }, [])

  return (
    <div className='w-full'>
        <Navbar/>

        <div className='p-3 text-center'>
            <span className='text-xl font-bold'>{collection.name}</span>
        </div>
        <div className='grid grid-cols-4 gap-3 p-3'>
            { 
                isOwner && (
                    <div className='border row-span-2 flex flex-col items-center gap-3 p-2'>
                        <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="topic" placeholder="Topic" />
                        <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="desc" placeholder="Description"/>
                        <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField1_bool" type="checkbox" checked={itemdata.customField1_bool}/>
                       
                        {
                            itemdata.customField1_bool && (
                                <div>
                                    <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField1_name" placeholder="Field Name 1"/>
                                    <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField1_value" placeholder="Field Value"/>
                                    <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField2_bool" type="checkbox" checked={itemdata.customField2_bool}/>
                                </div>
                            )
                        }
                        {
                            itemdata.customField2_bool && (
                                <div>
                                    <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField2_name" placeholder="Field Name 2"/>
                                    <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField2_value" placeholder="Field Value"/>
                                    <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField3_bool" type="checkbox" checked={itemdata.customField3_bool}/>
                                </div>
                            )
                        }
                        {
                            itemdata.customField3_bool && (
                                <div>
                                    <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField3_name" placeholder="Field Name 3"/>
                                    <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="customField3_value" placeholder="Field Value"/>
                                </div>
                            )
                        }
                        <Button name="Add new Item" style="bg-lime-600 w-full" onClick={addNewItem}/>
                    </div>
            )}
            {
                collection.items && collection.items.map((item)=>{
                    return (
                        <div className='border flex flex-col items-center gap-3 p-2'>
                            <p>Topic: {item.topic}</p>    
                            <p>Desc: {item.desc}</p>
                            <p>Created date: {new Date(item.createdDate).toLocaleString()}</p>
                            {
                                isOwner && 
                                (
                                    <div className='flex w-full'>
                                        <Button name="Delete" style="bg-red-600 w-1/2"/>
                                        <Link to={`/item/${item._id}`} className='w-1/2'><Button name="Link" style="bg-lime-600 w-full"/></Link>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }  
        </div>      
    </div>
  )
}

export default Collection   