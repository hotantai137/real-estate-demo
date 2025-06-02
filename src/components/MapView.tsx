'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Property } from '@/data/properties';
import React from 'react';

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

export default function MapView({ properties }: { properties: Property[] }) {
  return (
    <MapContainer
      center={[10.7769, 106.7009]} // Ho Chi Minh City
      zoom={11}
      scrollWheelZoom={true}
      style={{ width: '100%', minHeight: 500, borderRadius: 16 }}
      className="shadow-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
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