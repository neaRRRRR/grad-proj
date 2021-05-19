import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Map from '../components/Map/MapComponent'
import CalendarComp from '../components/CalendarComponent/CalendarComp'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { PieChart } from 'react-minimal-pie-chart'
import { useSelector,useDispatch } from 'react-redux';
import useDesigns from '../hooks/useDesigns'
import {useHistory,withRouter,Link,useParams} from 'react-router-dom'
import { logout } from '../redux/actions/loginAction'
import axios from 'axios'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.css';
import './ResetPage.styles.scss'

const ResetPage = () => {
    const history = useHistory()
    const [pw1,setPw1] = useState('')
    const [pw2,setPw2] = useState('')
    const [validPw,setValidPw] = useState()
    

    let data = useParams()

    

    let data2 = window.location.href



    const handleForm = (e) => {
        e.preventDefault()
        console.log(data2)
        let url = data2.replace('3000','3333')
        axios.post(url,
                {
                  password : pw1,
                  password_confirmation : pw2
                })
                .then(response => {
                  window.alert('Password succesfully changed. You will be redirect to the Login page')
                  history.push('/')
                  
                })
                .catch(error => {
                  console.log('--')
                  console.log(error.response)
                  window.alert('Try again later')
                  
                  
                });

    }


    function isPw(val) {
        if((pw1.length > 6 && pw2.length > 6) || pw1 === pw2){
            setValidPw(true)
        }else{
          setValidPw(false)  
        }
        
      }

    const buttonDisable = () => {
        if((pw1.length > 6 && pw2.length > 6) && pw1 === pw2){
            return true
        }else{
          return false 
        }
    }


 return(
     <>
    <div className='Reset'>
     <Form onSubmit={handleForm}>
        <Form.Group className="lg" controlId="password">
          <Form.Label>Enter new password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={pw1}
            onChange={(e) => {
              setPw1(e.target.value)
              isPw(e.target.value)
            }}
          />
          
        </Form.Group>
        <Form.Group size="lg" controlId="password2">
          <Form.Label>Enter new Password again</Form.Label>
          <Form.Control
            type="password"
            value={pw2}
            onChange={(e) => {
                setPw2(e.target.value)
                isPw(e.target.value)
            }
            }
          />
          
        </Form.Group>       
        {pw1.length > 6 && pw2.length > 6 ? '' : <label>Password should be longer than 6 characters</label>}   
        {pw1 === pw2 ? '' : <label>Passwords didn't match</label>}
        <Button block size="lg" type="submit" disabled={!buttonDisable()} >
          Change
        </Button>
        
      </Form>
      </div>
     </>
 )
  
}

export default ResetPage;