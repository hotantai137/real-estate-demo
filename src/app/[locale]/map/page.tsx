"use client";

import React, { useEffect, useState } from 'react';
import VietNamMapSVG from '@/components/VietNamMapSVG';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MapView from '@/components/MapView';
import {provinces} from '@/data/provinces';

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
  const [allProvinces, setAllProvinces] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [provinceWithDistricts, setProvinceWithDistricts] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [districtCenter, setDistrictCenter] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'price' | 'house'>('price');
  const [provinceDropdown, setProvinceDropdown] = useState<string | null>(null);
  const [districtDropdown, setDistrictDropdown] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/vietnam.json")
      .then(res => res.json())
      .then(data => {
        const elements = data.elements;
        setAllProvinces(elements);
        const relationElements = data.elements.filter((element: any) => element.type === 'relation');
        const provicesLv4 = elements.filter((element: any) => element.tags.admin_level === '4')
        setProvinces(provicesLv4);
        const provinces = provicesLv4.map((element: any) => {
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
              id: relation.id,
              type: relation.type,
              center: relation.center,
              tags: relation.tags,
            }))
          };
        });
        setProvinceWithDistricts(provinces);
      });
  }, []);

  const handleProvinceClick = (provinceName: string) => {
    console.log('Selected province:', provinceName);
    setSelectedProvince(provinceName);
    setSelectedDistrict(null);
    setDistrictCenter(null);
  };

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      setIsSidebarVisible(false);
      // Đợi animation hoàn thành (500ms) trước khi ẩn hoàn toàn
      setTimeout(() => {
        setIsSidebarHidden(true);
      }, 500);
    } else {
      setIsSidebarHidden(false);
      // Đợi một chút để đảm bảo element đã được render trước khi animation
      setTimeout(() => {
        setIsSidebarVisible(true);
      }, 50);
    }
  };

  const onDistrictClick = (district: any) => {
    console.log('Selected district:', district);
    setSelectedDistrict(district);
    const provinceselected = allProvinces.find((province: any) => province.tags.name.toLowerCase() === (`${district.type} ${district.name}`).toLowerCase());
    console.log(provinceselected);
    setDistrictCenter(provinceselected.center);
  };

  const handleBack = () => {
    if (selectedDistrict) {
      setSelectedProvince(selectedProvince);
      setSelectedDistrict(null);
      setDistrictCenter(null);
    } else {
      setSelectedProvince(null);
      setSelectedDistrict(null);
      setDistrictCenter(null);
    }
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvinceDropdown(e.target.value);
    const provinceId = e.target.value;
    console.log(provinceId);
    // setSelectedProvince(provinceName);
    // setSelectedDistrict(null);
    // setDistrictCenter(null);
    // //load districts
    console.log(provinceWithDistricts);
    const districts = provinceWithDistricts.find((province: any) => province.id == provinceId);
    console.log(districts);
    setDistricts(districts.members);
  };

  return (
    <div className="flex h-screen bg-gray-50 mt-20 relative">
      
      <select
          className="w-[185px] absolute left-0 top-0 z-[600] p-4 shadow-[0_2px_4px_#56565626,inset_-2px_-2px_4px_#94949440,inset_2px_2px_4px_#f2f2f280] rounded-lg hidden md:block bg-white text-[#11506d] font-bold appearance-none pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUgNmw1IDUgNS01IiBzdHJva2U9IiMxMTUwNmQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[center_right_12px]"
          value={provinceDropdown || ''}
          onChange={(e) => handleProvinceChange(e)}
        >
          <option value="">Tỉnh thành</option>
          {provinces.map(province => (
            <option key={province.id} value={province.id}>{province.tags.name}</option>
          ))}
        </select>
        <select
          className="w-[185px] absolute left-[195px] top-0 z-[600] p-4 shadow-[0_2px_4px_#56565626,inset_-2px_-2px_4px_#94949440,inset_2px_2px_4px_#f2f2f280] rounded-lg hidden md:block bg-white text-[#11506d] font-bold appearance-none pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUgNmw1IDUgNS01IiBzdHJva2U9IiMxMTUwNmQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[center_right_12px]"
          value={districtDropdown || ''}
          onChange={e => setDistrictDropdown(e.target.value)}
        >
          <option value="">Quận/huyện</option>
          {districts?.map((district: any) => (
            <option key={district.id} value={district.id}>{district.tags.name}</option>
          ))}
        </select>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`hidden md:block absolute transition-all duration-500 ease-in-out ${isSidebarVisible ? 'left-0 md:left-[25%]' : 'left-0'} top-20 p-2 z-[500] bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors}`}
      >
        {isSidebarVisible ? 'Collapse filter' : 'Expand filter'}
      </button>

      {(selectedProvince || selectedDistrict) && (
          <button
          className={`absolute ${isSidebarVisible ? 'left-[25%]' : 'left-0'} top-32 z-[999] bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer shadow-lg hover:bg-blue-600 transition-all duration-500 ease-in-out`}
          onClick={handleBack}
        >
          {selectedDistrict ? 'Quay lại tỉnh thành' : 'Quay lại bản đồ'}
        </button>
        )}

      {/* Left Sidebar */}
      <div className={`hidden md:flex z-[500] w-1/4 p-6 rounded-lg bg-gray-100 border-gray-200 overflow-hidden flex-col transition-all duration-500 ease-in-out absolute left-0 top-16 bottom-0 ${isSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} ${isSidebarHidden ? 'hidden' : ''}`}>
        {/* Filters Section */}
        <div className="space-y-4 mb-6">
          {/* Button Group */}
          <div className="flex mb-4 gap-0 w-full">
            <button
              className={`w-1/2 flex items-center justify-center px-6 py-3 rounded-l-xl font-bold focus:outline-none transition-colors duration-200
                ${selectedTab === 'price'
                  ? 'bg-[#296080] text-white shadow-[0_2px_4px_#56565626,inset_-2px_-2px_4px_#94949440,inset_2px_2px_4px_#f2f2f280]'
                  : 'bg-white text-[#296080] shadow-[0_2px_4px_#56565626,inset_-2px_-2px_4px_#94949440,inset_2px_2px_4px_#f2f2f280] border-r border-gray-200'}
              `}
              onClick={() => setSelectedTab('price')}
            >
              <img
                src={selectedTab === 'price' ? '/price.svg' : '/price-dark.svg'}
                alt="price icon"
                className="h-6 w-6 mr-2"
              />
              <span>Xem giá</span>
            </button>
            <button
              className={`w-1/2 flex items-center justify-center px-6 py-3 rounded-r-xl font-bold focus:outline-none transition-colors duration-200
                ${selectedTab === 'house'
                  ? 'bg-[#296080] text-white shadow-[0_2px_4px_#56565626,inset_-2px_-2px_4px_#94949440,inset_2px_2px_4px_#f2f2f280]'
                  : 'bg-white text-[#296080] shadow-[0_2px_4px_#56565626,inset_-2px_-2px_4px_#94949440,inset_2px_2px_4px_#f2f2f280] border-l border-gray-200'}
              `}
              onClick={() => setSelectedTab('house')}
            >
              <img
                src={selectedTab === 'house' ? '/house.svg' : '/house-dark.svg'}
                alt="house icon"
                className="h-6 w-6 mr-2"
              />
              <span>Bán nhà</span>
            </button>
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
      {!selectedDistrict && <div className={`flex-1 h-full z-0 md:pl-[500px] bg-white rounded-lg`}>
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={2}
          centerOnInit={true}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="hidden md:flex absolute right-4 top-18 z-10  gap-2">
                <button
                  onClick={() => zoomIn()}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <TransformComponent
                wrapperStyle={{
                  width: '100%',
                  height: '100%'
                }}
                contentStyle={{
                  width: '100%',
                  height: '100%'
                }}
              >
                <VietNamMapSVG 
                  isShowProvinceList={false} 
                  onClickProvince={handleProvinceClick} 
                  onDistrictClick={onDistrictClick}
                  provinceName={selectedProvince}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>}
      {selectedDistrict && districtCenter && (
        <MapView center={[districtCenter.lat, districtCenter.lon]} zoom={14} />
      )}
    </div>
  );
};

export default MapDashboard; 