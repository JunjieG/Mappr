import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import ChatBox from "../../components/ChatBox";

import "./MapBox.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapStyle from "./mapStyle.json";

export default function UserProfile({ user }) {
  const [viewport, setViewport] = useState({
    mapStyle: mapStyle,
    width: "100vw",
    height: "100vh",
    latitude: 40.73061,
    longitude: -73.935242,
    zoom: 12
  });
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    long: 0
  });
  const [otherUserData, setOtherUserData] = useState([]);

  useEffect(() => {
    console.log("stated geting geodata");
    fetch(`/users/getAllUserGeodata`, {
      method: "GET"
    })
      .then(result => result.json())
      .then(geodata => {
        if (geodata == "None") {
          console.log("whyyy?");
        }
        console.log("geodata", geodata);
        setOtherUserData(geodata);
      });
  }, []);

  let setLocation = () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const geoLocator = navigator.geolocation.getCurrentPosition(
      position => {
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

        let dataToServer = {
          id: user.uid,
          lat: position.coords.latitude,
          long: position.coords.longitude
        };
        fetch(`/users/updateUserGeodata`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(dataToServer)
        });
      },
      error => {
        console.log("Error getting location", error);
      },
      options
    );
  };

  function markerOnlick(email) {
    alert(email);
  }

  return (
    <div>
      <button onClick={setLocation}>My location</button>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoiamc1MzI0IiwiYSI6ImNrM3g5M2Y1bjE0eTEzbHBkdDB4ZmYxeTUifQ.SA9VO1UIf_QooBXKlqM-ZQ"
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        <Marker
          latitude={userLocation.lat}
          longitude={userLocation.long}
          offsetLeft={-21.21}
          offsetTop={-21.21}
        >
          <div className="pin"></div>
          <div className="pulse"></div>
        </Marker>
        {otherUserData &&
          otherUserData.map(
            (content, i) =>
              user &&
              content.email !== user.email && (
                <Marker
                  latitude={content.geodata.lat}
                  longitude={content.geodata.long}
                  offsetLeft={-25}
                  offsetTop={-72}
                >
                  <div className="pin other-user">
                    <div className="map-marker-info">
                      <div className="map-marker-info-inner animate-bounce-in">
                        <header>
                          <h2>{content.username}</h2>
                        </header>

                        <main>
                          <p>
                            Email: {content.email}
                          </p>
                        </main>
                      </div>
                    </div>
                  </div>

                  <div className="pulse"></div>
                </Marker>
              )
          )}
      </ReactMapGL>
      <ChatBox user={user} />
    </div>
  );
}
