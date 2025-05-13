import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hvdXJ5LTA3IiwiYSI6ImNtYW1iZjdrMjA3ZXcybHM4Z2k4cTgyc28ifQ.iFpxtT96_fIzUcPVMF24Kg";

const ListingMap = ({ coordinates }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!coordinates || coordinates.length !== 2) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: coordinates,
      zoom: 12,
    });

    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

    return () => map.remove();
  }, [coordinates]);

  return <div ref={mapContainer} className="w-full h-64 rounded-md mt-4" />;
};

export default ListingMap;
