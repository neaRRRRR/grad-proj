import React, { useEffect, useState } from 'react'
import './AdminPage.styles.scss'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/actions/loginAction'
import {useHistory,withRouter} from 'react-router-dom'
import ProfileCard from '../components/Card/ProfileCard'
import axios from 'axios'
import Card from '../components/Card/Card';
import HangedDesignCard from '../components/Card/HangedDesignCard';
import Dropdown from 'react-dropdown';
import Button from "react-bootstrap/Button";
import Map from '../components/Map/MapComponent'

const AdminPage = () => {

    let userData = useSelector((state) => state.User.users)
    const dispatch = useDispatch()
    const history = useHistory()
    const [users,setUsers] = useState([])
    const [designData,setDesignData] = useState([])
    const [hangedData,setHangedData] = useState([])
    const [type,setType] = useState('')
    const [email,setEmail] = useState('')
    const [pw,setPw] = useState('')
    const [rePw,setRePw] = useState('')
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [emailValid,setEmailValid] = useState()
    const [chkEmail,setChkEmail] = useState(true)
    const [chkPw,setChkPw] = useState(true)
    const [chkName,setChkName] = useState(true)
    const [chkPhone,setChkPhone] = useState(true)
    const [section,setSection] = useState('add')
    const [deletId,setDeletId] = useState('')

    const options = [
        'designer','staff'
      ];

    const defaultOption = options[0];

    useEffect(() => {

        axios.get('http://104.248.123.249/users/',
                { headers: {
                  Authorization: 'Bearer ' + userData.token
                } })
                .then(response => {
                  console.log('ok')
                  setUsers(response.data.data)
                })
                .catch(error => {
                
                  console.log(error.response)
                  
                  
                });

        axios.get('http://104.248.123.249/homepage/admin',
                { headers: {
                  Authorization: 'Bearer ' + userData.token
                } })
                .then(response => {
                  console.log('ok-2')
                  setDesignData(response.data.data.lastTwoDesigns)
                  setHangedData(response.data.data.lastHangedDesignLocations)
                  console.log(response.data.data)
                })
                .catch(error => {
                
                  console.log(error.response)
                  
                  
                });

        



    },[])





    const logoutUser = () => {
        dispatch(logout())
        history.push('/')
    }


    function isEmail(val) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let length = val.length
        if(regEmail.test(val) && length > 15){
          setEmailValid(true)
        }
        else{
          setEmailValid(false)
        }
      }

    //   function isPw(val) {
    //     if((pw1.length > 6 && pw2.length > 6) || pw1 === pw2){
    //         setValidPw(true)
    //     }else{
    //       setValidPw(false)  
    //     }
        
    //   }

    const refreshData = () => {
        history.push('/')
        setTimeout(() => {
            history.replace('/admin')
        },50)
        
    }


    const buttonDisable = () => {
        if(emailValid && pw.length > 6 && rePw.length > 6 && pw === rePw && name.length > 8 && phone.length == 10 ){
            return true
        }else{
          return false 
        }
    }

    const registerUser = () => {
        axios.post('http://104.248.123.249/users/create',
                {
                  role: type,
                  email: email,
                  password: pw,
                  mobile_number: '+90'+phone,
                  full_name: name,
                  password_confirmation: rePw,
                }, { headers: {
                  Authorization: 'Bearer ' + userData.token
                } })
                .then(response => {
                  window.alert('User succesfully created')
                  
                })
                .catch(error => {
                window.alert('Somethings went wrong')
                  console.log(error.response)
                  
                  
                });
    }

    const deleteUser = () => {
        axios.delete('http://104.248.123.249/users/delete',{
        headers: {
            Authorization: 'Bearer ' + userData.token
          },
          data: {
            user_id: deletId
          }
        })
        .then(response => {
            window.alert('User succesfully deleted')
                  
        })
        .catch(error => {
            window.alert('Please check the input fields')
            console.log(error.response)   
                });
    }

    return(
        <>
        <div className="navbar">
            <h1>HELLO, <label>{userData.adminProfile?.fullName || userData.designerProfile?.fullName || userData.staffProfile?.fullName} ! </label> <labell> as <label>Admin</label></labell></h1>
            <div>
            <ul>
                <li><a onClick={() => {setSection('add')}}>Add User</a></li>
                <li><a onClick={() => {setSection('delete')}}>Delete User</a></li>
                <li><a onClick={() => {logoutUser()}}>Logout</a></li>
            </ul>

            </div>
        </div>
        <div className="row">
            <div className="column left" >
            <button class="refresh-button" onClick={() => {refreshData()}}>Refresh</button>
                <ProfileCard item={users}/>

            </div>
            <div className="column mid" >
                <div className="upper-mid">
                    {/*<Map />*/}
                </div>
                
                
                <div className="lower-mid">
                {section === 'add' ?
                <>
                <div className="lower-mid-l">
                    <Dropdown className="dropdown-style" options={options} onChange={(e) => {setType(e.value)}} value={defaultOption} placeholder="Select an option" />                   
                    <input placeholder="Email" maxLength="35" className="input-style" onChange={(e) => 
                    {setEmail(e.target.value) 
                    isEmail(e.target.value)
                    setChkEmail(false)
                    }}  value={email} />
                    {chkEmail ? "" : emailValid ? '' : <label className="error-label">Make sure your email is valid</label>}
                    <input placeholder="Password" className="input-style" 
                    onChange={(e) => {setPw(e.target.value)
                    setChkPw(false)  
                    }}
                     value={pw} />
                    <input placeholder="Confirm Password" className="input-style" 
                    onChange={(e) => {setRePw(e.target.value)
                    setChkPw(false)
                    }}
                     value={rePw} />
                     {chkPw ? "" : pw.length > 6 && rePw.length > 6 ? '' : <label className="error-label">Password should be longer than 6 characters</label>}   
                     {pw === rePw ? '' : <label className="error-label">Passwords didn't match</label>}
                    </div>
                    <div className="lower-mid-r">
                    <div style={{marginTop:'20%', display:'flex', flexDirection:'column'}}>
                    <input placeholder="Full Name" className="input-style" onChange={(e) => {setName(e.target.value)
                    setChkName(false)}}  value={name} />
                    {chkName ? "" : name.length < 8 ? <label className="error-label">Minumum length should be 8</label> : ""}
                    <div style={{display:'flex',flexDirection:'row'}}>
                    <input placeholder="Phone number" className="input-style-phone" onChange={(e) => {}}  value={'+90'} />
                    <input placeholder="Phone number" className="input-style-phone-number" maxLength="10" onChange={(e) => {setPhone(e.target.value)
                    setChkPhone(false)}}  value={phone} />
                    </div>
                    {chkPhone ? "" : phone.length != 10 ? <label className="error-label">Enter valid phone number</label> : ""}
                    <button class="post-button-admin" disabled={!buttonDisable()} onClick={() => {registerUser()}}>Register</button>
                    </div>
                        
                    </div>
                    </>
                    
                      :
                    
                    <div className="lower-mid-l">
                    <div>
                    Enter User ID: <input placeholder="ID" className="input-style-delete-admin" onChange={(e) => {setDeletId(e.target.value)}}  value={deletId} />
                    <button class="delete-button" onClick={() => {deleteUser()}} >Delete User</button>
                    </div>
                    
                    </div>
                
            
                       }
                                 
                </div>
             
            </div>
            <div className="column right" >
            <label className="admin-right-label">Last Two Design</label>
            <Card item={designData} />
            <div style={{width:'100%',border:'1px solid black', marginLeft:'-3%', marginBottom:'5%'}}></div>
            <label className="admin-right-label">Last Hanged Designs</label>
            <HangedDesignCard item={hangedData} />
            </div>
        </div>
        </>
    )

}


export default AdminPage