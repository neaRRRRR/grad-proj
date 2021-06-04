import React from 'react'
import './Card.styles.scss'
import usericon from '../../assets/usericon.png'

const HangedDesignCard = ({item}) => {

    
        
        return(
            item.map((data) => {
                return (
                    <div className='card'>
                <div className='inner-card'>
                    <div className='up' style={{backgroundImage:"url("+data.imageToDisplay[0]+")"}}>                       
                        <div className='card-date'>{data.updatedAt.slice(0,10)}</div> 
                        <div className='card-id'>{data.id}</div>                                       
                    </div>
                    
                    <div className='middle' style={{borderTop:"4px solid blue"}}>
                        <div style={{fontSize:"larger"}}>{data.type.charAt(0).toUpperCase() + data.type.slice(1)}</div>
                        <div style={{fontSize:"medium"}}>{data.fieldCode}</div>
                        {data.designTags ? <div style={{fontSize:"smaller",color:"#51BCDA"}}>{data.designTags.map((item) => item.tag.tag + ', ')}</div>  : ''}                        
                    </div>
                    
                    <div className='down'>
                        {data.staffProfile.avatarUrl === '' ? 
                        <div>
                            <div className='card-image-none'><label className='image-text'>{data.staffProfile.fullName.split(' ').map(name => name[0]).join('').toUpperCase()}</label></div>
                        </div> 
                        :
                        <div>
                            <img src={data.staffProfile.avatarUrl} className='card-image'></img>
                        </div>
                        
                        }
                        <div>{data.staffProfile.fullName}</div>
                    </div>
                </div>
            </div>
                )
                
            })
            
        )


}

export default HangedDesignCard