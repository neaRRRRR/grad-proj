import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import Dropdown from 'react-dropdown';
import './DesignerPage.styles.scss'
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
import {useHistory,withRouter,Link} from 'react-router-dom'
import { logout } from '../redux/actions/loginAction'
import axios from 'axios'
import billboard from '../assets/billboard.jpg'
import raket from '../assets/raket.jpg'
import led from '../assets/led.jpg'

const DesignerPage = () => {

    let userData = useSelector((state) => state.User.users)
    const [title,setTitle] = useState('')
    const [desc,setDesc]= useState('')
    const [tags,setTags] = useState('')
    const [img,setImg] = useState()
    const [b64,setB64] = useState()
    const [type,setType] = useState('billboard')
    const [ops,setOps] = useState('adding')
    const [id,setId] = useState()
    const [field,setField] = useState('C75')
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    let {data} = useDesigns()
    const history = useHistory()
    const[data2,setData2] = useState(data)
    const dispatch = useDispatch()

   
    
    
    const options = [
        'billboard', 'clp', 'led'
      ];

    const fieldCods = [
        'C75','A29','K84','J19','Q10','A92','G60','H19'
    ]
    
    const pieData = [
        { title: 'Broken', value: 20, color: '#51BCDA' },
        { title: 'Idle', value: 30, color: '#504E5C' },
        { title: 'Hanged', value: 50, color: '#DADADA' },
        ]

    const defaultOption = options[0];


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

    const addButton = () => {
        // 
       let tagsArr = tags.split(',')
        // console.log(tagsArr)
        
        let startdt = startDate.toISOString().substring(0,10)
        let enddt = endDate.toISOString().substring(0,10)
        let fields = [
            {
                "field_codes": [field], 
                "start_of_hanging": startdt, 
                "end_of_hanging": enddt
            },
        ]
        console.log(type,title,desc,tagsArr,fields)
        let b64s = [b64.substring(22)]
       
        axios.post('http://104.248.123.249/designs/create',
                {
                  designer_id: userData.designerProfile.designerProfileId,
                  type: type,
                  title: title,
                  detail: desc,
                  tags: tagsArr,
                  fields: fields,
                  design_images: b64s,
                }, { headers: {
                  Authorization: 'Bearer ' + userData.token
                } })
                .then(response => {
                  window.alert('Design is succesfully added')
                  
                })
                .catch(error => {
                window.alert('Please check the input fields')
                  console.log(error.response)
                  
                  
                });
        
    }

  

    const refreshData = () => {
        history.push('/')
        setTimeout(() => {
            history.replace('/designer')
        },50)
        
    }

    const deleteDesign = () => {
        console.log(id)
        axios.delete('http://104.248.123.249/designs/delete',{
        headers: {
            Authorization: 'Bearer ' + userData.token
          },
          data: {
            design_id: id
          }
        })
                .then(response => {
                  window.alert('Design is succesfully deleted')
                  
                })
                .catch(error => {
                window.alert('Please check the input fields')
                  console.log(error.response)
                  
                  
                });
    }

    const logoutUser = () => {
        dispatch(logout())
        history.push('/')
    }

    const buttonDisable = () => {
        var hasNumber = /\d/;  

        if(title.length > 14 && desc.length > 15 && tags.length >= 2 && !hasNumber.test(title) && !hasNumber.test(desc)){
            return true
        }else{
          return false 
        }
    }

    return(
        <>
        <div className="navbar">
            <h1>HELLO, <label>{userData.adminProfile?.fullName || userData.designerProfile?.fullName || userData.staffProfile?.fullName} ! </label> <labell> as <label style={{color:'#fcd707'}}>Designer</label></labell></h1>
            <div>
            <ul>
                <li><a onClick={() => {setOps('adding')}}>Adding Design</a></li>
                <li><a onClick={() => {setOps('deleting')}}>Deleting Design</a></li>
                <li><a onClick={() => {logoutUser()}}>Logout</a></li>
            </ul>

            </div>
        </div>
        <div className="row">
            <div className="column left" >
            <button class="refresh-button" onClick={() => {refreshData()}}>Refresh</button>
                <Card item={data}/>       
                     
            </div>
            <div className="column mid" >
                <div className="upper-mid">
                    <Map />
                </div>
                {ops === 'adding' ?  
                
                <div className="lower-mid">
                    <div className="lower-mid-l">
                        <div style={{display:'flex',flexDirection:'row'}}>
                        <Dropdown className="dropdown-style" options={options} onChange={(e) => {setType(e.value)}} value={defaultOption} placeholder="Select an option" />
                        <Dropdown className="dropdown-field-style" options={fieldCods} onChange={(e) => {setField(e.value)}} value={field} placeholder="Select an option" />
                        </div>                      
                        <input placeholder="Title-(Min. 15 char.)"  pattern = "[A-Za-z]"  className="input-style" onChange={(e) => {setTitle(e.target.value)}}  value={title} />
                        <input placeholder="Description-(Min. 10 char.)" className="input-style" onChange={(e) => {setDesc(e.target.value)}} value={desc} />
                        <input placeholder="Tags (Seperate with ',' - Min 2 char.)" className="input-style" onChange={(e) => {setTags(e.target.value)}} value={tags} />
                        Select an Image:<input type="file" className="input-style" name="file" accept="image/png" onChange={(e) => {handleFileInput(e)}} />
                    </div>
                    <div className="lower-mid-r">
                        <div>
                        
                        <div className='calendar-section'>
                            Start Date: <DatePicker selected={startDate} dateFormat={'dd-MM-yyyy'} minDate={new Date()}  onChange={(date) => setStartDate(date)} />
                            End Date: <DatePicker selected={endDate} dateFormat={'dd-MM-yyyy'} minDate={new Date()} onChange={date => setEndDate(date)} />
                            <button class="post-button-designer" disabled={!buttonDisable()} onClick={() => {addButton()}}>Add Design</button>
                        </div>
                        </div>
                        
                    </div>               
                </div>
                
                
                : 
                <div>
                <input placeholder="Enter Design ID" className="input-style" onChange={(e) => {setId(e.target.value)}} value={id}  />
                <button class="delete-button" onClick={() => {deleteDesign()}} >Delete Design</button>
                
                </div>
                
                }
                
            </div>
            <div className="column right" >
            <div style={{textAlign:"center",fontSize:"30px"}}>Billboard Advertisements</div>       
            <img src={billboard} style={{width:'350px',height:'300px'}}/>           
            <div style={{textAlign:"center",fontSize:"30px"}}>Led Advertisements</div>
            <img src={led} style={{width:'350px',height:'300px'}}/>   
            <div style={{textAlign:"center",fontSize:"30px"}}>CLP Advertisements</div>
            <img src={raket} style={{width:'350px',height:'300px'}}/>   
            </div>
        </div>
        </>
        
    
    )
  
}

export default DesignerPage;