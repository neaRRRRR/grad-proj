import React from 'react'
import './Card.styles.scss'
import usericon from '../../assets/usericon.png'

const Card = () => {

    return(
        <div className='card'>
            <div className='inner-card'>
                <div className='up'>
                    <div className='card-date'>22.04.2021</div>
                </div>
                
                <div className='middle' style={{borderTop:"4px solid blue"}}>
                    <div>Design Name</div>
                    <div style={{fontSize:"smaller",color:"#51BCDA"}}>Design Tags</div>
                </div>
                
                <div className='down'>
                    <div>
                        <img src={usericon} className='card-image'></img>
                    </div>
                    <div>Designer's name surname</div>
                </div>
            </div>
        </div>
    )


}

export default Card