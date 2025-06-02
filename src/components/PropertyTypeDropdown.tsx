import React, { useState, useRef } from 'react';
import FilterDropdown from './FilterDropdown';
import { FiHome } from 'react-icons/fi';
import { MdApartment, MdOutlineVilla, MdOutlineBusiness } from 'react-icons/md';

const PROPERTY_TYPES = [
  { label: 'Tất cả nhà đất', icon: <FiHome /> },
  { label: 'Căn hộ chung cư', icon: <MdApartment /> },
  { label: 'Chung cư mini, căn hộ dịch vụ', icon: <MdApartment /> },
  { label: 'Các loại nhà bán', icon: <FiHome /> },
  { label: 'Nhà riêng', icon: <FiHome /> },
  { label: 'Nhà biệt thự, liền kề', icon: <MdOutlineVilla /> },
  { label: 'Nhà mặt phố', icon: <FiHome /> },
  { label: 'Shophouse, nhà phố thương mại', icon: <MdOutlineBusiness /> },
  { label: 'Các loại đất bán', icon: <FiHome /> },
];

export default function PropertyTypeDropdown({ open, onClose, anchorRef, onApply, selectedTypes, setSelectedTypes, width }: {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  onApply: () => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  width?: number;
}) {
  const handleToggle = (type: string) => {
    setSelectedTypes(
      selectedTypes.includes(type)
        ? selectedTypes.filter(t => t !== type)
        : [...selectedTypes, type]
    );
  };
  const handleReset = () => setSelectedTypes([]);

  return (
    <FilterDropdown open={open} onClose={onClose} anchorRef={anchorRef} width={width}>
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-lg">Loại nhà đất</span>
        <button className="text-2xl text-gray-400 hover:text-gray-700" onClick={onClose}>×</button>
      </div>
      <div className="max-h-64 overflow-y-auto mb-4">
        {PROPERTY_TYPES.map((type, idx) => (
          <label key={type.label} className="flex items-center py-2 cursor-pointer hover:bg-gray-50 px-2 rounded">
            <span className="mr-3 text-xl">{type.icon}</span>
            <span className="flex-1">{type.label}</span>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type.label)}
              onChange={() => handleToggle(type.label)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="text-gray-600 font-medium" onClick={handleReset}>Đặt lại</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onApply}>Áp dụng</button>
      </div>
    </FilterDropdown>
  );
} 