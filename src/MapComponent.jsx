import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const CustomImageOverlay = ({ url, bounds, opacity }) => {
  const map = useMap();

  useEffect(() => {
    const imageOverlay = L.imageOverlay(url, bounds, {
      opacity,
      zIndex: 1000,
    }).addTo(map);
    return () => {
      map.removeLayer(imageOverlay);
    };
  }, [url, bounds, opacity, map]);

  return null;
};

const MapComponent = () => {
  const [opacity, setOpacity] = useState(1);

  const imageUrl = "/images/donganh.jpeg";
  const imageBounds = [
    [21.147, 105.8456], 
    [21.15062, 105.8538], 
  ];

  const handleSliderChange = (e) => {
    setOpacity(e.target.value);
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={opacity}
        onChange={handleSliderChange}
        style={{ position: "absolute", zIndex: 1000, top: 100, left: 10 }}
      />
      <MapContainer
        center={[21.1488, 105.8497]}
        zoom={20}
        style={{ height: "100vh", width: "100%" }}
        bounds={imageBounds}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[21.1488, 105.8497]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <CustomImageOverlay
          url={imageUrl}
          bounds={imageBounds}
          opacity={opacity}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;