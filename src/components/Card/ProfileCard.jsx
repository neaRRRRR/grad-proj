import React from 'react'
import './ProfileCard.styles.scss'
import usericon from '../../assets/usericon.png'

const ProfileCard = ({item}) => {

    const designerBg = '#fcd707'
    const adminBg = '#51BCDA'
    const staffBg = '#8fd310'    
        
        

        return(

                

            item.map((data) => {
                    
                return(

                    <div className='card'>
            <div className='profile-inner-card'>
                <div className='profile-up' style={data.role === 'admin' ? {backgroundColor:adminBg} : data.role === 'designer' ? {backgroundColor:designerBg} : {backgroundColor:staffBg}}>
                    {data.role === 'designer' ? 'DESIGNER' : data.role === 'admin' ? 'ADMIN' : 'STAFF' }
                </div>
                <div className='profile-divider'/>
                <div className='profile-bottom'>

                    <label className='profile-name-label'>{data.role === 'designer' ? data.designerProfile?.fullName : data.role === 'admin' ?  data.adminProfile?.fullName : data.staffProfile?.fullName}</label>
                    <label className='profile-name-mail'>{data.email}</label>
                    <label className='profile-name-number'>{data.role === 'designer' ? data.designerProfile?.mobileNumber : data.role === 'admin' ?  data.adminProfile?.mobileNumber : data.staffProfile?.mobileNumber}</label>
                </div>
            </div>
        </div>

                )
            })
                
            
                    
           
            
        )


}

export default ProfileCard