import React from 'react'
import Card from '../components/Card/Card'
import Dropdown from 'react-dropdown';
import './AdminPage.styles.scss'
import 'react-dropdown/style.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Map from '../components/Map/MapComponent'
import CalendarComp from '../components/CalendarComponent/CalendarComp'

const AdminPage = () => {

    const options = [
        'one', 'two', 'three'
      ];
    const defaultOption = options[0];
    return(
        <div className="row">
            <div className="column left" >
                <Card />
                <Card />
                <Card />
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
                        
                        <div className="input-style"><input /></div>
                        <div className="input-style"><input /></div>
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
            <div className="column right" ></div>
        </div>
    )
  
}

export default AdminPage;