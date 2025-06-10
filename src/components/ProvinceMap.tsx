
import React, { useEffect, useMemo, useRef, useState } from "react";
import svgPathBounds from "svg-path-bounds";
import { svgPathProperties } from 'svg-path-properties'
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

type Direction = 'left' | 'right' | 'top' | 'bottom';
type District = {
    id: string;
    name: string;
    path: string;
    centroid: [number, number];
  };

interface DistrictData {
  id: string;
  name: string;
  province: string;
  type: string;
  path: string;
}

interface ProvinceMapProps {
  province: string;
  districts: DistrictData[];
  width?: number;
  height?: number;
  onDistrictClick?: (district: any) => void;
}

const SMALL_THRESHOLD = 0.015;

// function calculateViewBoxFromPaths(districts: District[]): string {
//     let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
//     districts.forEach((district) => {
//       const commands = district.path.match(/[ML][^ML]+/g);
//       if (!commands) return;
  
//       commands.forEach((cmd) => {
//         const coords = cmd
//           .slice(1)
//           .trim()
//           .split(" ")
//           .map((v) => parseFloat(v));
  
//         for (let i = 0; i < coords.length; i += 2) {
//           const x = coords[i];
//           const y = coords[i + 1];
//           if (isNaN(x) || isNaN(y)) continue;
  
//           minX = Math.min(minX, x);
//           minY = Math.min(minY, y);
//           maxX = Math.max(maxX, x);
//           maxY = Math.max(maxY, y);
//         }
//       });
//     });
  
//     const width = maxX - minX;
//     const height = maxY - minY;
  
//     return `${minX} ${minY} ${width} ${height}`;
//   }

function calculateViewBoxFromPaths(districts: { path: string }[]): string {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
    for (const district of districts) {
      const [x1, y1, x2, y2] = svgPathBounds(district.path);
      if (x1 < minX) minX = x1;
      if (y1 < minY) minY = y1;
      if (x2 > maxX) maxX = x2;
      if (y2 > maxY) maxY = y2;
    }
  
    const width = maxX - minX;
    const height = maxY - minY;
  
    return `${minX} ${minY} ${width} ${height}`;
  }

  function getPathCenter(d: string): { x: number; y: number } | null {
    const commands = d.match(/[ML][^ML]+/g);
    if (!commands) return null;
  
    let points: [number, number][] = [];
  
    commands.forEach((cmd) => {
      const coords = cmd
        .slice(1)
        .trim()
        .split(" ")
        .map(parseFloat);
      for (let i = 0; i < coords.length; i += 2) {
        if (!isNaN(coords[i]) && !isNaN(coords[i + 1])) {
          points.push([coords[i], coords[i + 1]]);
        }
      }
    });
  
    const sum = points.reduce(
      (acc, [x, y]) => {
        acc.x += x;
        acc.y += y;
        return acc;
      },
      { x: 0, y: 0 }
    );
  
    const len = points.length;
    return len ? { x: sum.x / len, y: sum.y / len } : null;
  }

  function getArrowDirection(center: { x: number; y: number }): Direction {
    if (center.x > 0.3) return 'right';
    if (center.x < -0.3) return 'left';
    if (center.y > 0.3) return 'top';
    return 'bottom';
  }

  function getArrowEnd(
    start: { x: number; y: number },
    direction: Direction,
    length = 0.1
  ): { x: number; y: number } {
    switch (direction) {
      case 'left':
        return { x: start.x - length, y: start.y };
      case 'right':
        return { x: start.x + length, y: start.y };
      case 'top':
        return { x: start.x, y: start.y + length };
      case 'bottom':
        return { x: start.x, y: start.y - length };
    }
  }

  function isSmallDistrict(pathElement: SVGPathElement): boolean {
    const bbox = pathElement.getBBox();
    const area = bbox.width * bbox.height;
    return area < SMALL_THRESHOLD;
  }

  const getPathArea = (d: string): number => {
    const properties = new svgPathProperties(d)
    const length = properties.getTotalLength()
    const points = Array.from({ length: 50 }, (_, i) =>
      properties.getPointAtLength((i / 50) * length)
    )
  
    // Tính diện tích bằng công thức đa giác
    let area = 0
    for (let i = 0; i < points.length; i++) {
      const { x: x1, y: y1 } = points[i]
      const { x: x2, y: y2 } = points[(i + 1) % points.length]
      area += x1 * y2 - x2 * y1
    }
  
    return Math.abs(area / 2)
  }

  const getCentroid = (d: string): { x: number, y: number } => {
    const properties = new svgPathProperties(d)
    const length = properties.getTotalLength()
    const midpoint = properties.getPointAtLength(length / 2)
    return { x: midpoint.x, y: midpoint.y }
  }

const ProvinceMap: React.FC<ProvinceMapProps> = ({ province, districts, width = 576, height = 600, onDistrictClick }) => {
    const viewBox = calculateViewBoxFromPaths(districts);
    const [minX, minY, vbWidth, vbHeight] = viewBox.split(' ').map(Number);
    const viewBoxObj = { width: vbWidth, height: vbHeight };
    const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
    const [smallDistricts, setSmallDistricts] = useState<Record<string, boolean>>({});
    const [centers, setCenters] = useState<Record<string, { x: number; y: number }>>({});
    const [allProvinces, setAllProvinces] = useState<any[]>([]);
    const [provinceWithDistricts, setProvinceWithDistricts] = useState<any[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [districtCenter, setDistrictCenter] = useState<{ lat: number; lon: number } | null>(null);
    
    useEffect(() => {
      fetch("/data/vietnam.json")
        .then(res => res.json())
        .then(data => {
          const elements = data.elements;
          setAllProvinces(elements);
          const relationElements = data.elements.filter((element: any) => element.type === 'relation');
          const provinces = elements.filter((element: any) => element.tags.admin_level === '4').map((element: any) => {
            const memberRelations = element.members.filter((member: any) => member.type === 'relation');
            const memberWays = element.members.filter((member: any) => member.type === 'way');
            const memberNodes = element.members.filter((member: any) => member.type === 'node');
            const memberRelationsRef = memberRelations.map((member: any) => member.ref).join(',');
            const memberRelationsData = relationElements.filter((relation: any) => memberRelationsRef.includes(relation.id));
            return {
              type: element.type,
              id: element.id,
              center: element.center,
              tags: element.tags,
              members: memberRelationsData.map((relation: any) => ({
                type: relation.type,
                center: relation.center,
                tags: relation.tags,
              }))
            };
          });
          setProvinceWithDistricts(provinces);
          console.log(provinces);
        });
    }, []);

    useEffect(() => {
        const newSmall: Record<string, boolean> = {};
        const newCenters: Record<string, { x: number; y: number }> = {};
    
        for (const [key, path] of Object.entries(pathRefs.current)) {
          if (path) {
            const bbox = path.getBBox();
            newSmall[key] = bbox.width * bbox.height < SMALL_THRESHOLD;
            newCenters[key] = {
              x: bbox.x + bbox.width / 2,
              y: bbox.y + bbox.height / 2,
            };
          }
        }
    
        setSmallDistricts(newSmall);
        setCenters(newCenters);
      }, [districts]);

      // const handleDistrictClick = async (district: any) => {
      //   onDistrictClick?.(district);
      //   setSelectedDistrict(district);
      //   const provinceselected = allProvinces.find((province: any) => province.tags.name.toLowerCase() === (`${district.type} ${district.name}`).toLowerCase());
      //   console.log(provinceselected);
      //   setDistrictCenter(provinceselected.center);
      // };
    
      const renderDistrictLabel = (
        d: string,
        name: string,
        viewBox: { width: number; height: number }
      ) => {
        const area = getPathArea(d)
        const centroid = getCentroid(d)
      
        const isSmall = area < 500 // hoặc tuỳ chỉnh theo bản đồ
      
        if (!isSmall) {
          return (
            <text
              x={centroid.x}
              y={-centroid.y}
              fontSize={5}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="black"
              transform="scale(1, -1)"
            >
              {name}
            </text>
          )
        }
      
        // Nếu nhỏ thì vẽ ra ngoài
        const offset = 20
        const directionX = centroid.x < viewBox.width / 2 ? 1 : -1
        const labelX = centroid.x + offset * directionX
        const labelY = centroid.y
      
        return (
          <>
            <line
              x1={centroid.x}
              y1={-centroid.y}
              x2={labelX}
              y2={-labelY}
              stroke="black"
              strokeWidth={1}
            />
            <text
              x={labelX}
              y={-labelY}
              fontSize={5}
              textAnchor={directionX === 1 ? "start" : "end"}
              alignmentBaseline="middle"
              fill="black"
              transform="scale(1, -1)"
            >
              {name}
            </text>
          </>
        )
      }

      const renderLabel = (district: DistrictData) => {
        const center = centers[district.name];
        if (!center) return null;
    
        const isSmall = smallDistricts[district.name];
    
        if (!isSmall) {
          return (
            <text
              x={center.x}
              y={-center.y}
              fontSize={0.04}
              textAnchor="middle"
              alignmentBaseline="middle"
              transform="scale(1, -1)"
              fill="black"
            >
              {district.name}
            </text>
          );
        }
    
        // Nếu nhỏ, vẽ mũi tên ra bên phải
        // const offset = 0.08;
        // const outsideX = center.x + offset;
        // const outsideY = center.y;
    
        // return (
        //   <>
        //     {/* Mũi tên từ tâm ra ngoài */}
        //     <line
        //       x1={center.x}
        //       y1={center.y}
        //       x2={outsideX}
        //       y2={outsideY}
        //       stroke="black"
        //       strokeWidth={0.005}
        //     />
        //     {/* Label ở ngoài */}
        //     <text
        //       x={outsideX + 0.01}
        //       y={-outsideY}
        //       fontSize={0.035}
        //       textAnchor="start"
        //       alignmentBaseline="middle"
        //       transform="scale(1, -1)"
        //       fill="black"
        //     >
        //       {district.name}
        //     </text>
        //   </>
        // );
      };
      const renderLabel2 = (district: DistrictData) => {
        const center = centers[district.name];
        if (!center) return null;
      
        // Tính diện tích path để xác định huyện nhỏ
        const area = (() => {
          try {
            const properties = new svgPathProperties(district.path);
            const length = properties.getTotalLength();
            const points = Array.from({ length: 50 }, (_, i) =>
              properties.getPointAtLength((i / 50) * length)
            );
            let area = 0;
            for (let i = 0; i < points.length; i++) {
              const { x: x1, y: y1 } = points[i];
              const { x: x2, y: y2 } = points[(i + 1) % points.length];
              area += x1 * y2 - x2 * y1;
            }
            return Math.abs(area / 2);
          } catch {
            return 1000; // fallback
          }
        })();
      
        const isSmall = area < 500; // hoặc tuỳ chỉnh theo bản đồ
      
        if (!isSmall) {
          // Huyện lớn: ghi tên ở giữa
          return (
            <text
              x={center.x}
              y={-center.y}
              fontSize={12}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="black"
              transform="scale(1, -1)"
              style={{ pointerEvents: "none" }}
            >
              {district.name}
            </text>
          );
        }
      
        // Huyện nhỏ: vẽ đường kẻ và tên ra ngoài
        const offset = 20;
        const directionX = center.x < vbWidth / 2 ? 1 : -1;
        const labelX = center.x + offset * directionX;
        const labelY = center.y;
      
        return (
          <g>
            <line
              x1={center.x}
              y1={-center.y}
              x2={labelX}
              y2={-labelY}
              stroke="black"
              strokeWidth={1}
              // KHÔNG dùng transform ở đây!
            />
            <text
              x={labelX}
              y={-labelY}
              fontSize={12}
              textAnchor={directionX === 1 ? "start" : "end"}
              alignmentBaseline="middle"
              fill="black"
              transform="scale(1, -1)"
              style={{ pointerEvents: "none" }}
            >
              {district.name}
            </text>
          </g>
        );
      };

      // const displayProvinces = useMemo(() => {
      //   return provinceWithDistricts.map((province: any) => (
      //     <div key={province.id}>
      //       <button
      //         className="bg-gray-200 text-cyan-700 hover:bg-amber-200 rounded-md cursor-pointer"
      //         onClick={() => handleDistrictClick(province)}
      //       >
      //         {province.tags.name}
      //       </button>
      //     </div>
      //   ));
      // }, [provinceWithDistricts]);
  return (
    <>
      <svg
        width={width}
        // height={height}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full pt-10 transform rotate-x-180"
        xmlns="http://www.w3.org/2000/svg"
      >
        {districts.map((district) => {
            const center = getPathCenter(district.path);
            return (
            <g key={district.id}>
                <path
                d={district.path.replace(/L/g, "L ").replace(/M/g, "M ")}
                stroke="white"
                strokeWidth={0.005}
                fill="#a0d2eb"
                ref={el => { pathRefs.current[district.name] = el; }}
                className="hover:fill-green-400 transition-colors cursor-pointer"
                onClick={() => onDistrictClick?.(district)}
                />
                {/* {renderDistrictLabel(district.path, district.name, viewBoxObj)} */}
                {/* {center && (
                <text
                    x={center.x}
                    y={-center.y}
                    fontSize={0.04}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="black"
                    transform="scale(1, -1)"
                >
                    {district.name}
                </text>
                )} */}
            </g>
            );
        })}
        {districts.map((district) => (
            <React.Fragment key={district.name}>{renderLabel(district)}</React.Fragment>
      ))}
      </svg>

      {/* {selectedDistrict && districtCenter && districtCenter.lat && districtCenter.lon && (
        <div>
          <MapView center={[districtCenter.lat, districtCenter.lon]} zoom={14} />
        </div>
      )} */}
    </>
  );
};

export default ProvinceMap;
