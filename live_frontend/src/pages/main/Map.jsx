import React, { useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({
  icon1,
  vehiclePath,
  filteredPath,
  vehicleDetails,
  vehicleCurrentloc,
  lastLoc,
  getVehiclePath,
  currentPosition,
}) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerClick = (event) => {
    setOpen(true);
    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  const updatedCoordinates = [...vehiclePath];

  if (
    vehicleDetails &&
    typeof vehicleDetails.lat === "number" &&
    typeof vehicleDetails.lng === "number"
  ) {
    updatedCoordinates.push({
      lat: vehicleDetails.lat,
      lng: vehicleDetails.lng,
    });
  }

  // Set the last coordinate as the center
  const center =
    updatedCoordinates.length > 0
      ? updatedCoordinates[updatedCoordinates.length - 1] || vehicleCurrentloc
      : { lat: 28.7041, lng: 77.1025 };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {window.google && window.google.maps ? (
          <Polyline
            path={updatedCoordinates}
            options={{
              strokeColor: "blue",
              strokeWeight: 3,
              icons: [
                {
                  icon: {
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // Ensure google is available
                    scale: 1.5,
                    strokeColor: "#027699",
                  },
                  offset: "100%",
                  repeat: "40px",
                },
              ],
            }}
          />
        ) : null}

        {updatedCoordinates.length > 0 ? (
          <Marker
            icon={icon1}
            position={updatedCoordinates[updatedCoordinates.length - 1]}
          />
        ) : vehicleCurrentloc ? (
          <Marker icon={icon1} position={vehicleCurrentloc} />
        ) : null}
        {updatedCoordinates.length > 0 ? (
          <Marker
            position={updatedCoordinates[0]}
            title="start"
            label="S"
            onClick={handleMarkerClick}
          >
            {/* {open && (
              <InfoWindow position={marker} onCloseClick={() => setOpen(false)}>
                <div style={{ width: "200px", height: "100px", paddingLeft: "10px", paddingRight:"10px"}}>
                  <p  className="">Start timeline</p>
                </div>
              </InfoWindow>
            )} */}
          </Marker>
          
        ) : null}
        {/* {currentPosition && <Marker position={currentPosition} label="🚗" />} */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

// import React from "react";
// import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const Map = ({ vehiclePath, vehicleCurrentloc, lastLoc }) => {

//   console.log("Path : ", vehiclePath)

//   const isValidLocation =
//     vehicleCurrentloc &&
//     typeof vehicleCurrentloc.lat === "number" &&
//     typeof vehicleCurrentloc.lng === "number";

//   const isValidLastLoc =
//     lastLoc &&
//     typeof lastLoc.lat === "number" &&
//     typeof lastLoc.lng === "number";

//   const center = isValidLocation
//     ? vehicleCurrentloc
//     : isValidLastLoc
//       ? lastLoc
//       : vehiclePath.length > 0
//         ? vehiclePath[0]
//         : { lat: 28.7041, lng: 77.1025 };

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_MAP_KEY}>
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//         {vehiclePath.length > 0 && (
//           <Polyline
//             path={vehiclePath}
//             options={{
//               strokeColor: "#FF0000",
//               strokeOpacity: 1.0,
//               strokeWeight: 3,
//             }}
//           />
//         )}
//         {isValidLocation && (
//           <Marker position={vehicleCurrentloc} title="Current Vehicle Location" />
//         )}
//         {isValidLastLoc && (
//           <Marker
//             position={lastLoc}
//             title="Last Recorded Location"
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//             }}
//           />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Map;
