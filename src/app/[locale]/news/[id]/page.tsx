import { useTranslations } from 'next-intl'; 
import Image from 'next/image';
import Link from 'next/link';
import { getNewsById, getRelatedNews } from '@/data/news';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function NewsDetailPage({ params }: Props) {
  const t = useTranslations('news');
  const { id } = use(params);
  const article = getNewsById(id);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedNews(article.id, article.category, article.tags);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-600">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900">{article.author.name}</p>
              <p className="text-sm">
                {t('published')} {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[400px] md:h-[600px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="prose max-w-none">
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Tags */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/news/${relatedArticle.id}`}
                    className="block group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(relatedArticle.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 