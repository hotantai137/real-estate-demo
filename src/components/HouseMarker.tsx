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
      icon={icon}
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
