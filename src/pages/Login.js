import React,{useState} from 'react';
import { MDBValidation, MDBInput, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

if (typeof window !== "undefined") {
    injectStyle();
  }

const initialstateSignIn = {
    email:"",
    password:""
};

const Login = () => {
    const [formValueSignIn,setformvalueSignIn] = useState(initialstateSignIn);
    const [token,setToken] = useState('');
    const {email,password} = formValueSignIn;
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function notify() {
        toast.dark("Hey 👋, you are logged in successfully!");
    }

    const handleSubmit =  async (e) =>{
        e.preventDefault();
        if(email && password){
            const updatedformData = {...formValueSignIn,securityQuestion:'abc',securityAnswer:'ABC'};
            console.log(updatedformData);
            setLoading(true);
            const response = await axios.post("https://online-blog-heroku.herokuapp.com/api/v1/user/login",updatedformData);
           
             //console.log(response);
             console.log(response.data);
             if(response.status === 200){
                 console.log(response.data.token);
                 setToken(response.data.token);
                 localStorage.setItem('app-token', response.data.token);
                 localStorage.setItem('user-role', response.data.role);
                 setLoading(false);
                 notify();
             }else{
                 toast.error("something went wrong");
             }
            //setformvalueSignIn({email:"",password:""});
            navigate("/home");
        }
        
    };

    const onInputChange = (e) => {
        let {name,value} = e.target;
        setformvalueSignIn({...formValueSignIn,[name]:value});  
    };

    return (
        <>
        <BeatLoader loading={loading}></BeatLoader>
        <MDBValidation className='row g-3' style={{marginTop:"50px"}} noValidate onSubmit={handleSubmit}>
            <p className='fs-2 fw-bold'>Sign in</p>
            <div
                style={{
                    margin:"auto",
                    padding:"15px",
                    maxWidth:"400px",
                    alignContent:"center"
                }}
            >
                <MDBInput
                    value={email || ""}
                    name = "email"
                    type = "text"
                    onChange = {onInputChange}
                    required
                    label = "Email"
                    validation = "Provide an Email"
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
                <MDBBtn type="submit" style={{marginRight: "10px"}}>Signin</MDBBtn>
                <MDBBtn type="danger" style={{marginRight: "10px"}} onClick={()=>navigate("/")}>Signup</MDBBtn>
                <ToastContainer></ToastContainer>
            </div>
        </MDBValidation>
        </>
    )
}

export default Login;