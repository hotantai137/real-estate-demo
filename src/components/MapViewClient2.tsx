import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Property } from '@/data/properties';
import React, { useEffect, useState } from 'react';
import './styles/custom-maker.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import MarkerClusterGroup, { MarkerData } from './MarkerClusterGroup';
import { getHouseMarkerHTML, getHouseMarkerPopupHTML } from './HouseMarker';

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

// Add MapController component
// function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
//   const map = useMap();
  
//   useEffect(() => {
//     map.setView(center, zoom);
//   }, [center, zoom, map]);

//   return null;
// }

function MarkerCluster({ center }: { center: [number, number] }) {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const map = useMap();

  useEffect(() => {
    // Generate random markers data
    const newMarkers: MarkerData[] = Array.from({ length: 1000 }).map((_, index) => {
      const price = (Math.random() * 1000000).toFixed(2);
      const isCommercial = index % 2 === 0;
      const name = isCommercial ? 'commercial' : 'residential';
      const type = isCommercial ? 'building' : 'residential';
      return {
        id: `marker-${index}`,
        position: [center[0] + Math.random() * 0.1, center[1] + Math.random() * 0.1] as [number, number],
        name,
        type: type as 'residential' | 'house' | 'building',
        price: Number(price),
        iconDiv: getHouseMarkerHTML({ markerData: { id: `marker-${index}`, name, type, price: Number(price) }, isBouncing: false, onViewDetail: () => {} }),
        popupContent: getHouseMarkerPopupHTML({ markerData: { id: `marker-${index}`, name, type, price: Number(price) }, isBouncing: false, onViewDetail: () => {} })
      };
    });
    setMarkers(newMarkers);
  }, [center]);

  const handleMarkerClick = (markerData: MarkerData) => {
    setSelectedMarker(markerData);
    // map.setView(markerData.position, 16, {
    //   animate: true,
    //   duration: 1
    // });
  };

  // return <MarkerClusterGroup markers={markers} onMarkerClick={handleMarkerClick} />;
  return <MarkerClusterGroup markers={markers} />;
}

export default function MapViewClient2({ properties, provinces, districts, center, zoom }: MapViewProps) {
  // Check if running on the client side
  if (typeof window === 'undefined') {
    return null; // Return null during SSR
  }

  return (
    <MapContainer
      key={center.join(',') + zoom}
      center={center}
      zoom={zoom}
      minZoom={12}
      maxZoom={18}
      scrollWheelZoom={true}
      style={{ width: '100%', minHeight: 500, borderRadius: 16 }}
      className="shadow-xl leaflet-right-controls"
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <MapController center={center} zoom={zoom} /> */}
      <MarkerCluster center={center} />
    </MapContainer>
  );
} 