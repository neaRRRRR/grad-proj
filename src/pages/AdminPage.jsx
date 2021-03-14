import React from 'react'
import Card from '../components/Card/Card'
import './AdminPage.styles.scss'
const AdminPage = () => {
  
    return(
        <div className="row">
            <div className="column left" >
                <Card />
                <Card />
                <Card />
            </div>
            <div className="column mid" ></div>
            <div className="column right" ></div>
        </div>
    )
  
}

export default AdminPage;