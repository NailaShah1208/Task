import React,{useState,useEffect} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styling/style.css';
import { Button } from '@mui/material';
const EditForm = () => {
    const [myData,setMyData]=useState({title:'',model:"",price:""})
    const {id}=useParams();
    const[str,setStr]=useState('');
    const navigate=useNavigate()
    useEffect(()=>{
        //to get data from db
        axios.get(`http://localhost:5000/post/`).then((res)=>{
            
            //console.log("edit response=",res.data);
           console.log("respnse is=",res);
           res.data.map((elemis)=>{
            if(elemis.id==id)
            {
                const{title,price,model}=elemis;
                setMyData({...myData,title:title,price:price,model:model})
            }
           })
          
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    
    const handleChange=(e)=>{
        e.preventDefault();
        const name=e.target.name;
        const val=e.target.value;
        console.log("changing field is",[name],val)
 setMyData({...myData,[name]:val})

    }
    const handleSave=(e)=>{
        e.preventDefault()

        console.log("edited data=",myData);
        axios.put(`http://localhost:5000/post/${id}`,myData);
        navigate('/')
    
    

   
    }
    
  return (
    <div>
        <h2>Edit Form</h2>
    <form>
    <div className='formControl'>
     <label htmlFor="title">Title</label> 
     <input type="text" name="title" id="title" value={myData.title} onChange={handleChange}/>  
    </div>  
    <div className='formControl'>
     <label htmlFor="model">Model</label> 
     <input type="text" name="model" id="model" value={myData.model} onChange={handleChange} />  
    </div>  
    <div className='formControl'>
     <label htmlFor="price">Price</label> 
     <input type="text" name="price" id="price" value={myData.price} onChange={handleChange}/>  
    </div>    
    <Button type="Submit" variant="contained" onClick={handleSave}>Save</Button>
    </form>
    </div>
  )
}

export default EditForm
