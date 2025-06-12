import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L, { LatLngExpression, polygon } from 'leaflet';
import 'leaflet.markercluster';

export type MarkerData = {
  id: string;
  position: [number, number];
  iconUrl?: string;
  iconDiv?: L.DivIcon;
  popupContent?: string;
  coordinates?: LatLngExpression[]; // Vùng hiển thị khi hover
};

interface MarkerClusterGroupProps {
  markers: MarkerData[];
  onMarkerClick?: (markerData: MarkerData) => void;
}

function getWardMarkerHTML(ward: any) {
  return `
    <div class="ward-marker-wrapper" style="display:flex;flex-direction:column;align-items:center;">
      <div style="
        width:70px;height:70px;
        background:#ffe99d;
        border:3px solid #ffcc1d;
        border-radius:50%;
        text-align: center;
        display:flex;align-items:center;justify-content:center;
        font-weight:bold;font-size:12px;color:#234a63;
        box-shadow:0 2px 8px rgba(0,0,0,0.15);">
        ${ward.name.split('-')[0].trim()}
      </div>
      <div style="
        margin-top:4px;
        background:#ffe066;
        border-radius:12px;
        padding:2px 12px;
        font-size:12px;
        font-weight:bold;
        color:#234a63;
        box-shadow:0 1px 4px rgba(0,0,0,0.10);">
        $${ward.avg_price ? ward.avg_price : '--'}
      </div>
    </div>
  `;
}

const MarkerClusterGroup: React.FC<MarkerClusterGroupProps> = ({ markers, onMarkerClick }) => {
  const map = useMap();
  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  const polygonRef = useRef<L.Polygon | null>(null);

  useEffect(() => {
    const markerClusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 16,
    });

    // Track active polygon
    let activePolygon: L.Polygon | null = null;

    // Function to clean up polygon
    const cleanupPolygon = () => {
      if (activePolygon) {
        map.removeLayer(activePolygon);
        activePolygon = null;
      }
    };

    markers.forEach(markerData => {
      const marker = L.marker(markerData.position, markerData.iconDiv ? { icon: markerData.iconDiv } : undefined);
      markerRefs.current[markerData.id] = marker;

      // Add popup
      if (markerData.popupContent) {
        marker.bindPopup(markerData.popupContent, {
          closeButton: false
        });
      }

      marker.bindTooltip(
        `<div class="marker-hover-circle">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <g>
              <!-- 4 vùng -->
              <path d="M70,70 L70,0 A70,70 0 0,1 140,70 Z" fill="#234a63" fill-opacity="0.85"/>
              <path d="M70,70 L140,70 A70,70 0 0,1 70,140 Z" fill="#234a63" fill-opacity="0.85"/>
              <path d="M70,70 L70,140 A70,70 0 0,1 0,70 Z" fill="#234a63" fill-opacity="0.85"/>
              <path d="M70,70 L0,70 A70,70 0 0,1 70,0 Z" fill="#234a63" fill-opacity="0.85"/>
              <!-- Đường kẻ trắng chia 4 -->
              <line x1="70" y1="0" x2="70" y2="140" stroke="#fff" stroke-width="2"/>
              <line x1="0" y1="70" x2="140" y2="70" stroke="#fff" stroke-width="2"/>
              <!-- Text các vùng -->
              <text x="40" y="45" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#fff">&lt;20m2</text>
              <text x="100" y="45" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#fff">20-35m2</text>
              <text x="40" y="95" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#fff">&ge;50m2</text>
              <text x="100" y="95" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#fff">35-50m2</text>
              <!-- Nhãn vàng ở giữa: pill -->
              <rect x="45" y="61" width="50" height="22" rx="11" fill="#ffe066" />
              <text x="70" y="72" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#234a63">雙語</text>
              <!-- Viền ngoài -->
              <circle cx="70" cy="70" r="69" fill="none" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="marker-hover-info">
            <div class="info-title">香榭觀光華廈B</div>
            <div class="info-detail">
              <span class="info-icon">🕒</span> 45年
              <span class="info-icon" style="margin-left:12px;">🏢</span> 24筆
            </div>
          </div>
        </div>`,
        {
          direction: 'top',
          offset: [0, -60], // Đẩy tooltip lên cao hơn marker
          className: 'marker-hover-tooltip',
          permanent: false,
          opacity: 1,
          interactive: false,
        }
      );

      // Add click handler
      marker.on('click', () => {
        console.log('click:', marker);
        // Remove bounce from all markers
        Object.values(markerRefs.current).forEach(m => {
          const elem = m?.getElement();
          if (elem) elem.classList.remove('bounce');
        });
        // Add bounce to new marker
        const newElem = marker.getElement();
        if (newElem) newElem.classList.add('bounce');
        
        // Open popup with animation
        // if (markerData.popupContent) {
        //   marker.openPopup();
        // }
        
        if (onMarkerClick) onMarkerClick(markerData);
      });

      // Hover events
      if (markerData.coordinates && markerData.coordinates.length > 2) {
        marker.on('mouseover', () => {
          if (polygonRef.current) {
            map.removeLayer(polygonRef.current);
          }
          polygonRef.current = L.polygon(markerData.coordinates as L.LatLngExpression[], {
            color: '#2563eb', 
            fillColor: '#60a5fa', 
            fillOpacity: 0.2, 
            weight: 2
          }).addTo(map);
        });

        marker.on('mouseout', () => {
          if (polygonRef.current) {
            map.removeLayer(polygonRef.current);
            polygonRef.current = null;
          }
        });
      }

      markerClusterGroup.addLayer(marker);
    });

    // Tạo wardClusterGroup và fetch dữ liệu phường
    const wardClusterGroup = L.markerClusterGroup({
      disableClusteringAtZoom: 10
    });
    let wardsData: any[] = [];

    // Hàm chỉ add marker phường trong bounds hiện tại
    const addWardMarkersInView = () => {
      // Clean up any existing polygon when view changes
      cleanupPolygon();
      
      const bounds = map.getBounds();
      wardClusterGroup.clearLayers();
      wardsData.forEach(ward => {
        if (!ward.latitude || !ward.longitude) return;
        const latlng = L.latLng(ward.latitude, ward.longitude);
        if (bounds.contains(latlng)) {
          const marker = L.marker([ward.latitude, ward.longitude], {
            icon: L.divIcon({
              className: 'ward-marker-icon',
              html: getWardMarkerHTML(ward),
              iconSize: [80, 100],
              iconAnchor: [40, 80],
            })
          });

          // Function to handle polygon display
          const showPolygon = () => {
            cleanupPolygon(); // Clean up any existing polygon first
            const el = marker.getElement();
            if (el) el.classList.add('ward-marker-hover');
            if (ward.coordinates && ward.coordinates.length > 2) {
              activePolygon = L.polygon(
                ward.coordinates.map(([lat, lng]: any) => [lat, lng]),
                { color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.2, weight: 2 }
              );
              activePolygon.addTo(map);
            }
          };

          // Function to handle polygon cleanup
          const hidePolygon = () => {
            const el = marker.getElement();
            if (el) el.classList.remove('ward-marker-hover');
            cleanupPolygon();
          };

          marker.on('mouseover', showPolygon);
          marker.on('mouseout', hidePolygon);
          marker.on('dragstart', hidePolygon);
          marker.on('drag', hidePolygon);
          marker.on('dragend', hidePolygon);

          marker.on('click', () => {
            console.log('Polygon clicked!', ward);
            map.flyTo(marker.getLatLng(), 17, {
              duration: 0.8,
            });
              // const latlngs = ward.coordinates.map(([lat, lng]: any) => [lat, lng]);
              // map.fitBounds(L.latLngBounds(latlngs), { maxZoom: 17 });
          });
          wardClusterGroup.addLayer(marker);
        }
      });
    };

    fetch("/data/wards.json")
      .then(res => res.json())
      .then((wards: any[]) => {
        wardsData = wards;
        addWardMarkersInView();

        // Hàm xử lý hiển thị layer theo zoom
        const handleZoom = () => {
          cleanupPolygon(); // Clean up polygon when zooming
          const zoom = map.getZoom();
          if (zoom < 16) {
            map.removeLayer(markerClusterGroup);
            map.addLayer(wardClusterGroup);
          } else {
            map.removeLayer(wardClusterGroup);
            map.addLayer(markerClusterGroup);
          }
        };

        // Cleanup function
        const cleanup = () => {
          cleanupPolygon();
          map.off('zoomend', handleZoom);
          map.off('moveend', addWardMarkersInView);
          map.removeLayer(markerClusterGroup);
          map.removeLayer(wardClusterGroup);
        };

        // Gọi lần đầu khi mount
        handleZoom();
        // Lắng nghe sự kiện zoom
        map.on('zoomend', handleZoom);
        // Lắng nghe sự kiện pan/zoom để cập nhật marker phường
        map.on('moveend', addWardMarkersInView);

        // Cleanup
        return cleanup;
      });

    return () => {
      map.removeLayer(markerClusterGroup);
      if (polygonRef.current) {
        map.removeLayer(polygonRef.current);
        polygonRef.current = null;
      }
    };
  }, [map, markers, onMarkerClick]);

  return null;
};

export default MarkerClusterGroup; 