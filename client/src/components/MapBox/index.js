import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import "./MapBox.css";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapBox () {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 42.430472,
    longitude: -123.334102,
    zoom: 16
  });
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    long: 0,
  });

  console.log('yo');

  let setLocation = () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const geoLocator = navigator.geolocation.getCurrentPosition(position => {
      let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12
      };
      let newUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      setViewport(newViewport);
      setUserLocation(newUserLocation);
    }, error => {
      console.log('Error getting location', error)
    }, options);
  }

  return (
    <div>
      <button onClick={setLocation}>My location</button>
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoiamc1MzI0IiwiYSI6ImNrM3g5M2Y1bjE0eTEzbHBkdDB4ZmYxeTUifQ.SA9VO1UIf_QooBXKlqM-ZQ"
        onViewportChange={(viewport => setViewport(viewport))} 
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        <Marker
          latitude={userLocation.lat}
          longitude={userLocation.long}
          offsetLeft={-25}
          offsetTop={-72}
        >
          <div className="mapAvatar"></div>
        </Marker>
      </ReactMapGL>
    </div>
  )
}
