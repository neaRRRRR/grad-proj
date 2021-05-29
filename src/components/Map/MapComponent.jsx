import { withGoogleMap,GoogleMap, Marker, withScriptjs } from "react-google-maps"
import React from 'react'


function MapComponent(props){


    return(

        <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 41.071, lng: 29.047 }}
    >
      <Marker
        position={{ lat: 41.071, lng: 29.097  }}
        label={'C75'}
        
      />
      <Marker
        position={{ lat: 41.065, lng: 28.740  }}
        label={'A29'}
      />
      <Marker
        position={{ lat: 41.121, lng: 28.885  }}
        label={'K84'}
      />
      <Marker
        position={{ lat: 41.111, lng: 29.167  }}
        label={'J19'}
      />
      <Marker
        position={{ lat: 41.011, lng: 29.137  }}
        label={'Q10'}
      />
      <Marker
        position={{ lat: 41.065, lng: 28.947  }}
        label={'A92'}
      />
      <Marker
        position={{ lat: 41.142, lng: 29.087  }}
        label={'G60'}
      />
      <Marker
        position={{ lat: 41.125, lng: 29.047  }}
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