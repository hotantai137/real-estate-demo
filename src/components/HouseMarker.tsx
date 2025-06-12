import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import './styles/custom-maker.css';


type HouseMarkerProps = {
  markerData: any;
  isBouncing: boolean;
  onViewDetail: (id: string) => void;
};

const HouseMarker = ({ markerData, isBouncing, onViewDetail }: HouseMarkerProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const markerRef = useRef<L.Marker | null>(null);
  const image = markerData.type === 'building' ? './building.png' : './residential.png';

  const marker = L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="marker-container ${isBouncing ? 'bounce' : ''}"" style="
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
  });

  // Gắn click cho nút chi tiết
  useEffect(() => {
    const timeout = setTimeout(() => {
      const btn = document.getElementById(`detail-btn-${markerData.id}`);
      if (btn) {
        btn.onclick = (e) => {
          e.stopPropagation();
          onViewDetail(markerData.id);
        };
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [markerData.id]);

  // useEffect(() => {
  //   if (isBouncing) {
  //     const timeout = setTimeout(() => setIsBouncing(false), 1000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [isBouncing]);

  return (
    <Marker
      ref={(ref) => { markerRef.current = ref }}
      position={markerData.position}
      icon={marker}
      eventHandlers={{
        click: () => {
          onViewDetail(markerData.id);
        },
      }}
    />
  );
};

export function getHouseMarkerHTML({ markerData, isBouncing, onViewDetail }: HouseMarkerProps) {
  const marker = L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="marker-container ${isBouncing ? 'bounce' : ''}"" style="
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
  });
  return marker;
}

export function getHouseMarkerPopupHTML({ markerData, isBouncing, onViewDetail }: HouseMarkerProps) {
  return `
        <div style="text-align: center; width: 100px; padding: 6px;">
          <button onclick="window.open('/property/${markerData.id}', '_blank')" 
                  style="
                    background-color: #11506d;
                    color: white;
                    padding: 8px 8px;
                    border-radius: 10px;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    box-shadow: inset 2px 2px 4px 0 hsla(0, 0%, 75%, .5), inset -2px -2px 4px 0 rgba(59, 59, 59, .25), 0 2px 4px 0 rgba(86, 86, 86, .15);
                    transition: background-color 0.2s;
                  "
                  onmouseover="this.style.backgroundColor='#1e40af'"
                  onmouseout="this.style.backgroundColor='#1a56db'"
          >
            View Details
          </button>
        </div>
      `;
}

export default HouseMarker;
