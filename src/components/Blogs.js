import React from 'react';
import {MDBCardImage, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";
import Badge from './Badge';

const Blogs = ({title,content,id,excerpt,handleDelete}) => {
 const userrole = localStorage.getItem('user-role');
  return (
      <MDBCol size="4" >
          <MDBCard className='h-100 mt-2' style={{maxWidth:"22rem"}}>
          <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' />
            <MDBCardBody>
                <MDBCardTitle>
                    <Badge> {title}</Badge>
                    
                </MDBCardTitle>
                <MDBCardText>
                    {content}
                </MDBCardText>
                <Link to={`/blog/${id}`}>Read More</Link>
                {userrole === "SUPERADMIN" && (
                     <span>
                     <MDBBtn type="submit" style={{marginRight: "10px"}} onClick={() => handleDelete(id)}>Delete
                     </MDBBtn>
                     <Link to={`/editBlog/${id}`}>Edit
                     </Link>
                 </span>
                )}            
            </MDBCardBody>
          </MDBCard>
      </MDBCol>
  )
}

export default Blogs;