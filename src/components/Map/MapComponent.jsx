import { withGoogleMap,GoogleMap, Marker, withScriptjs } from "react-google-maps"
import React from 'react'


function MapComponent(props){


    return(

        <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 41.071, lng: 29.047 }}
    >
      <Marker
        position={{ lat: 41.071, lng: 29.047  }}
      />
    </GoogleMap>

    )
}


  const WrappedMap = withScriptjs(withGoogleMap(MapComponent))

  export default function Map(){
      return(
          <div style={{width:"100vw",height:"100vh",marginRight:"-20px"}}>
          <WrappedMap 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap`}
            loadingElement={<div style={{height:"50%",width:"100%"}}/>}
            containerElement={<div style={{height:"50%",width:"100%"}}/>}
            mapElement={<div style={{height:"100%",width:"400%"}}/>}

          />

          </div>
      )
  }