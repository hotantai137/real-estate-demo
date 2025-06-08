"use client";

import React, { useState } from 'react';
import VietNamMapSVG from '@/components/VietNamMapSVG';

// Mock data for provinces
const mockProvinces = [
  {
    id: '1',
    name: 'Hà Nội',
    avgPrice: 58.2,
    change: 4.2,
  },
  {
    id: '2',
    name: 'TP. Hồ Chí Minh',
    avgPrice: 62.5,
    change: 3.8,
  },
  {
    id: '3',
    name: 'Đà Nẵng',
    avgPrice: 45.8,
    change: 5.1,
  },
  // Add more mock data as needed
];

const propertyTypes = [
  'Chung cư',
  'Nhà riêng',
  'Biệt thự',
  'Đất nền',
  'Văn phòng',
];

const MapDashboard = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProvinceClick = (provinceName: string) => {
    console.log('Selected province:', provinceName);
    setSelectedProvince(provinceName);
  };

  return (
    <div className="flex h-screen bg-gray-50 mt-10">
      {/* Left Sidebar */}
      <div className="w-1/3 p-6 border-r border-gray-200 overflow-hidden flex flex-col">
        {/* Filters Section */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Bộ lọc tìm kiếm</h2>
          
          {/* Province Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tỉnh thành
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedProvince || ''}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Chọn tỉnh thành</option>
              {mockProvinces.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quận huyện
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDistrict || ''}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Chọn quận huyện</option>
              {/* Add district options dynamically based on selected province */}
            </select>
          </div>

          {/* Property Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại nhà
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedType || ''}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Chọn loại nhà</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Nhập tên khu vực, đường, quận huyện"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Province List */}
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Danh sách tỉnh thành</h2>
          <div className="space-y-4">
            {mockProvinces.map((province) => (
              <div
                key={province.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{province.name}</h3>
                  <span className="text-sm text-gray-500">
                    {province.avgPrice} triệu/m²
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${province.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {province.change >= 0 ? '+' : ''}{province.change}%
                  </span>
                  <button
                    onClick={() => handleProvinceClick(province.name)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Main Area */}
      <div className="flex-1 p-6">
        <div className="h-full bg-white rounded-lg shadow-sm">
          <VietNamMapSVG isShowProvinceList={false} />
        </div>
      </div>
    </div>
  );
};

export default MapDashboard; 