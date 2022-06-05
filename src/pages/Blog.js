import React, {useState, useEffect} from 'react';
import {
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBTypography
} from 'mdb-react-ui-kit';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Badge from '../components/Badge';
import { toast } from 'react-toastify';

const Blog = () => {
  const[blog,setBlog] = useState();
  const {id} = useParams();

  useEffect(() => {
    if(id){
      getSingleBlog();
    }
  },[id]);

  const getSingleBlog = async () => {
    const response =  await axios.get(`http://localhost:5000/blogs/${id}`);
    if(response.status === 200){
      setBlog(response.data);
    }else{
      toast.error("something went wrong");
    }
  };

  const styleInfo = {
    display:"inline",
    marginLeft:"5px",
    float:"right",
    marginTop:"7px"
  }

  return (
    <MDBContainer style={{border:"1px solid #d1ebe8"}}>
        <Link to="/home">
            <strong style={{float:"left",color:"black"}} className="mt-3">
                Go Back
            </strong>
        </Link>
        <MDBTypography tag="h2" className='text-muted mt-2' style={{display:"inline-block"}}>
           {blog && blog.title}
        </MDBTypography>
        <img
          src='https://mdbootstrap.com/img/new/standard/nature/182.webp'
          className='img-fluid rounded'
          alt={blog && blog.title}
          style={{width: "100%", maxHeight:"600px"}}
        >
        </img>
        <div style={{marginTop:"20px"}}>
              <div style={{height: "43px",background:"#f6f6f6"}}>
                  <MDBIcon
                      style={{float:"left"}}
                      className="mt-3"
                      faricon="calendar-alt"
                      size="lg"
                  >

                  </MDBIcon>
                  <strong style={{float:"left",marginTop:"12px",marginLeft:"2px"}}>
                     {blog && blog.date}
                  </strong>
              </div>
              <MDBTypography className='lead md-0'>
                  {blog && blog.description}
              </MDBTypography>
        </div>
    </MDBContainer>
  )
}

export default Blog;