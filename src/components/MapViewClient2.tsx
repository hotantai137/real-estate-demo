import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Property } from '@/data/properties';
import React, { useEffect, useState } from 'react';
import './styles/custom-maker.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import HouseMarker from './HouseMarker';

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

function MarkerCluster({ center }: { center: [number, number] }) {
  const map = useMap();
  const [idxMarkerSelected, setIdxMarkerSelected] = useState<string | null>(null);
  const [markers, setMarkers] = useState<Array<{
    id: string;
    position: [number, number];
    name: string;
    type: 'residential' | 'house' | 'building';
    price: number;
  }>>([]);

  useEffect(() => {
    // Generate random markers data
    const newMarkers = Array.from({ length: 50 }).map((_, index) => {
      const price = (Math.random() * 1000000).toFixed(2);
      const isCommercial = index % 2 === 0;
      const name = isCommercial ? 'Commercial' : 'Residential';
      const type = isCommercial ? 'building' : 'residential';
      
      return {
        id: `marker-${index}`,
        position: [center[0] + Math.random() * 0.1, center[1] + Math.random() * 0.1] as [number, number],
        name,
        type: type as 'residential' | 'house' | 'building',
        price: Number(price)
      };
    });

    setMarkers(newMarkers);

    // Create marker cluster group
    const markerClusterGroup = L.markerClusterGroup();

    // Add markers to the cluster group
    newMarkers.forEach(markerData => {
      const marker = L.marker(markerData.position, {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div class="marker-container" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            ">
              <img src="${markerData.type === 'building' ? '/building.png' : '/residential.png'}" 
                   style="width: 45px; height: 50px;" />
              <div class="marker-label" style="
                background: white;
                padding: 2px 6px;
                border-radius: 4px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                font-size: 12px;
                white-space: nowrap;
                margin-top: 4px;
                text-align: center;
                width: fit-content;
              ">
                <div style="font-weight: bold; color: #1a56db;">${markerData.name}</div>
                <div style="color: #dc2626;">$${markerData.price.toLocaleString()}</div>
              </div>
            </div>
          `,
          iconSize: [45, 80],
          iconAnchor: [22, 50],
          popupAnchor: [0, -50],
        })
      });

      // Add tooltip
      marker.bindTooltip(
        markerData.type === 'building' 
          ? 'Modern commercial space with excellent facilities and prime location.'
          : 'Cozy residential property with modern amenities and great neighborhood.',
        {
          permanent: false,
          direction: 'top',
          className: 'custom-tooltip',
          offset: [0, -80]
        }
      );

      // Add popup with details button
      marker.bindPopup(`
        <div style="text-align: center;">
          <button onclick="window.open('/property/${markerData.id}', '_blank')" 
                  style="
                    background-color: #1a56db;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 4px;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background-color 0.2s;
                  "
                  onmouseover="this.style.backgroundColor='#1e40af'"
                  onmouseout="this.style.backgroundColor='#1a56db'"
          >
            View Details
          </button>
        </div>
      `);

      // // Add click handler for bounce animation
      // marker.on('click', () => {
      //   setIdxMarkerSelected(markerData.id);

      //   // Lấy DOM element của marker
      //   const markerElem = marker.getElement();
      //   if (markerElem) {
      //     markerElem.classList.add('bounce');
      //     setTimeout(() => {
      //       markerElem.classList.remove('bounce');
      //     }, 1000); // thời gian animation
      //   }
      // });

      markerClusterGroup.addLayer(marker);
    });

    // Add the cluster group to the map
    map.addLayer(markerClusterGroup);

    // Cleanup
    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, center]);

  return null;
}

export default function MapViewClient2({ properties, provinces, districts, center, zoom }: MapViewProps) {
  // Check if running on the client side
  if (typeof window === 'undefined') {
    return null; // Return null during SSR
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={13}
      maxZoom={18}
      scrollWheelZoom={true}
      style={{ width: '100%', minHeight: 500, borderRadius: 16 }}
      className="shadow-xl leaflet-right-controls"
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