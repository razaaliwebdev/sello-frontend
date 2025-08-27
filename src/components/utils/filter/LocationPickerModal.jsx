// import React, { useState, useCallback } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const defaultCenter = { lat: 25.276987, lng: 55.296249 }; // Dubai by default

// const LocationPickerModal = ({ isOpen, onClose, onSelect }) => {
//   const [marker, setMarker] = useState(null);

//   const handleClick = useCallback((event) => {
//     setMarker({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   }, []);

//   const handleSave = () => {
//     if (marker) {
//       onSelect(marker); // pass {lat, lng} to parent
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white rounded-lg p-4 w-[90%] md:w-[600px]">
//         <h2 className="text-xl font-semibold mb-3">Pick Location</h2>
//         <LoadScript
//           googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}
//         >
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             zoom={10}
//             center={defaultCenter}
//             onClick={handleClick}
//           >
//             {marker && <Marker position={marker} />}
//           </GoogleMap>
//         </LoadScript>
//         <div className="flex justify-end gap-3 mt-4">
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="bg-primary-500 px-4 py-2 rounded"
//             onClick={handleSave}
//             disabled={!marker}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationPickerModal;

// src/components/LocationPickerModal.js
import React, { useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 25.276987,
  lng: 55.296249, // Dubai coordinates
};

const LocationPickerModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onSelect(selectedLocation);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Select Location</h2>

        <LoadScript
          googleMapsApiKey={import.meta.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={defaultCenter}
            onClick={handleMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
        </LoadScript>

        <div className="mt-4 flex justify-between items-center">
          <div>
            {selectedLocation && (
              <p className="text-sm text-gray-600">
                Selected: {selectedLocation.lat.toFixed(6)},{" "}
                {selectedLocation.lng.toFixed(6)}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedLocation}
              className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 disabled:opacity-50"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerModal;
