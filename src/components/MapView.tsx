'use client';

import dynamic from 'next/dynamic';

// Dynamically import MapViewClient with SSR disabled
const MapViewClient2 = dynamic(() => import('./MapViewClient2'), { ssr: false });

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