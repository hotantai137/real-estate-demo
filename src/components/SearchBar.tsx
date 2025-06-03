'use client';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import PropertyTypeDropdown from './PropertyTypeDropdown';
import PriceDropdown from './PriceDropdown';
import AreaDropdown from './AreaDropdown';
import LocationModal from './LocationModal';

interface SearchBarProps {
  onMapClick?: () => void;
  mapActive?: boolean;
  variant?: 'full' | 'simple';
}

type TabType = 'sale' | 'rent' | 'project';

export default function SearchBar({ onMapClick, mapActive, variant = 'full' }: SearchBarProps) {
  const [location, setLocation] = useState('Hồ Chí Minh');
  const [inputValue, setInputValue] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('sale');
  const router = useRouter();

  // Dropdown states for full mode
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const propertyTypeBtnRef = React.useRef<HTMLButtonElement>(null);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('Tất cả mức giá');
  const priceBtnRef = React.useRef<HTMLButtonElement>(null);
  const [showArea, setShowArea] = useState(false);
  const [selectedArea, setSelectedArea] = useState('Tất cả diện tích');
  const areaBtnRef = React.useRef<HTMLButtonElement>(null);

  const locations = [
    'Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Bình Dương',
    'Đồng Nai',
    'Khánh Hòa',
    'Quận Hải Châu',
  ];

  const inputGroupRef = React.useRef<HTMLDivElement>(null);
  const [modalWidth, setModalWidth] = useState<number | undefined>(undefined);
  const locationBtnRef = React.useRef<HTMLButtonElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (variant === 'full' && showLocationDropdown && inputGroupRef.current) {
      setModalWidth(inputGroupRef.current.offsetWidth);
    }
  }, [showLocationDropdown, variant]);

  React.useEffect(() => {
    if (variant === 'full' && showLocationDropdown) {
      const handleClick = (e: MouseEvent) => {
        if (
          locationBtnRef.current &&
          !locationBtnRef.current.contains(e.target as Node) &&
          modalRef.current &&
          !modalRef.current.contains(e.target as Node)
        ) {
          setShowLocationDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [showLocationDropdown, variant]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    // You can add additional logic here, like changing the search parameters
    // or redirecting to a different URL based on the selected tab
  };

  return (
    <div className={variant === 'full' ? 'w-full max-w-5xl mx-auto flex flex-col gap-1 bg-gray-700 rounded-xl shadow-2xl p-4' : 'w-full max-w-4xl mx-auto flex flex-col gap-1'}>
      {variant === 'full' && (
        <div className="flex space-x-2 mb-2">
          <button 
            className={`px-3 py-1.5 rounded-t-md text-sm font-semibold transition-all duration-200 ${
              activeTab === 'sale' ? 'bg-white text-gray-800 shadow' : 'text-white hover:bg-gray-600'
            }`}
            onClick={() => handleTabClick('sale')}
          >
            Nhà đất bán
          </button>
          <button 
            className={`px-3 py-1.5 rounded-t-md text-sm font-semibold transition-all duration-200 ${
              activeTab === 'rent' ? 'bg-white text-gray-800 shadow' : 'text-white hover:bg-gray-600'
            }`}
            onClick={() => handleTabClick('rent')}
          >
            Nhà đất cho thuê
          </button>
          <button 
            className={`px-3 py-1.5 rounded-t-md text-sm font-semibold transition-all duration-200 ${
              activeTab === 'project' ? 'bg-white text-gray-800 shadow' : 'text-white hover:bg-gray-600'
            }`}
            onClick={() => handleTabClick('project')}
          >
            Dự án
          </button>
        </div>
      )}
      <div ref={variant === 'full' ? inputGroupRef : undefined} className={variant === 'full' ? 'relative flex items-center bg-gray-100 rounded-lg px-3 py-1.5 gap-2 mb-2' : 'flex items-center bg-white rounded-xl shadow px-3 py-1.5 gap-2 border border-gray-200'}>
        {variant === 'full' && (
          <div className="relative flex items-center mr-1">
            <span className="text-lg text-gray-500 mr-1"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
            <button
              ref={locationBtnRef}
              type="button"
              className="font-semibold text-gray-800 flex items-center bg-transparent focus:outline-none text-sm whitespace-nowrap"
              onClick={() => setShowLocationDropdown(v => !v)}
            >
              {location}
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showLocationDropdown && (
              <div ref={modalRef} className="absolute left-0 top-full z-30" style={modalWidth ? { width: modalWidth } : { minWidth: 240 }}>
                <LocationModal
                  onClose={() => setShowLocationDropdown(false)}
                  onSelect={loc => {
                    setLocation(loc);
                    setShowLocationDropdown(false);
                  }}
                />
              </div>
            )}
          </div>
        )}
        {variant === 'full' && <span className="mx-1 text-gray-400">|</span>}
        <div className="relative flex-1 flex items-center">
          <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            className={variant === 'full' ? 'w-full pl-8 pr-3 py-1.5 rounded-lg bg-transparent outline-none text-sm placeholder-gray-500' : 'w-full pl-8 pr-3 py-1.5 rounded-xl bg-transparent outline-none text-sm placeholder-gray-400'}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={variant === 'full' ? 'Nhập tối đa 5 địa điểm, dự án. Ví dụ: Quận Hoàn Kiếm, Quận Đống Đa' : 'Quận Hải Châu'}
          />
        </div>
        <button
          className={variant === 'full' ? 'bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-semibold text-sm ml-1 transition whitespace-nowrap' : 'bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl font-semibold text-sm ml-1 transition whitespace-nowrap'}
          onClick={() => router.push('/search')}
        >
          Tìm kiếm
        </button>
        {variant === 'simple' && (
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-xl font-semibold text-sm ml-1 flex items-center gap-1 transition whitespace-nowrap"
            onClick={onMapClick}
          >
            <FaMapMarkedAlt className="text-lg" />
            {mapActive ? 'Đóng bản đồ' : 'Xem bản đồ'}
          </button>
        )}
      </div>
      {variant === 'full' && (
        <div className="flex gap-2 mt-1">
          <div className="relative flex-1">
            <button
              ref={propertyTypeBtnRef}
              className="w-full p-1.5 rounded border flex items-center justify-between bg-gray-700 text-white text-sm"
              onClick={() => setShowPropertyType(v => !v)}
            >
              <span className="truncate">Loại nhà đất</span>
              <svg className="ml-1 w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <PropertyTypeDropdown
              open={showPropertyType}
              onClose={() => setShowPropertyType(false)}
              anchorRef={propertyTypeBtnRef as React.RefObject<HTMLButtonElement>}
              onApply={() => setShowPropertyType(false)}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              width={propertyTypeBtnRef.current?.offsetWidth}
            />
          </div>
          <div className="relative flex-1">
            <button
              ref={priceBtnRef}
              className="w-full p-1.5 rounded border flex items-center justify-between bg-gray-700 text-white text-sm"
              onClick={() => setShowPrice(v => !v)}
            >
              <span className="truncate">Mức giá</span>
              <svg className="ml-1 w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <PriceDropdown
              open={showPrice}
              onClose={() => setShowPrice(false)}
              anchorRef={priceBtnRef as React.RefObject<HTMLButtonElement>}
              onApply={() => setShowPrice(false)}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              width={priceBtnRef.current?.offsetWidth}
            />
          </div>
          <div className="relative flex-1">
            <button
              ref={areaBtnRef}
              className="w-full p-1.5 rounded border flex items-center justify-between bg-gray-700 text-white text-sm"
              onClick={() => setShowArea(v => !v)}
            >
              <span className="truncate">Diện tích</span>
              <svg className="ml-1 w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <AreaDropdown
              open={showArea}
              onClose={() => setShowArea(false)}
              anchorRef={areaBtnRef as React.RefObject<HTMLButtonElement>}
              onApply={() => setShowArea(false)}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              width={areaBtnRef.current?.offsetWidth}
            />
          </div>
        </div>
      )}
    </div>
  );
} 