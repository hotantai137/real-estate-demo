'use client';
import { useTranslations } from 'next-intl';
import PropertyCard from '@/components/property/PropertyCard';
import { searchProperties } from '@/data/properties';
import SearchBar from '@/components/SearchBar';
import { properties } from '@/data/properties';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkedAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import React from 'react';

interface SearchParams {
  location?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
}

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function SearchPage() {
  const t = useTranslations('search');
  const tTypes = useTranslations('types');

  // Use the latest 10 properties
  const propertyList = properties.slice(0, 10);

  const [showMap, setShowMap] = React.useState(false);

  React.useEffect(() => {
    if (showMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMap]);

  return (
    <main className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50${showMap ? ' p-0 m-0 pt-16' : ' py-10 pt-16'}`}>
      <div className={showMap ? 'flex flex-row gap-0 w-full h-[calc(100vh-64px)]' : 'max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'}>
        {/* Search Bar */}
        <div className={showMap ? 'w-full absolute top-0 left-0 right-0 z-30 px-8 pt-8 mt-16' : 'mb-8 mt-8'}>
          <SearchBar variant="simple" onMapClick={() => setShowMap(v => !v)} mapActive={showMap} />
        </div>
        <div className={showMap ? 'flex flex-row w-full h-full pt-32' : 'flex flex-col lg:flex-row gap-10'}>
          {/* Left: Property List */}
          <div className={showMap ? 'flex-1 overflow-y-auto h-full px-8' : 'flex-1'}>
            <div className={showMap ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'grid grid-cols-1 md:grid-cols-2 gap-8'}>
              {propertyList.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
          {/* Right: Sidebar Filters or Map */}
          <aside className={showMap ? 'flex-1 h-full min-h-[900px] p-0 m-0' : 'w-full lg:w-80 flex-shrink-0'}>
            {showMap ? (
              <div className="w-full h-full min-h-[100vw]">
                <MapView properties={propertyList} />
              </div>
            ) : (
              <>
                <div className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FiSearch className="text-blue-500" />Lọc theo khoảng giá</h3>
                  <ul className="text-gray-700 text-base space-y-2">
                    <li className="cursor-pointer hover:text-blue-600">Thỏa thuận</li>
                    <li className="cursor-pointer hover:text-blue-600">Dưới 500 triệu</li>
                    <li className="cursor-pointer hover:text-blue-600">500 - 800 triệu</li>
                    <li className="cursor-pointer hover:text-blue-600">800 triệu - 1 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">1 - 2 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">2 - 3 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">3 - 5 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">5 - 7 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">7 - 10 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">10 - 20 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">20 - 30 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">30 - 40 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">40 - 60 tỷ</li>
                    <li className="cursor-pointer hover:text-blue-600">Trên 60 tỷ</li>
                  </ul>
                </div>
                <div className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FaMapMarkedAlt className="text-teal-500" />Lọc theo diện tích</h3>
                  <ul className="text-gray-700 text-base space-y-2">
                    <li className="cursor-pointer hover:text-blue-600">Dưới 30 m²</li>
                    <li className="cursor-pointer hover:text-blue-600">30 - 50 m²</li>
                    <li className="cursor-pointer hover:text-blue-600">50 - 80 m²</li>
                    <li className="cursor-pointer hover:text-blue-600">80 - 100 m²</li>
                    <li className="cursor-pointer hover:text-blue-600">100 - 150 m²</li>
                    <li className="cursor-pointer hover:text-blue-600">150 - 200 m²</li>
                    <li className="cursor-pointer hover:text-blue-600">200 - 250 m²</li>
                    <li className="cursor-pointer hover:text-blue-600">Trên 250 m²</li>
                  </ul>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
} 