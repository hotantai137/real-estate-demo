export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  location: {
    address: string;
    city: string;
    province: string;
    coordinates: [number, number];
  };
  type: 'house' | 'apartment' | 'villa' | 'project' | 'land' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  features: string[];
  images: string[];
  views: number;
  createdAt: string;
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa in District 2',
    description: 'Beautiful modern villa with panoramic city views, private pool, and smart home features.',
    price: 2500000,
    area: 350,
    location: {
      address: '123 Nguyen Van Huong',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [10.7867, 106.7498]
    },
    type: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    features: ['Swimming Pool', 'Smart Home', 'Garden', 'Security System', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
    ],
    views: 1250,
    createdAt: '2024-03-15',
    agent: {
      name: 'Nguyen Van A',
      phone: '+84 123 456 789',
      email: 'agent@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    }
  },
  {
    id: '2',
    title: 'Modern Apartment in Ba Dinh',
    description: 'Contemporary apartment with high-end finishes and city views in prime location.',
    price: 850000,
    area: 120,
    location: {
      address: '456 Kim Ma',
      city: 'Hanoi',
      province: 'Hanoi',
      coordinates: [21.0285, 105.8048]
    },
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    features: ['Gym', 'Swimming Pool', '24/7 Security', 'Underground Parking'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9'
    ],
    views: 980,
    createdAt: '2024-03-14',
    agent: {
      name: 'Tran Thi B',
      phone: '+84 987 654 321',
      email: 'agent2@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    }
  },
  // Add more properties here...
];

export const getLatestProperties = () => {
  return [...properties].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 6);
};

export const getMostViewedProperties = () => {
  return [...properties].sort((a, b) => b.views - a.views).slice(0, 6);
};

export const getPropertyById = (id: string) => {
  return properties.find(property => property.id === id);
};

export const searchProperties = (filters: {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
}) => {
  return properties.filter(property => {
    if (filters.location && !property.location.city.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.type && property.type !== filters.type) {
      return false;
    }
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }
    if (filters.minArea && property.area < filters.minArea) {
      return false;
    }
    if (filters.maxArea && property.area > filters.maxArea) {
      return false;
    }
    return true;
  });
}; 