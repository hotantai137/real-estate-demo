import Image from 'next/image';
import Link from 'next/link';
import { NewsArticle } from '@/data/news';
import { formatDate } from '@/utils/date';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/news/${article.id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-blue-600 font-medium">{article.category}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{formatDate(article.publishedAt)}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{article.summary}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-gray-600">{article.author.name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
} 