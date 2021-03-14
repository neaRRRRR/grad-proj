import React from 'react'
import './Card.styles.scss'

const Card = () => {

    return(
        <div className='card'>
            <div className='inner-card'>
                <div className='up'>Date of design</div>
                
                <div className='middle'>Design Name</div>
                
                <div className='down'>Designer's name surname</div>
            </div>
        </div>
    )


}

export default Card