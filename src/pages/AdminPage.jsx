import React, { useEffect, useState } from 'react'
import './AdminPage.styles.scss'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/actions/loginAction'
import {useHistory,withRouter} from 'react-router-dom'
import ProfileCard from '../components/Card/ProfileCard'
import axios from 'axios'

const AdminPage = () => {

    let userData = useSelector((state) => state.User.users)
    const dispatch = useDispatch()
    const history = useHistory()
    const [users,setUsers] = useState([])


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



    },[])





    const logoutUser = () => {
        dispatch(logout())
        history.push('/')
    }




    return(
        <>
        <div className="navbar">
            <h1>HELLO, <label>{userData.adminProfile?.fullName || userData.designerProfile?.fullName || userData.staffProfile?.fullName} ! </label> <labell> as <label>Admin</label></labell></h1>
            <div>
            <ul>
                <li><a onClick={() => {}}>Button 1</a></li>
                <li><a onClick={() => {}}>Button 2</a></li>
                <li><a onClick={() => {logoutUser()}}>Logout</a></li>
            </ul>

            </div>
        </div>
        <div className="row">
            <div className="column left" >
            <button class="refresh-button" onClick={() => {}}>Refresh</button>
                <ProfileCard item={users}/>

            </div>
            <div className="column mid" >
                <div className="upper-mid">
                    {/*<Map />*/}
                </div>
                
                
                <div className="lower-mid">
                    <div className="lower-mid-l">
                        <div>
                        
                        </div>                      
                        
                    </div>
                    <div className="lower-mid-r">
                        <div>
                        
                        </div>
                        
                    </div>               
                </div>
             
            </div>
            <div className="column right" >
            

            </div>
        </div>
        </>
    )

}


export default AdminPage