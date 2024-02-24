import { hot } from "react-hot-loader";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./index.css";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

function App() {
  const [selectedPlace1, setSelectedPlace1] = useState(null);
  const [selectedPlace2, setSelectedPlace2] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const autocompleteRef1 = useRef(null);
  const autocompleteRef2 = useRef(null);

  useEffect(
    function () {
      if (
        selectedPlace1 &&
        selectedPlace2 &&
        !isEqual(selectedPlace1, selectedPlace2)
      ) {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: selectedPlace1,
            destination: selectedPlace2,
            travelMode: "DRIVING",
          },
          function (response, status) {
            if (status === "OK") {
              setDirections(response);
              const route = response.routes[0];
              const totalDistance = route.legs.reduce(function (acc, leg) {
                return acc + leg.distance.value;
              }, 0);
              const distanceInKm = totalDistance / 1000;
              setDistance(distanceInKm.toFixed(2));
            } else {
              console.error("Directions request failed due to " + status);
            }
          }
        );
      }
    },
    [selectedPlace1, selectedPlace2]
  );

  const marker1 = useMemo(
    function () {
      return (
        selectedPlace1 && (
          <Marker
            key="marker1"
            position={selectedPlace1}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        )
      );
    },
    [selectedPlace1]
  );

  const marker2 = useMemo(
    function () {
      return (
        selectedPlace2 && (
          <Marker
            key="marker2"
            position={selectedPlace2}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        )
      );
    },
    [selectedPlace2]
  );

  const directionsRenderer = useMemo(
    function () {
      return (
        directions && (
          <DirectionsRenderer key="directions" directions={directions} />
        )
      );
    },
    [directions]
  );

  return React.createElement(
    LoadScript,
    {
      googleMapsApiKey: "AIzaSyDwPTBlrccoN-7IcWNoCc6kyTC-w54d6RY",
      libraries: ["places"],
    },
    React.createElement(
      GoogleMap,
      {
        mapContainerStyle: containerStyle,
        center: selectedPlace1 || center,
        zoom: 10,
      },
      React.createElement(
        Autocomplete,
        {
          onLoad: function (autocomplete) {
            autocompleteRef1.current = autocomplete;
          },
          onPlaceChanged: function () {
            handlePlaceChanged(setSelectedPlace1, autocompleteRef1);
          },
        },
        React.createElement("input", {
          type: "text",
          placeholder: "Search for location 1",
          className: "autocomplete-input",
        })
      ),
      React.createElement(
        Autocomplete,
        {
          onLoad: function (autocomplete) {
            autocompleteRef2.current = autocomplete;
          },
          onPlaceChanged: function () {
            handlePlaceChanged(setSelectedPlace2, autocompleteRef2);
          },
        },
        React.createElement("input", {
          type: "text",
          placeholder: "Search for location 2",
          className: "autocomplete-input autocomplete-input2",
        })
      ),
      marker1,
      marker2,
      directionsRenderer,
      distance &&
        React.createElement(
          "div",
          { className: "distance-container" },
          React.createElement("p", null, "Distance: " + distance + " km")
        )
    )
  );
}

function handlePlaceChanged(setSelectedPlace, autocompleteRef) {
  if (autocompleteRef.current) {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedPlace(newLocation);
    }
  }
}
function isEqual(location1, location2) {
  return (
    location1 &&
    location2 &&
    location1.lat === location2.lat &&
    location1.lng === location2.lng
  );
}
export default hot(module)(App);
