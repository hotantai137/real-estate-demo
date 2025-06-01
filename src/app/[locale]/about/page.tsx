import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 h-[300px]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl md:text-2xl">
              Your trusted partner in real estate
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('mission')}</h2>
              <p className="text-lg text-gray-600 mb-4">
                Our mission is to provide exceptional real estate services that help our clients find their dream homes and make sound investment decisions. We are committed to delivering personalized solutions, maintaining the highest standards of professionalism, and building long-lasting relationships with our clients.
              </p>
              <p className="text-lg text-gray-600">
                We believe in transparency, integrity, and putting our clients' needs first. Our team of experienced professionals is dedicated to making your real estate journey smooth and successful.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Our Vision"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('vision')}</h2>
              <p className="text-lg text-gray-600 mb-4">
                Our vision is to be the leading real estate platform in Vietnam, known for our innovative approach, exceptional service, and commitment to excellence. We aim to transform the way people buy, sell, and invest in real estate by leveraging technology and providing personalized solutions.
              </p>
              <p className="text-lg text-gray-600">
                We strive to create a seamless experience for our clients while maintaining the highest standards of professionalism and integrity in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('team')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={`https://images.unsplash.com/photo-${1560518883 + member}`}
                    alt={`Team Member ${member}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Member {member}</h3>
                  <p className="text-gray-600">Position</p>
                  <p className="text-gray-600 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 