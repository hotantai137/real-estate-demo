'use client';

import dynamic from 'next/dynamic';
import MapViewClient2 from './MapViewClient2';

// Dynamically import MapViewClient with SSR disabled
const MapViewClient = dynamic(() => import('./MapViewClient'), { ssr: false });

interface MapViewProps {
  center: [number, number];
  zoom: number;
  properties?: any[];
  provinces?: any[];
  districts?: any[];
}

export default function MapView(props: MapViewProps) {
  return <MapViewClient2 {...props} />;
}