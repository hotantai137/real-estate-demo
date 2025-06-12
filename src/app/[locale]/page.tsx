import { useTranslations } from 'next-intl';
import PropertyCard from '@/components/property/PropertyCard';
import { getLatestProperties, getMostViewedProperties } from '@/data/properties';
import { getLatestNews } from '@/data/news';
import NewsCard from '@/components/news/NewsCard';
import Statistics from '@/components/statistics/Statistics';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import MapWrapper from '@/components/MapWrapper';
import VietNamMapSVG from '@/components/VietNamMapSVG';

export default function Home() {
  const t = useTranslations('navigation');
  const newsT = useTranslations('news');
  const statsT = useTranslations('statistics');
  const latestProperties = getLatestProperties();
  const mostViewedProperties = getMostViewedProperties();
  const latestNews = getLatestNews().slice(0, 3); // Get only 3 latest news articles

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="relative  h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/can-ho-the-gio-riverside-2-1024x576-1.webp')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full">
            <div className="text-white mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                Muốn tìm nhà đến goodNha
              </h1>
            </div>
            {/* Search Bar */}
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Viet Nam Map */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#11506d] mb-8">Viet Nam Map</h2>
        <MapWrapper />
      </div> */}

      {/* <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Bản đồ Việt Nam</h1>
        <VietNamMapSVG isShowProvinceList={true} />
      </div> */}

      {/* Latest Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-[#11506d] mb-8 flex items-center">
        <span className="flex items-center mr-2" style={{height: '1em'}}>
          <span className="block text-[#44b5bb]" style={{fontSize: '1.2em', lineHeight: '1'}}>│</span>
        </span>
        {t('latest')}
      </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Most Viewed Properties Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#11506d] mb-8 flex items-center">
        <span className="flex items-center mr-2" style={{height: '1em'}}>
          <span className="block text-[#44b5bb]" style={{fontSize: '1.2em', lineHeight: '1'}}>│</span>
        </span>
        {t('popular')}
      </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mostViewedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-[#11506d] mb-8 flex items-center">
        <span className="flex items-center mr-2" style={{height: '1em'}}>
          <span className="block text-[#44b5bb]" style={{fontSize: '1.2em', lineHeight: '1'}}>│</span>
        </span>
        {statsT('title')}
      </h2>
        <Statistics />
      </section>

      {/* News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#11506d]">{newsT('title')}</h2>
          <Link href="/news" className="text-blue-600 hover:text-blue-700 font-medium">
            {newsT('view_all')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#11506d] mb-2">Wide Range of Properties</h3>
            <p className="text-gray-600">Find your perfect home from our extensive collection of properties</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#11506d] mb-2">Best Price Guarantee</h3>
            <p className="text-gray-600">Get the best deals and competitive prices for your dream property</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#11506d] mb-2">Trusted Service</h3>
            <p className="text-gray-600">Professional and reliable service from our experienced team</p>
          </div>
        </div>
      </section>
    </main>
  );
}