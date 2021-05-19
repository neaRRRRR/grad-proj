import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.css';
import './LoginPage.styles.scss'
import test from '../assets/test.jpg'
import {useHistory,withRouter} from 'react-router-dom'
import { fetchData } from '../redux/actions/loginAction'
import auth from '../auth/auth'
import axios from 'axios'

const LoginPage = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [email2, setEmail2] = useState("")
  const [password, setPassword] = useState("")
  const [emailValid,setEmailValid] = useState(false)
  const [chkEmail,setChkEmail] = useState(true)
  const [chkPw,setChkPw] = useState(true)
  const [arr, setArr] = useState([])
  const [isLog,setLog] = useState(true)
  const [pwText,setPwText] = useState('Forgot Password?')
  const [forgot,setForgot] = useState(false)

  function validateForm() {
    return email.length > 0 && password.length > 6;
  }

  const userData = useSelector((state) => state.User)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(userData)
    if(userData.isLoginSuccess){
      auth.login()
      history.push("/admin")
    }
    if(!userData.isLoginSuccess && userData.fetched){
      setLog(false)
    }
  },[arr])

  

  const login = async (email, pw) => {
    await dispatch(fetchData(email, pw))
    console.log(email,pw)
    setArr(userData)
    console.log(userData)
  }
  
   function isEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regEmail.test(val)){
      setEmailValid(true)
    }
    else{
      setEmailValid(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(email,password)
   
    //history.push("/map")

  }

  function sendRecover(event){
    event.preventDefault();
    axios.post('http://127.0.0.1:3333/forgot_password',
                {
                  email : email2
                })
                .then(response => {
                  window.alert('Password reset link succesfully sent to email')
                  
                })
                .catch(error => {
                  console.log('--')
                  console.log(error.response)
                  
                  
                });
  }

  return (
    <div className="row">
    <div className="left-side">
    <div className="left-container">
        <div>
            <img className="img-holder" src={test} alt="map-img" />
        </div>
        <div className="text">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
    </div>
    </div>
    <div className='divider'>

    </div>
    <div className="right-side">
    {
      !forgot ? 
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              isEmail(e.target.value)
              setChkEmail(false)
            }}
          />
          {chkEmail ? "" : emailValid ? "" : <label className="error-label">Enter a valid email</label>}
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => 
            {setPassword(e.target.value)
            setChkPw(false)
            }
            }
          />
          {chkPw ? "" : password.length>6 ? "" : <label className="error-label">Your password is too short</label>}
        </Form.Group>       
        <label style={{color:'#3D63AF'}} onClick={() => {setForgot(!forgot)}}>{pwText}</label>    
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        {isLog ? "" : <label className="error-label">Your login credentials are wrong. Try Again</label>}
      </Form>
    </div>
    : 
    <div className="Login">
      <Form onSubmit={sendRecover}>
        <Form.Group className="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email2}
            onChange={(e) => {
              setEmail2(e.target.value)
              isEmail(e.target.value)
              setChkEmail(false)
            }}
          />
          {chkEmail ? "" : emailValid ? "" : <label className="error-label">Enter a valid email</label>}
        </Form.Group>        
        {forgot ? <label style={{color:'#3D63AF'}} onClick={() => {setForgot(!forgot)}}>Return to Login</label> : <label style={{color:'#3D63AF'}} onClick={() => {setForgot(!forgot)}}>Forgot Password?</label>}
        <Button block size="lg" type="submit" disabled={!emailValid}>
          Send
        </Button>
        </Form>
        
      </div>
    }
    </div>
    </div>
  );
}

export default LoginPage;