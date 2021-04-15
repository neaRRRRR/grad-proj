import React,{useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.css';
import './LoginPage.styles.scss'
import test from '../assets/test.jpg'
import {useHistory,withRouter} from 'react-router-dom'
import auth from '../auth/auth'

const LoginPage = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid,setEmailValid] = useState(false)
  function validateForm() {
    return email.length > 0 && password.length > 6;
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
    
    auth.login()
    history.push("/admin")
    //history.push("/map")

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
            }}
          />
          {emailValid ? "" : <label className="error-label">Enter a valid email</label>}
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length>6 ? "" : <label className="error-label">Your password is too short</label>}
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
    </div>
    </div>
  );
}

export default LoginPage;