import React, { useEffect, useState } from 'react'
import './AdminPage.styles.scss'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/actions/loginAction'
import {useHistory,withRouter} from 'react-router-dom'
import ProfileCard from '../components/Card/ProfileCard'
import axios from 'axios'
import Card from '../components/Card/Card';
import HangedDesignCard from '../components/Card/HangedDesignCard';

const AdminPage = () => {

    let userData = useSelector((state) => state.User.users)
    const dispatch = useDispatch()
    const history = useHistory()
    const [users,setUsers] = useState([])
    const [designData,setDesignData] = useState([])
    const [hangedData,setHangedData] = useState([])


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