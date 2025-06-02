import React, { useState, useEffect } from 'react';
import FilterDropdown from './FilterDropdown';
import 'rc-slider/assets/index.css';
import Range from 'rc-slider';

const AREA_OPTIONS = [
  'Tất cả diện tích',
  'Dưới 30 m²',
  '30 - 50 m²',
  '50 - 80 m²',
  '80 - 100 m²',
];

const MIN_AREA = 0;
const MAX_AREA = 200;

export default function AreaDropdown({ open, onClose, anchorRef, onApply, selectedArea, setSelectedArea, width }: {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  onApply: () => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  width?: number;
}) {
  const [range, setRange] = useState<[number, number]>([MIN_AREA, MAX_AREA]);
  const [minInput, setMinInput] = useState(MIN_AREA.toString());
  const [maxInput, setMaxInput] = useState(MAX_AREA.toString());

  useEffect(() => {
    setMinInput((Array.isArray(range) && typeof range[0] === 'number') ? range[0].toString() : MIN_AREA.toString());
    setMaxInput((Array.isArray(range) && typeof range[1] === 'number') ? range[1].toString() : MAX_AREA.toString());
  }, [range]);

  const handleReset = () => {
    setSelectedArea('Tất cả diện tích');
    setRange([MIN_AREA, MAX_AREA]);
  };

  const minVal = (Array.isArray(range) && typeof range[0] === 'number') ? range[0] : MIN_AREA;
  const maxVal = (Array.isArray(range) && typeof range[1] === 'number') ? range[1] : MAX_AREA;

  return (
    <FilterDropdown open={open} onClose={onClose} anchorRef={anchorRef} width={width}>
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-lg">Diện tích</span>
        <button className="text-2xl text-gray-400 hover:text-gray-700" onClick={onClose}>×</button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Diện tích nhỏ nhất</label>
          <input className="w-full border rounded p-1"
            value={minInput}
            onChange={e => setMinInput(e.target.value)}
            onBlur={() => {
              const value = Number(minInput);
              if (!isNaN(value) && value < maxVal && value >= MIN_AREA) {
                setRange([value, maxVal]);
              } else {
                setMinInput(minVal.toString());
              }
            }}
            type="number"
            min={MIN_AREA}
            max={maxVal - 1}
          />
        </div>
        <span className="mx-2">→</span>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Diện tích lớn nhất</label>
          <input className="w-full border rounded p-1"
            value={maxInput}
            onChange={e => setMaxInput(e.target.value)}
            onBlur={() => {
              const value = Number(maxInput);
              if (!isNaN(value) && value > minVal && value <= MAX_AREA) {
                setRange([minVal, value]);
              } else {
                setMaxInput(maxVal.toString());
              }
            }}
            type="number"
            min={minVal + 1}
            max={MAX_AREA}
          />
        </div>
      </div>
      {/* rc-slider dual-thumb slider */}
      <div className="w-full flex flex-col items-center mb-4">
        <Range
          min={MIN_AREA}
          max={MAX_AREA}
          value={range}
          onChange={(newRange) => setRange(newRange as [number, number])}
          allowCross={false}
          trackStyle={[{ backgroundColor: '#14b8a6' }]}
          handleStyle={[{ borderColor: '#14b8a6' }, { borderColor: '#14b8a6' }]}
        />
        <div className="flex justify-between w-full text-xs text-gray-500 mt-1">
          <span>{minVal} m²</span>
          <span>{maxVal} m²</span>
        </div>
      </div>
      <div className="max-h-40 overflow-y-auto mb-4">
        {AREA_OPTIONS.map(option => (
          <label key={option} className="flex items-center py-2 cursor-pointer hover:bg-gray-50 px-2 rounded">
            <input
              type="radio"
              checked={selectedArea === option}
              onChange={() => setSelectedArea(option)}
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