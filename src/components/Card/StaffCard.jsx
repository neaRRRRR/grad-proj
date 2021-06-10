import React from 'react'
import './StaffCard.styles.scss'
import usericon from '../../assets/usericon.png'

const StaffCard = ({item}) => {


    
        

        
        return(
            
            item.map((data) => {
                return(

                    <div className='staff-card'>
            <div className='inner-card'>
                <div className='up' style={{backgroundImage:"url("+data?.design?.designImages[0]?.imageUrl+")"}}>                       
                    <div className='card-date'>{data?.design?.createdAt}</div> 
                    <div className='card-id'>{data?.fields[0]?.id}</div>                                       
                </div>
                
                <div className='middle' style={{borderTop:"4px solid blue"}}>
                    <div style={{fontSize:"medium"}}>{data?.design?.title}</div>  
                    <div><label style={{fontWeight:"bold"}}>Field Code:</label> {data?.fields[0]?.advertisementField?.fieldCode}</div>                         
                </div>
                
                <div className='down'>
                    <div>
                        
                    </div>
                    <div>{data?.design?.detail}</div>
                </div>
            </div>
        </div>

                )


            })
            
                )
                
          


}

export default StaffCard