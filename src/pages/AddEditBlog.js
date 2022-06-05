import React,{useEffect, useState} from 'react';
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import axios from "axios";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";


if (typeof window !== "undefined") {
  injectStyle();
}

const initialstate = {
    title:"",
    content:""
}

const options = ["Travel","Fashion","Fitness","Sports","Food","Tech"];
const blogstatus = ["D","P"];

const AddEditBlog = () => {
  const [formValue,setformvalue] = useState(initialstate);
  const [editMode, setEditMode] = useState(false);
  const {title,content} = formValue;
  const navigate = useNavigate();

  const {id} = useParams();

  function notify() {
    toast.dark("Hey 👋, Blog created successfully!");
}


  useEffect(() => {
    if(id){
      setEditMode(true);
      getSingleBlog(id);
    }else{
      setEditMode(false);
      setformvalue({...initialstate});
    }
  }, [id]);

  const getSingleBlog =  async (id) => {
      const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
      if(singleBlog.status === 200){
        console.log(singleBlog.data);
        setformvalue({...singleBlog.data});
      }else{
        toast.error("something went wrong");
      }
  };


  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2,"0");
    let mm = String(today.getMonth() + 1).padStart(2,"0");
    let yyyy = today.getFullYear();
    today = mm + "/" +dd +"/"+yyyy;
    return today;
  }

  const handleSubmit =  async (e) => {
      e.preventDefault();
    

      if(title && content){
        const currentDate = getDate();
        const apptoken = localStorage.getItem('app-token');
        const headers = {
          'Authorization': apptoken
        }
        if(!editMode){      
          const response = await axios.post("https://online-blog-heroku.herokuapp.com/api/v1/blog",formValue,{
            headers: headers
          });
          if(response.status === 201){
            console.log(response);
            notify();
          }else{
            toast.error("something went wrong");
          }
        }else{
          const response = await axios.patch(`https://online-blog-heroku.herokuapp.com/api/v1/blog/approve?blogId=${id}`);
          if(response.status === 200){
            notify();
          }else{
            toast.error("something went wrong");
          }
        }
          
        navigate("/home");
      }
  };


  const onInputChange = (e) => {
    let {name,value} = e.target;
    setformvalue({...formValue,[name]:value});

  };


  return (
    <MDBValidation className='row g-3' style={{marginTop:"50px"}} noValidate onSubmit={handleSubmit}>
        <p className='fs-2 fw-bold'>{editMode ? "Update Blog":"Add Blog"}</p>
        <div
          style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"}}
        >
         <MDBInput
           value = {title || ""}
           name = "title"
           type = "text"
           onChange = {onInputChange}
           required
           label = "Tile"
           validation = "Provide a tile"
          
          >
         </MDBInput>
         <br></br>
         <MDBTextArea
           value = {content || ""}
           name = "content"
           type = "text"
           onChange = {onInputChange}
           required
           label = "Description"
           validation = "Provide a Description"
           rows={4}
          >
         </MDBTextArea>
          <br></br>
            <br></br>
            <MDBBtn type="submit" style={{marginRight: "10px"}}>{editMode ? "Update":"Add"}</MDBBtn>
            <MDBBtn type="danger" style={{marginRight: "10px"}} onClick={()=>navigate("/")}>Go Back</MDBBtn>
        </div>
    </MDBValidation>
  )
}

export default AddEditBlog;