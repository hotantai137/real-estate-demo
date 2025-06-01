import { useTranslations } from 'next-intl';
import PropertyCard from '@/components/property/PropertyCard';
import { searchProperties } from '@/data/properties';

interface SearchParams {
  location?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = useTranslations('search');
  const tTypes = useTranslations('types');

  const filters = {
    location: searchParams.location,
    type: searchParams.type,
    minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
    minArea: searchParams.minArea ? parseInt(searchParams.minArea) : undefined,
    maxArea: searchParams.maxArea ? parseInt(searchParams.maxArea) : undefined,
  };

  const properties = searchProperties(filters);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                {t('location')}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={filters.location}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter city or area"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                {t('property_type')}
              </label>
              <select
                id="type"
                name="type"
                defaultValue={filters.type}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="house">{tTypes('house')}</option>
                <option value="apartment">{tTypes('apartment')}</option>
                <option value="villa">{tTypes('villa')}</option>
                <option value="project">{tTypes('project')}</option>
                <option value="land">{tTypes('land')}</option>
                <option value="commercial">{tTypes('commercial')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                {t('price_range')}
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minPrice"
                  defaultValue={filters.minPrice}
                  placeholder="Min"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="maxPrice"
                  defaultValue={filters.maxPrice}
                  placeholder="Max"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="area-range" className="block text-sm font-medium text-gray-700 mb-1">
                {t('area_range')}
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minArea"
                  defaultValue={filters.minArea}
                  placeholder="Min m²"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="maxArea"
                  defaultValue={filters.maxArea}
                  placeholder="Max m²"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-end space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t('apply')}
              </button>
              <button
                type="reset"
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {t('reset')}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {t('results')} ({properties.length})
          </h2>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('no_results')}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 