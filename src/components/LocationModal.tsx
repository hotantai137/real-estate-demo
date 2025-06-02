import React from 'react';

export default function LocationModal({ onClose, onSelect, className = '', style = {} }: { onClose: () => void, onSelect: (loc: string) => void, className?: string, style?: React.CSSProperties }) {
  const topCities = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Bình Dương', 'Đồng Nai', 'Khánh Hòa'];
  const allCities = [
    'An Giang', 'Bà Rịa Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Cà Mau', 'Cần Thơ', 'Cao Bằng', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
  ];

  // Prevent click inside modal from closing it
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className={`bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mt-2 ${className}`}
      style={style}
      onClick={handleModalClick}
    >
      {/* Arrow */}
      <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 z-10"></div>
      <button className="absolute top-3 right-4 text-xl text-gray-400 hover:text-gray-700" onClick={onClose}>×</button>
      <h2 className="text-lg font-semibold mb-4">Bạn muốn tìm bất động sản tại tỉnh thành nào?</h2>
      <div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Top tỉnh thành nổi bật</div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {topCities.map(city => (
              <div
                key={city}
                className="bg-gray-100 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-100 transition"
                onClick={() => onSelect(city)}
              >
                <div className="font-bold">{city}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-2">Tất cả tỉnh thành</div>
          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {allCities.map(city => (
              <div
                key={city}
                className="cursor-pointer hover:underline px-2 py-1 rounded hover:bg-blue-50 transition"
                onClick={() => onSelect(city)}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 