import React, { useState, useEffect } from 'react';
import FilterDropdown from './FilterDropdown';
import 'rc-slider/assets/index.css';
import Range from 'rc-slider';

const PRICE_OPTIONS = [
  'Tất cả mức giá',
  'Dưới 500 triệu',
  '500 - 800 triệu',
  '800 triệu - 1 tỷ',
  '1 - 2 tỷ',
];

const MIN_PRICE = 0;
const MAX_PRICE = 2000;

export default function PriceDropdown({ open, onClose, anchorRef, onApply, selectedPrice, setSelectedPrice, width }: {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  onApply: () => void;
  selectedPrice: string;
  setSelectedPrice: (price: string) => void;
  width?: number;
}) {
  const [range, setRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [minInput, setMinInput] = useState(MIN_PRICE.toString());
  const [maxInput, setMaxInput] = useState(MAX_PRICE.toString());

  useEffect(() => {
    setMinInput((Array.isArray(range) && typeof range[0] === 'number') ? range[0].toString() : MIN_PRICE.toString());
    setMaxInput((Array.isArray(range) && typeof range[1] === 'number') ? range[1].toString() : MAX_PRICE.toString());
  }, [range]);

  const handleReset = () => {
    setSelectedPrice('Tất cả mức giá');
    setRange([MIN_PRICE, MAX_PRICE]);
  };

  const minVal = (Array.isArray(range) && typeof range[0] === 'number') ? range[0] : MIN_PRICE;
  const maxVal = (Array.isArray(range) && typeof range[1] === 'number') ? range[1] : MAX_PRICE;

  return (
    <FilterDropdown open={open} onClose={onClose} anchorRef={anchorRef} width={width}>
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-lg">Mức giá</span>
        <button className="text-2xl text-gray-400 hover:text-gray-700" onClick={onClose}>×</button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Giá thấp nhất</label>
          <input className="w-full border rounded p-1"
            value={minInput}
            onChange={e => setMinInput(e.target.value)}
            onBlur={() => {
              const value = Number(minInput);
              if (!isNaN(value) && value < maxVal && value >= MIN_PRICE) {
                setRange([value, maxVal]);
              } else {
                setMinInput(minVal.toString());
              }
            }}
            type="number"
            min={MIN_PRICE}
            max={maxVal - 1}
          />
        </div>
        <span className="mx-2">→</span>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Giá cao nhất</label>
          <input className="w-full border rounded p-1"
            value={maxInput}
            onChange={e => setMaxInput(e.target.value)}
            onBlur={() => {
              const value = Number(maxInput);
              if (!isNaN(value) && value > minVal && value <= MAX_PRICE) {
                setRange([minVal, value]);
              } else {
                setMaxInput(maxVal.toString());
              }
            }}
            type="number"
            min={minVal + 1}
            max={MAX_PRICE}
          />
        </div>
      </div>
      {/* rc-slider dual-thumb slider */}
      <div className="w-full flex flex-col items-center mb-4">
        <Range
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={range}
          onChange={(newRange) => setRange(newRange as [number, number])}
          allowCross={false}
          trackStyle={[{ backgroundColor: '#14b8a6' }]}
          handleStyle={[{ borderColor: '#14b8a6' }, { borderColor: '#14b8a6' }]}
        />
        <div className="flex justify-between w-full text-xs text-gray-500 mt-1">
          <span>{minVal} triệu</span>
          <span>{maxVal} triệu</span>
        </div>
      </div>
      <div className="max-h-40 overflow-y-auto mb-4">
        {PRICE_OPTIONS.map(option => (
          <label key={option} className="flex items-center py-2 cursor-pointer hover:bg-gray-50 px-2 rounded">
            <input
              type="radio"
              checked={selectedPrice === option}
              onChange={() => setSelectedPrice(option)}
              className="form-radio h-4 w-4 text-red-500 mr-3"
            />
            <span>{option}</span>
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