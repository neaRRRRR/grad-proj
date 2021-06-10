import React, { useEffect, useState } from 'react'
import './StaffPage.styles.scss'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/actions/loginAction'
import {useHistory,withRouter} from 'react-router-dom'
import useDesigns from '../hooks/useDesigns'
import Map from '../components/Map/MapComponent'
import Card from '../components/Card/Card'
import StaffCard from '../components/Card/StaffCard'
import { PieChart } from 'react-minimal-pie-chart'
import useDesignsFilter from '../hooks/useDesignsFilter'
import axios from 'axios'

const StaffPage = () => {

    let userData = useSelector((state) => state.User.users)
    const dispatch = useDispatch()
    const history = useHistory()
    const [staffHome,setStaffHome] = useState([])
    const [b64,setB64] = useState()
    const [img,setImg] = useState()
    const [id,setId] = useState('')
    let {data} = useDesigns()
    let {data2} = useDesignsFilter()


    const logoutUser = () => {
        dispatch(logout())
        history.push('/')
    }

    const handleFileInput = (e) => {
        console.log(e.target.files[0])

        

        let file = e.target.files[0]

        getBase64(file).then(result => {
            file["base64"] = result
            console.log(file.base64)
            setB64(file.base64)
        }).catch(err => {
            console.log(err)
        })

        
        setImg(file.base64)

    }


    const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            //console.log("Called", reader);
            baseURL = reader.result;
            resolve(baseURL);
          };
          //console.log(fileInfo);
        });
      };


    const refreshData = () => {
        history.push('/')
        setTimeout(() => {
            history.replace('/staff')
        },50)
        
    }

    useEffect(() => {

        axios.get('http://104.248.123.249/homepage/staff',
                { headers: {
                  Authorization: 'Bearer ' + userData.token
                } })
                .then(response => {
                  console.log('ok')
                  setStaffHome(response.data.data)
                  
                })
                .catch(error => {
                
                  console.log(error.response)
                  
                  
                });



    },[])


    const hangDesign = () => {

        let b64s = [b64.substring(22)]

        axios.post('http://104.248.123.249/staff/upload',
                {
                  breakdown_mode: false,
                  design_field_id: id,
                  staff_id: userData.staffProfile.staffProfileId,
                  field_images: b64s,
                }, { headers: {
                  Authorization: 'Bearer ' + userData.token
                } })
                .then(response => {
                  window.alert('Design is succesfully hanged')
                  
                })
                .catch(error => {
                window.alert('Please check the input fields')
                  console.log(error.response)
                  
                  
                });

    }

    const pieData = [
        { title: 'Broken', value: 20, color: '#51BCDA' },
        { title: 'Idle', value: 30, color: '#504E5C' },
        { title: 'Hanged', value: 50, color: '#DADADA' },
        ]
        
    console.log(staffHome)
    return(
        <>
        <div className="navbar">
            <h1>HELLO, <label>{userData.adminProfile?.fullName || userData.designerProfile?.fullName || userData.staffProfile?.fullName} ! </label> <labell> as <label style={{color:'#8fd310'}}>Staff</label></labell></h1>
            <div>
            <ul>
                <li><a onClick={() => {logoutUser()}}>Logout</a></li>
            </ul>

            </div>
        </div>
        <div className="row">
            <div className="column left" >
            <button class="refresh-button" onClick={() => {refreshData()}}>Refresh</button>
                <label className="designs-label">DESIGNS</label>
                <Card item={data}/>   

            </div>
            <div className="column mid" >
                <div className="upper-mid">
                    <Map />
                </div>
                <div className='staff-input'>
                <input placeholder="Enter the ID" className="staff-input-style" onChange={(e) => {setId(e.target.value)}}  value={id} />
                <div>Select an Image:  <input type="file" className="staff-input-style" name="file" accept="image/png" onChange={(e) => {handleFileInput(e)}} /></div>
                <button class="staff-hang-button" onClick={() => {hangDesign()}} >Hang The Design</button>
                </div>
            </div>
            <div className="column right" >
            
                <StaffCard item={staffHome}/>
            </div>
        </div>
        </>
    )

}


export default StaffPage