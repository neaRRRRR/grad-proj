import { withGoogleMap,GoogleMap, Marker, withScriptjs } from "react-google-maps"
import React from 'react'


function MapComponent(props){


    return(

        <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 36.209, lng: 36.167 }}
    >
      <Marker
        position={{ lat: 36.217, lng: 36.133  }}
        label={'C75'}
        
      />
      <Marker
        position={{ lat: 36.223, lng: 36.140  }}
        label={'A29'}
      />
      <Marker
        position={{ lat: 36.226, lng: 36.149  }}
        label={'K84'}
      />
      <Marker
        position={{ lat: 36.223, lng: 36.164  }}
        label={'J19'}
      />
      <Marker
        position={{ lat: 36.219, lng: 36.174  }}
        label={'Q10'}
      />
      <Marker
        position={{ lat: 36.205, lng: 36.173  }}
        label={'A92'}
      />
      <Marker
        position={{ lat: 36.193, lng: 36.166  }}
        label={'G60'}
      />
      <Marker
        position={{ lat: 36.185, lng: 36.151  }}
        label={'H19'}
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