import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX;

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
