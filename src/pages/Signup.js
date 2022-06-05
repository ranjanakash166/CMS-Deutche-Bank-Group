import React,{useState} from 'react';
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import axios from 'axios';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


if (typeof window !== "undefined") {
    injectStyle();
  }

const initialstateSignup = {
    name:"",
    email:"",
    password:""
}

const Signup = () => {
    const [formValueSignUp,setformvalueSignUp] = useState(initialstateSignup);
    const {name,email,password} = formValueSignUp;
    const navigate = useNavigate();

    function notify() {
        toast.dark("Hey 👋, you are registered successfully!");
    }

    const handleSubmit =  async (e) =>{
        e.preventDefault();
        if(name && email && password){
            const updatedformData = {...formValueSignUp,securityQuestion:'abc',securityAnswer:'ABC'};
             const response = await axios.post("https://online-blog-heroku.herokuapp.com/api/v1/user/signup",updatedformData);
             console.log(updatedformData);
             //console.log(response);
             console.log(response.data);
             if(response.status === 201){
                 notify();
             }else{
                 toast.error("something went wrong");
             }
            setformvalueSignUp({name:"",email:"",password:""});
            navigate("/login");
        }
    };

    const onInputChange = (e) => {
        let {name,value} = e.target;
        setformvalueSignUp({...formValueSignUp,[name]:value});  
      };

    return (
        <MDBValidation className='row g-3' style={{marginTop:"50px"}} noValidate onSubmit={handleSubmit}>
            <p className='fs-2 fw-bold'>Sign Up</p>
            <div
                style={{
                    margin:"auto",
                    padding:"15px",
                    maxWidth:"400px",
                    alignContent:"center"
                }}
            >
                <MDBInput
                    value={name || ""}
                    name = "name"
                    type = "text"
                    onChange = {onInputChange}
                    required
                    label = "username"
                    validation = "Provide a username"
                >
                </MDBInput>
                <br></br>
                <MDBInput
                    value={email || ""}
                    name = "email"
                    type = "text"
                    onChange = {onInputChange}
                    required
                    label = "email"
                    validation = "Provide an email"               
                >
                </MDBInput>
                <br></br>
                <MDBInput
                    value={password || ""}
                    name = "password"
                    type = "password"
                    onChange = {onInputChange}
                    required
                    label = "password"
                    validation = "Provide a password"
                   
                >
                </MDBInput>
                <br></br>
                <br></br>
                <MDBBtn type="submit" style={{marginRight: "10px"}}>Signup</MDBBtn>
                <MDBBtn type="danger" style={{marginRight: "10px"}} onClick={()=>navigate("/login")}>Signin</MDBBtn>
            </div>
            <ToastContainer></ToastContainer>
        </MDBValidation>
    )
}

export default Signup;