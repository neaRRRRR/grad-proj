import React, { useEffect, useState } from 'react'
import './StaffPage.styles.scss'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/actions/loginAction'
import {useHistory,withRouter} from 'react-router-dom'

const StaffPage = () => {

    let userData = useSelector((state) => state.User.users)
    const dispatch = useDispatch()
    const history = useHistory()

    const logoutUser = () => {
        dispatch(logout())
        history.push('/')
    }




    return(
        <div className="navbar">
            <h1>HELLO, <label>{userData.adminProfile?.fullName || userData.designerProfile?.fullName || userData.staffProfile?.fullName} ! </label> <labell> as <label>Staff</label></labell></h1>
            <div>
            <ul>
                <li><a onClick={() => {}}>Adding Design</a></li>
                <li><a onClick={() => {}}>Deleting Design</a></li>
                <li><a onClick={() => {logoutUser()}}>Logout</a></li>
            </ul>

            </div>
        </div>
    )

}


export default StaffPage