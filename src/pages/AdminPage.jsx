import React from 'react'
import Card from '../components/Card/Card'
import Dropdown from 'react-dropdown';
import './AdminPage.styles.scss'
import 'react-dropdown/style.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Map from '../components/Map/MapComponent'
import CalendarComp from '../components/CalendarComponent/CalendarComp'
import { PieChart } from 'react-minimal-pie-chart'

const AdminPage = () => {

    const options = [
        'Billboard', 'CLP', 'Led'
      ];

    const pieData = [
        { title: 'Broken', value: 20, color: '#51BCDA' },
        { title: 'Idle', value: 30, color: '#504E5C' },
        { title: 'Hanged', value: 50, color: '#DADADA' },
        ]

    const defaultOption = options[0];
    return(
        <div className="row">
            <div className="column left" >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className="column mid" >
                <div className="upper-mid">
                    <Map />
                </div>
                <div className="lower-mid">
                    <div className="lower-mid-l">
                        <div>
                        <Dropdown className="dropdown-style" options={options} onChange={() => {}} value={defaultOption} placeholder="Select an option" />
                        </div>
                        
                        <input placeholder="Title" className="input-style"  value="" />
                        <input placeholder="Description" className="input-style"  value="" />
                    </div>
                    <div className="lower-mid-r">
                        <div>
                            <CalendarComp />
                        </div>
                        <div>
                            <button className="circle-button" >
                                +
                            </button>
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