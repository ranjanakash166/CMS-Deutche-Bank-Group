import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {MDBRow, MDBCol, MDBContainer, MDBTypography} from 'mdb-react-ui-kit'; 
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import { BeatLoader } from 'react-spinners';

const Home = () => {
  const [data,setData] = useState([]);
  const [searchValue,setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBlogData();
  },[]);


  const loadBlogData = async () => {
    const apptoken = localStorage.getItem('app-token');
    console.log(apptoken);
      const headers = {
          'Authorization': apptoken
      };
      setLoading(true);
    const response = await axios.get("https://online-blog-heroku.herokuapp.com/api/v1/blog/list/published",{
      headers: headers
    });

    if(response.status === 200){
      console.log("data",response.data);
      setData(response.data.content);
      setLoading(false);
    }else{
      toast.error("something went wrong");
    }
  };

  // console.log("data",data);

  const handleDelete = async (id) => {
      if(window.confirm("Are you sure that you wanted to delete that blog")){
        const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
        if(response.status === 200){
          toast.success("Blog Deleted successfully");
          loadBlogData();
        }else{
          toast.error("something went wrong");
        }
      }
  };

  const excerpt = (str) => {
      if(str.length > 50){
        str = str.substring(0,50) + " ... ";
      }
      return str;
  };

  const onInputChange = (event) => {
      if(!event.target.value){
        loadBlogData();
      }
      setSearchValue(event.target.value);
  }

  const handleSearch = async (event) => {
      event.preventDefault();
      const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
      if(response.status === 200){
        setData(response.data);
      }else{
        toast.error("something went wrong");
      }
  }


  return (
    <>
    <BeatLoader loading={loading}></BeatLoader>
    <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}>
    </Search>
    <MDBRow>
      {data.length === 0 && (
        <MDBTypography className='text-center mb-0' tag="h2">
            No Blog Found
        </MDBTypography>
      )}
      <MDBCol>
        <MDBContainer>
          <MDBRow>
            {data.length !== 0 && data.map((item, index) => (
                <Blogs
                  key={index}
                  {...item}
                  excerpt = {excerpt}
                  handleDelete = {handleDelete}
                />
            ))}
          </MDBRow>
        </MDBContainer>
      </MDBCol>
    </MDBRow>
    </>
  )
}

export default Home;