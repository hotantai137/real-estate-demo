import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import './styles/custom-maker.css';


type HouseMarkerProps = {
  id: string;
  position: [number, number];
  name: string;
  type: 'residential' | 'house' | 'building';
  price: number;
  onViewDetail: (id: string) => void;
};

const HouseMarker = ({ id, position, name, type, price, onViewDetail }: HouseMarkerProps) => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const markerRef = useRef<L.Marker | null>(null);
  const image = type === 'residential' ? './residential.png' : type === 'house' ? './house.png' : './building.png';

  const icon = L.divIcon({
    className: 'custom-house-icon',
    html: `
      <div class="marker-wrapper ${isBouncing ? 'bounce' : ''}">
        <button class="detail-button ${showDetail ? 'visible' : ''}" id="detail-btn-${id}">Xem chi tiết</button>
        <div class="house-icon">
          <img style="width: 30px; height: 30px;" src="${image}" alt="House Icon" />
        </div>
        <div class="label">${name}</div>
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
  });

  const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="marker-container ${isBouncing ? 'bounce' : ''}" style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      ">
        <img src="${image}" 
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
          <div style="font-weight: bold; color: #1a56db;">${name}</div>
          <div style="color: #dc2626;">$${price}</div>
        </div>
      </div>
    `,
    iconSize: [45, 80],
    iconAnchor: [22, 50],
    popupAnchor: [0, -50],
  });

  // Gắn click cho nút chi tiết
  useEffect(() => {
    const timeout = setTimeout(() => {
      const btn = document.getElementById(`detail-btn-${id}`);
      if (btn) {
        btn.onclick = (e) => {
          e.stopPropagation();
          onViewDetail(id);
        };
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [showDetail]);

  // useEffect(() => {
  //   if (isBouncing) {
  //     const timeout = setTimeout(() => setIsBouncing(false), 1000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [isBouncing]);

  return (
    <Marker
      ref={(ref) => { markerRef.current = ref }}
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          setIsBouncing(true);
          setShowDetail(true);
        },
      }}
    />
  );
};

export default HouseMarker;
