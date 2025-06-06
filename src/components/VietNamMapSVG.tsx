"use client";
import React, { useState } from "react";
import { provinces } from "../data/provinces";
import ProvinceMap from "./ProvinceMap";
import "./styles/map.css";

export interface Province {
  id: string;
  name: string;
  path: string;
}

interface DistrictData {
  id: string;
  name: string;
  province: string;
  type: string;
  path: string;
}
const VietNamMapSVG: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [mainAnim, setMainAnim] = useState(false);
  const [provinceAnim, setProvinceAnim] = useState<"in" | "out" | null>(null);

  const handleProvinceClick = async (province: string) => {
    setMainAnim(true); // Animate main map out
    setTimeout(async () => {
      const res = await fetch("/data/districts.json");
      const data = await res.json();
      const filtered = data.filter(
        (d: DistrictData) => d.province === province
      );
      setDistricts(filtered);
      setSelectedProvince(province);
      setMainAnim(false);
      setProvinceAnim("in");
    }, 600);
  };
  const handleBack = () => {
    setProvinceAnim("out"); // Animate province map out
    setTimeout(() => {
      setSelectedProvince(null);
      setProvinceAnim(null);
    }, 600);
  };
  return (
    //create a container width two columns left is map and right is list province
    <div className="flex flex-row items-center justify-center">
      <div className="map-container flex justify-center items-center w-1/2 bg-gray-100">
        {!selectedProvince && (
          <svg
            viewBox="0 0 900 1100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "auto" }}
            className={`main-map${mainAnim ? " animate-out" : ""}`}
          >
            <g transform="scale(1)">
              {provinces.map((province) => (
                <path
                  key={province.id}
                  d={province.path}
                  fill="#d9d9d9"
                  stroke="#555"
                  strokeWidth={0.5}
                  onClick={() => handleProvinceClick(province.name)}
                  className="fill-gray-300 stroke-gray-500 hover:fill-green-400 transition-colors cursor-pointer"
                >
                  <title>{province.name}</title>
                </path>
              ))}
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={handleBack}
            >
              Back To Viet Nam Map
            </button>
            <ProvinceMap districts={districts} />
          </div>
        )}
      </div>
      <div className="w-1/2 overflow-y-scroll h-[650px]">
        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
          {provinces.map((province) => (
            <button
              key={province.id}
              className="bg-gray-200 text-cyan-700 hover:bg-amber-200 rounded-md cursor-pointer"
              onClick={() => handleProvinceClick(province.name)}
            >
              {province.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VietNamMapSVG;
