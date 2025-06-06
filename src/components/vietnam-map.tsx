"use client";

import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LatLngBoundsExpression, LatLngExpression, GeoJSON as GeoJSONType } from "leaflet";
import L from 'leaflet';
import { FeatureCollection, GeoJsonObject } from "geojson";
import vietnamGeoJSON from "@/data/vn.json";
import { useEffect, useRef, useState } from "react";
import HouseMarker from "./HouseMarker";

// Define TypeScript interfaces for GeoJSON data
interface GeoJSONGeometry {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  }

  interface GeoJSONFeature {
    type: string;
    id: number;
    properties: {
      source: string;
      id: string;
      name: string;
    };
    geometry: GeoJSONGeometry;
  }

  interface GeoJSONData {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
  }

  type HouseMarkerProps = {
    position: [number, number];
    name: string;
  };

interface MapProps {
    center?: LatLngExpression;
    zoom?: number;
    popupText?: string;
  }

  const vietnamStyle = {
    fillColor: '#008000',
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 1,
  };

  const worldMaskStyle = {
    fillColor: 'black',
    color: 'black',
    weight: 0,
    fillOpacity: 0.4,
  };

  // Hàm chuyển đổi tọa độ GeoJSON sang [lat, lng]
    const convertToLatLng = (coordinates: number[][][] | number[][][][]): LatLngExpression[][][] => {
    if (Array.isArray(coordinates[0][0][0])) {
        // MultiPolygon: number[][][][]
        return (coordinates as number[][][][]).map(poly =>
        poly.map(ring => ring.map(([lng, lat]) => [lat, lng] as [number, number]))
        );
    }
    // Polygon: number[][][]
    return [(coordinates as number[][][]).map(ring => ring.map(([lng, lat]) => [lat, lng] as [number, number]))];
    };
  
    const defaults = {
      center: [16.0, 108.0] as LatLngExpression, // Trung tâm gần Huế - Đà Nẵng
      zoom: 6,
      bounds: [
        [8.2, 102.0],   // Góc Tây Nam (gần Cà Mau)
        [23.4, 110.0],  // Góc Đông Bắc (gần biên giới phía Bắc và biển Đông)
      ] as LatLngBoundsExpression,
    };

  const coordinates = [
    [14.0583, 108.2772],
    [14.5, 108.5],
    [14.1, 108.9],
    [14.0583, 108.2772],
  ];

  const worldBounds = [
    [-90, -180],
    [-90, 180],
    [90, 180],
    [90, -180],
    [-90, -180],
  ];

  const vietnamHoles = vietnamGeoJSON.features.map((feature: any) => {
    // GeoJSON coordinates là [lng, lat], nhưng Leaflet cần [lat, lng]
    const coords = feature.geometry.coordinates[0].map(([lng, lat]: number[]) => [lat, lng]);
    return coords;
  });
  
  // Tạo mask để che khu vực bên ngoài Kon Tum
//   const worldMaskCoords: LatLngExpression[][] = [
//     [
//       [-90, -180],
//       [90, -180],
//       [90, 180],
//       [-90, 180],
//       [-90, -180],
//     ],
//     //Kontum
//     // (vietnamGeoJSON as GeoJsonObject & { features: { geometry: { coordinates: number[][][] } }[] })
//     //   .features[0].geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as LatLngExpression),
//     // Collect all Vietnam coordinates (Polygon and MultiPolygon)
//     ...(vietnamGeoJSON as GeoJSONData).features.flatMap(feature => {
//         if (feature.geometry.type === 'MultiPolygon') {
//           // MultiPolygon: flatten all polygons
//           return (feature.geometry.coordinates as number[][][][]).flatMap(poly => 
//             poly.map(ring => ring.map(([lng, lat]) => [lat, lng] as [number, number]))
//           );
//         }
//         // Polygon: process single polygon
//         return [(feature.geometry.coordinates as number[][][]).map(ring => 
//           ring.map(([lng, lat]) => [lat, lng] as [number, number])
//         )];
//       }),
//   ];

const worldWithHole = {
    type: 'Polygon',
    coordinates: [
      [
        [-180, -90], // Bottom-left corner
        [180, -90],  // Bottom-right corner
        [180, 90],   // Top-right corner
        [-180, 90],  // Top-left corner
        [-180, -90], // Back to start
      ],
      // Collect all Vietnam coordinates (Polygon and MultiPolygon)
      ...(vietnamGeoJSON as GeoJSONData).features.flatMap(feature => {
        if (feature.geometry.type === 'MultiPolygon') {
          // MultiPolygon: flatten all polygons into rings
          return (feature.geometry.coordinates as number[][][][]).flatMap(poly =>
            poly.map(ring => ring.map(([lng, lat]) => [lat, lng] as [number, number]))
          );
        }
        // Polygon: process single polygon
        return (feature.geometry.coordinates as number[][][]).map(ring =>
          ring.map(([lng, lat]) => [lat, lng] as [number, number])
        );
      }),
    ],
  };

  const myFeatureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-180, -90],
          [-180, 90],
          [180, 90],
          [180, -90],
          [-180, -90],
        ]],
      }
    }]
  };

  const locations: {
    id: string;
    name: string;
    type: 'residential' | 'house' | 'building';
    price: number;
    position: [number, number];
  }[] = [
    { id: '1', name: 'VP Hà Nội', type: 'residential', price: 1000, position: [21.03, 105.85] },
    { id: '2', name: 'VP Đà Nẵng', type: 'building', price: 2000, position: [16.05, 108.2] },
    { id: '3', name: 'VP Sài Gòn', type: 'building', price: 3000, position: [10.76, 106.7] },
  ];
  
  const VietnamMap = ({
    center = defaults.center,
    zoom = defaults.zoom,
    popupText = "Kon Tum, Việt Nam",
  }: MapProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const [isBouncing, setIsBouncing] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedLocation = locations.find((loc) => loc.id === selectedId);
  const icon = L.divIcon({
    className: 'custom-house-icon',
    html: `
      <div class="marker-wrapper ${isBouncing ? 'bounce' : ''}">
        <button class="detail-button ${showDetail ? 'visible' : ''}">Xem chi tiết</button>
        <div class="house-icon">🏠</div>
        <div class="label">Nhà 1000$</div>
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
  });

  useEffect(() => {
    if (isBouncing) {
      const timeout = setTimeout(() => setIsBouncing(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isBouncing]);

    useEffect(() => {
        if (mapRef.current) {
          // Giới hạn vùng hiển thị
          const bounds: L.LatLngBoundsExpression = [
            [8, 102], // Góc dưới trái (Nam Việt Nam)
            [24, 118], // Góc trên phải (Bắc Việt Nam)
          ];
          mapRef.current.setMaxBounds(bounds);
          mapRef.current.fitBounds(bounds);
        }
      }, []);
      
    return (
      <>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        maxBounds={defaults.bounds}
        maxBoundsViscosity={1.0}
        minZoom={7}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <HouseMarker
            key={loc.id}
            id={loc.id}
            name={loc.name}
            type={loc.type}
            price={loc.price}
            position={loc.position}
            onViewDetail={(id) => setSelectedId(id)}
          />
        ))}
        {/* <GeoJSON
        data={vietnamGeoJSON as GeoJSONData}
        style={() => ({
          color: '#3388ff',
          weight: 1,
          fillColor: '#88ccff',
          fillOpacity: 0.5,
        })}
        /> */}
        <Polygon
        pathOptions={{ fillColor: 'black', fillOpacity: 0.6, weight: 0 }}
        positions={[worldBounds, ...vietnamHoles]}
      />
        
      {/* <Polygon
        positions={worldWithHole.coordinates as unknown as LatLngExpression[][][]}
        pathOptions={{
          color: 'transparent',
          fillColor: '#000',
          fillOpacity: 0.7,
        }}
      /> */}
        <Marker position={[14.8, 108.0]} 
        icon={icon}
        eventHandlers={{
          click: () => {
            setIsBouncing(true);
            setShowDetail(true);
          },
        }}>
          <Popup>{popupText}</Popup>
        </Marker>
      </MapContainer>
      {/* Modal chi tiết */}
      {selectedLocation && (
        <div className="modal-overlay" onClick={() => setSelectedId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedLocation.name}</h2>
            <p>Thông tin chi tiết về địa điểm này sẽ hiển thị ở đây.</p>
            <button onClick={() => setSelectedId(null)}>Đóng</button>
          </div>
        </div>
      )}
      </>
    );
  };

export default VietnamMap;