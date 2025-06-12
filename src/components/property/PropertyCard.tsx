import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const t = useTranslations('property');
  const tTypes = useTranslations('types');
  const locale = useLocale();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-[#44b5bb] text-white px-2 py-1 rounded text-sm">
          {tTypes(property.type)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{property.location.city}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-gray-600">
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-sm">{property.area}m²</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm">{property.bedrooms} {t('bedrooms')}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-[#44b5bb]">{formatPrice(property.price)}</span>
          <Link
            href={`/${locale}/property/${property.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#44b5bb] hover:bg-blue-700"
          >
            {t('view_details')}
          </Link>
        </div>
      </div>
    </div>
  );
} 