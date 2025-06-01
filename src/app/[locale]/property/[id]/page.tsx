import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getPropertyById } from '@/data/properties';
import { notFound } from 'next/navigation';

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const t = useTranslations('property');
  const property = getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Property Title and Price */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <p className="text-2xl font-semibold text-blue-600">{formatPrice(property.price)}</p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative h-[400px] md:h-[600px]">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1).map((image, index) => (
              <div key={index} className="relative h-[200px] md:h-[300px]">
                <Image
                  src={image}
                  alt={`${property.title} - Image ${index + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('description')}</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('features')}</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-blue-600 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('property_details')}</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('type')}</span>
                  <span className="font-medium">{t(`types.${property.type}`)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('area')}</span>
                  <span className="font-medium">{property.area}m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('bedrooms')}</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('bathrooms')}</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('location')}</span>
                  <span className="font-medium">{property.location.address}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('contact_agent')}</h2>
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{property.agent.name}</p>
                  <p className="text-sm text-gray-600">{property.agent.email}</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {t('contact_agent')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 