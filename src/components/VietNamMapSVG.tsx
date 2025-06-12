"use client";

import React, { useMemo, useState, useEffect } from "react";
import { provinces } from "../data/provinces";
import ProvinceMap from "./ProvinceMap";
import "./styles/map.css";

export interface Province {
  id: string;
  name: string;
  path: string;
  avgPrice?: number;
  change?: number;
}

interface DistrictData {
  id: string;
  name: string;
  province: string;
  type: string;
  path: string;
}

interface VietNamMapSVGProps {
  isShowProvinceList?: boolean;
  width?: number;
  height?: number;
  onClickProvince?: (province: string) => void;
  onDistrictClick?: (district: any) => void;
  provinceName?: string | null;
}

// Mock data for province prices
const provincePrices: Record<string, { avgPrice: number; change: number }> = {
  "Hà Nội": { avgPrice: 58.2, change: 4.2 },
  "TP. Hồ Chí Minh": { avgPrice: 62.5, change: 3.8 },
  "Đà Nẵng": { avgPrice: 45.8, change: 5.1 },
  // Add more provinces as needed
};

const VietNamMapSVG: React.FC<VietNamMapSVGProps> = ({ isShowProvinceList = true, width = 576, height = 600, onClickProvince, onDistrictClick, provinceName }) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [mainAnim, setMainAnim] = useState(false);
  const [provinceAnim, setProvinceAnim] = useState<"in" | "out" | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  useEffect(() => {
    setSelectedProvince(provinceName || null);
    if (provinceName) {
      // handleProvinceClick(provinceName);
      handleProvinceClick('Hồ Chí Minh');
    }    
  }, [provinceName]);


  const handleProvinceClick = async (province: string) => {
    setMainAnim(true);
    setTimeout(async () => {
      const res = await fetch("/data/districts.json");
      const data = await res.json();
      const filtered = data.filter(
        (d: DistrictData) => d.province === province
      );
      setDistricts(filtered);
      // setSelectedProvince(province);
      setMainAnim(false);
      setProvinceAnim("in");
    }, 600);
  };

  const handleBack = () => {
    setProvinceAnim("out");
    setTimeout(() => {
      setSelectedProvince(null);
      setProvinceAnim(null);
    }, 600);
  };  

  return (
    <div className={`flex flex-row items-center justify-center relative`}
    style={{width: `${width}px`, height: `${height}px`}}>
      <div className={`map-container flex justify-center items-center w-full h-full`}>
        {!selectedProvince && (
          <svg
            viewBox={`0 0 ${isShowProvinceList ? "900" : "1500"} ${isShowProvinceList ? "1100" : "1000"}`}
            xmlns="http://www.w3.org/2000/svg"
            className={`main-map${mainAnim ? " animate-out" : ""}`}
          >
            <g transform="scale(1)">
              {provinces.map((province) => {
                const priceData = provincePrices[province.name];
                return (
                  <g key={province.id}>
                    <path
                      d={province.path}
                      fill={hoveredProvince === province.name ? "#4ade80" : "#d9d9d9"}
                      stroke="#555"
                      strokeWidth={0.5}
                      onClick={() => onClickProvince && onClickProvince(province.name)}
                      onMouseEnter={() => setHoveredProvince(province.name)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      className="transition-colors cursor-pointer"
                    >
                      <title>{province.name}</title>
                    </path>
                    {priceData && (
                      <text
                        x={province.path.split(" ")[1]}
                        y={province.path.split(" ")[2]}
                        className="text-xs font-medium fill-gray-700"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {priceData.avgPrice}tr/m²
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        )}
        {selectedProvince && (
          <div
            className={
              "province-map" +
              (provinceAnim === "in"
                ? " animate-in"
                : provinceAnim === "out"
                ? " animate-out"
                : "")
            }
          >
            {/* <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={handleBack}
            >
              Back To Viet Nam Map
            </button> */}
            <ProvinceMap districts={districts} province={selectedProvince} onDistrictClick={onDistrictClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VietNamMapSVG;
