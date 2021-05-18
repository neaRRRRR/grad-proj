import React from 'react'
import './Card.styles.scss'
import usericon from '../../assets/usericon.png'

const Card = ({item}) => {

    
        
        return(
            item.map((data) => {
                return (
                    <div className='card'>
                <div className='inner-card'>
                    <div className='up' style={{backgroundImage:"url("+data.designImages[0].imageUrl+")"}}>                       
                        <div className='card-date'>{data.createdAt}</div> 
                        <div className='card-id'>{data.id}</div>                                       
                    </div>
                    
                    <div className='middle' style={{borderTop:"4px solid blue"}}>
                        <div style={{fontSize:"medium"}}>{data.title}</div>  
                            <div style={{fontSize:"smaller",color:"#51BCDA"}}>{data.designTags.map((item) => item.tag.tag + ', ')}</div>                        
                    </div>
                    
                    <div className='down'>
                        <div>
                            <img src={data.designerProfile.avatarUrl} className='card-image'></img>
                        </div>
                        <div>{data.designerProfile.fullName}</div>
                    </div>
                </div>
            </div>
                )
                
            })
            
        )


}

export default Card