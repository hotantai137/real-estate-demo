'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('navigation');
  const authT = useTranslations('auth');
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'vi' : 'en';
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPathname;
  };

  // Helper to avoid double locale in URL
  function localeHref(path: string) {
    if (path.startsWith(`/${locale}/`)) return path;
    if (path === `/${locale}`) return path;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="text-2xl font-bold text-blue-600">
              RealEstate
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href={localeHref('/')} className="text-gray-700 hover:text-blue-600">
              {t('home')}
            </Link>
            <Link href={localeHref('/search')} className="text-gray-700 hover:text-blue-600">
              {t('search')}
            </Link>
            <Link href={localeHref('/news')} className="text-gray-700 hover:text-blue-600">
              {t('news')}
            </Link>
            <Link href={localeHref('/about')} className="text-gray-700 hover:text-blue-600">
              {t('about')}
            </Link>
            <Link href={localeHref('/contact')} className="text-gray-700 hover:text-blue-600">
              {t('contact')}
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href={localeHref('/login')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
              >
                {authT('login')}
              </Link>
              <Link
                href={localeHref('/register')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {authT('register')}
              </Link>
              <button
                onClick={switchLocale}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {locale === 'en' ? 'Tiếng Việt' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 