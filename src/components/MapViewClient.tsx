"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Property } from '@/data/properties';
import React, { useEffect } from 'react';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

// Fix default marker icon issue with leaflet in React
const markerIcon2x = require('leaflet/dist/images/marker-icon-2x.png');
const markerIcon = require('leaflet/dist/images/marker-icon.png');
const markerShadow = require('leaflet/dist/images/marker-shadow.png');

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  center: [number, number];
  zoom: number;
  properties?: Property[];
  provinces?: any[];
  districts?: any[];
}

// Custom MarkerCluster component
function MarkerCluster({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    // Create a marker cluster group
    const markerClusterGroup = L.markerClusterGroup();

    // Add random markers
    Array.from({ length: 50 }).forEach((_, index) => {
      const marker = L.marker([center[0] + Math.random() * 0.1, center[1] + Math.random() * 0.1], {
        icon: L.icon({
          iconUrl: index % 2 === 0 ? '/building.png' : '/residential.png',
          iconSize: [25, 25],
          iconAnchor: [12, 25],
          popupAnchor: [0, -25],
        }),
      });
      markerClusterGroup.addLayer(marker);
    });

    // Add the cluster group to the map
    map.addLayer(markerClusterGroup);

    // Cleanup on unmount
    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, center]);

  return null;
}

export default function MapViewClient({ properties, provinces, districts, center, zoom }: MapViewProps) {
  // Check if running on the client side
  if (typeof window === 'undefined') {
    return null; // Return null during SSR
  }

  console.log(center);
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ width: '100%', minHeight: 500, borderRadius: 16 }}
      className="shadow-xl"
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerCluster center={center} />
      {properties?.map((property) => (
        <Marker
          key={property.id}
          position={property.location.coordinates}
        >
          <Popup>
            <div className="font-bold text-blue-700 mb-1">{property.title}</div>
            <div className="text-sm text-gray-700">{property.location.address}</div>
            <div className="text-red-600 font-semibold mt-1">{property.price.toLocaleString()} USD</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}