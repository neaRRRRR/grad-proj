import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import Dropdown from 'react-dropdown';
import './AdminPage.styles.scss'
import 'react-dropdown/style.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Map from '../components/Map/MapComponent'
import CalendarComp from '../components/CalendarComponent/CalendarComp'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { PieChart } from 'react-minimal-pie-chart'
import { useSelector } from 'react-redux';
import useDesigns from '../hooks/useDesigns'
const AdminPage = () => {

    const [title,setTitle] = useState()
    const [desc,setDesc]= useState()
    const [tags,setTags] = useState()
    const [img,setImg] = useState()
    const [b64,setB64] = useState()
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    const {data} = useDesigns()
    
    
    const fakeData = [
        {'createdAt' : 20},
        {'createdAt' : 23},
        {'createdAt' : 240},
        {'createdAt' : 205},
        {'createdAt' : 202},
    ]
    const options = [
        'Billboard', 'CLP', 'Led'
      ];

    
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
            
            setB64(result)
        }).catch(err => {
            console.log(err)
        })

        setImg(file.base64)

    }


    return(
        
        <div className="row">
            <div className="column left" >

                <Card item={data}/>       
                     
            </div>
            <div className="column mid" >
                <div className="upper-mid">
                    {/*<Map />*/}
                </div>
                <div className="lower-mid">
                    <div className="lower-mid-l">
                        <div>
                        <Dropdown className="dropdown-style" options={options} onChange={() => {}} value={defaultOption} placeholder="Select an option" />
                        </div>                      
                        <input placeholder="Title" className="input-style" onChange={(e) => {setTitle(e.target.value)}}  value={title} />
                        <input placeholder="Description" className="input-style" onChange={(e) => {setDesc(e.target.value)}} value={desc} />
                        <input placeholder="Tags (Seperate with ',')" className="input-style" onChange={(e) => {setTags(e.target.value)}} value={tags} />
                        <input type="file" className="input-style" name="file" accept="image/png" onChange={(e) => {handleFileInput(e)}} />
                    </div>
                    <div className="lower-mid-r">
                        <div>
                        <div className='calendar-section'>
                            Start Date: <DatePicker selected={startDate} dateFormat={'dd-MM-yyyy'} minDate={new Date()} onChange={date => setStartDate(date)} />
                            End Date: <DatePicker selected={endDate} dateFormat={'dd-MM-yyyy'} minDate={new Date()} onChange={date => setEndDate(date)} />
                        </div>
                        </div>
                        
                    </div>               
                </div>
            </div>
            <div className="column right" >
            <div style={{textAlign:"center",fontSize:"30px"}}>Status of Advertisements</div>
                <div style={{width:'80%',height:'80%'}}>
            <PieChart
                data={pieData}
                label={({dataEntry}) => dataEntry.title}
                labelStyle={(index) => ({
                    fill: 'black',
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                })}
                labelPosition={55}
                radius="30"
                animate="true"
                viewBoxSize={["90","90"]}
            />
            
                </div>
            </div>
        </div>
        
    
    )
  
}

export default AdminPage;