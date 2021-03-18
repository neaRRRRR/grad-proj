import React from 'react'
import Card from '../components/Card/Card'
import './AdminPage.styles.scss'
import Map from '../components/Map/MapComponent'
const AdminPage = () => {
  
    return(
        <div className="row">
            <div className="column left" >
                <Card />
                <Card />
                <Card />
            </div>
            <div className="column mid" >
                <div className="upper-mid">
                <Map />
                </div>
                <div className="lower-mid"></div>
            </div>
            <div className="column right" ></div>
        </div>
    )
  
}

export default AdminPage;