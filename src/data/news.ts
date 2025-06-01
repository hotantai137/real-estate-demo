export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  category: string;
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Vietnam Real Estate Market Shows Strong Growth in 2024',
    content: `
      The Vietnamese real estate market has demonstrated remarkable resilience and growth in the first quarter of 2024. According to recent reports, property prices in major cities like Ho Chi Minh City and Hanoi have increased by an average of 8% compared to the previous year.

      Key factors contributing to this growth include:
      - Strong economic recovery post-pandemic
      - Increased foreign investment
      - Government policies supporting the real estate sector
      - Growing middle class with higher purchasing power

      Experts predict that this positive trend will continue throughout the year, with particular growth expected in the residential and commercial sectors. The market is also seeing increased interest from international investors, particularly in luxury properties and commercial developments.

      However, challenges remain, including:
      - Rising construction costs
      - Regulatory changes
      - Infrastructure development needs
      - Environmental concerns

      Despite these challenges, the overall outlook for Vietnam's real estate market remains positive, with opportunities for both local and international investors.
    `,
    summary: 'The Vietnamese real estate market shows strong growth in 2024, with property prices increasing by 8% in major cities.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    author: {
      name: 'Nguyen Van A',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    publishedAt: '2024-03-15',
    category: 'Market Analysis',
    tags: ['Market Trends', 'Investment', 'Vietnam']
  },
  {
    id: '2',
    title: 'New Luxury Apartment Complex Opens in District 2',
    content: `
      A new luxury apartment complex has opened its doors in District 2, Ho Chi Minh City, offering premium living spaces with modern amenities and stunning city views.

      The development features:
      - 200 luxury apartments
      - Rooftop swimming pool
      - State-of-the-art fitness center
      - 24/7 security
      - Smart home technology
      - Landscaped gardens

      The project has already attracted significant interest from both local and international buyers, with 70% of units sold during the pre-launch phase. The development is part of a larger urban renewal project in District 2, which aims to create a modern, sustainable living environment.

      Prices for the apartments range from $300,000 to $1.5 million, depending on the size and location within the complex. The project is expected to be completed by the end of 2024.
    `,
    summary: 'A new luxury apartment complex opens in District 2, Ho Chi Minh City, featuring modern amenities and premium living spaces.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    author: {
      name: 'Tran Thi B',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    publishedAt: '2024-03-14',
    category: 'New Developments',
    tags: ['Luxury', 'Apartments', 'Ho Chi Minh City']
  },
  // Add more news articles here...
];

export const getLatestNews = () => {
  return [...newsArticles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const getNewsById = (id: string) => {
  return newsArticles.find(article => article.id === id);
};

export const getRelatedNews = (currentId: string, category: string, tags: string[]) => {
  return newsArticles
    .filter(article => article.id !== currentId)
    .filter(article => 
      article.category === category || 
      article.tags.some(tag => tags.includes(tag))
    )
    .slice(0, 3);
}; 