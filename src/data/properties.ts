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
  {
    id: '3',
    title: 'Cozy House in District 7',
    description: 'A cozy family house with a small garden and modern kitchen.',
    price: 1200000,
    area: 180,
    location: {
      address: '789 Nguyen Thi Thap',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [10.7291, 106.7217]
    },
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    features: ['Garden', 'Garage', 'Balcony'],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1460518451285-97b6aa326961'
    ],
    views: 800,
    createdAt: '2024-03-13',
    agent: {
      name: 'Le Van C',
      phone: '+84 111 222 333',
      email: 'agent3@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167'
    }
  },
  {
    id: '4',
    title: 'Affordable Land in Thu Duc',
    description: 'Land for sale in a developing area, suitable for building a home or investment.',
    price: 400000,
    area: 90,
    location: {
      address: '321 Le Van Viet',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [10.8521, 106.7715]
    },
    type: 'land',
    bedrooms: 0,
    bathrooms: 0,
    features: ['Investment Opportunity'],
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca'
    ],
    views: 600,
    createdAt: '2024-03-12',
    agent: {
      name: 'Pham Thi D',
      phone: '+84 444 555 666',
      email: 'agent4@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'
    }
  },
  {
    id: '5',
    title: 'Commercial Space in District 1',
    description: 'Prime commercial space for rent in the heart of District 1.',
    price: 3000,
    area: 60,
    location: {
      address: '654 Le Loi',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [10.7769, 106.7009]
    },
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 1,
    features: ['Central Location', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd'
    ],
    views: 1200,
    createdAt: '2024-03-11',
    agent: {
      name: 'Nguyen Van E',
      phone: '+84 777 888 999',
      email: 'agent5@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1519340333755-c1aa5571fd46'
    }
  },
  {
    id: '6',
    title: 'Modern Project in District 9',
    description: 'Newly launched project with full amenities and green spaces.',
    price: 2000000,
    area: 250,
    location: {
      address: '987 Nguyen Xien',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [10.8452, 106.7891]
    },
    type: 'project',
    bedrooms: 3,
    bathrooms: 2,
    features: ['Swimming Pool', 'Gym', 'Park'],
    images: [
      'https://images.unsplash.com/photo-1467987506553-8f3916508521'
    ],
    views: 900,
    createdAt: '2024-03-10',
    agent: {
      name: 'Tran Thi F',
      phone: '+84 222 333 444',
      email: 'agent6@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'
    }
  },
  {
    id: '7',
    title: 'Spacious Villa in Binh Thanh',
    description: 'Large villa with garden, pool, and private garage.',
    price: 3200000,
    area: 400,
    location: {
      address: '159 Dien Bien Phu',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [10.8039, 106.7077]
    },
    type: 'villa',
    bedrooms: 6,
    bathrooms: 5,
    features: ['Swimming Pool', 'Garden', 'Garage'],
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae'
    ],
    views: 1500,
    createdAt: '2024-03-09',
    agent: {
      name: 'Le Van G',
      phone: '+84 555 666 777',
      email: 'agent7@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308'
    }
  },
  {
    id: '8',
    title: 'Studio Apartment in District 3',
    description: 'Affordable studio apartment, ideal for singles or students.',
    price: 350000,
    area: 35,
    location: {
      address: '753 Cach Mang Thang 8',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [10.7842, 106.6848]
    },
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    features: ['Elevator', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c'
    ],
    views: 400,
    createdAt: '2024-03-08',
    agent: {
      name: 'Pham Thi H',
      phone: '+84 888 999 000',
      email: 'agent8@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    }
  },
  {
    id: '9',
    title: 'Land for Sale in Cu Chi',
    description: 'Large plot of land suitable for farming or development.',
    price: 600000,
    area: 500,
    location: {
      address: '111 Provincial Road 8',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [11.0069, 106.4933]
    },
    type: 'land',
    bedrooms: 0,
    bathrooms: 0,
    features: ['Large Area'],
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99'
    ],
    views: 300,
    createdAt: '2024-03-07',
    agent: {
      name: 'Nguyen Van I',
      phone: '+84 333 444 555',
      email: 'agent9@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308'
    }
  },
  {
    id: '10',
    title: 'Office for Rent in District 10',
    description: 'Modern office space with full facilities, ready to move in.',
    price: 5000,
    area: 80,
    location: {
      address: '222 Ba Thang Hai',
      city: 'Ho Chi Minh City',
      province: 'Ho Chi Minh',
      coordinates: [10.7726, 106.6679]
    },
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    features: ['Meeting Room', 'Parking', 'Reception'],
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca'
    ],
    views: 1100,
    createdAt: '2024-03-06',
    agent: {
      name: 'Tran Thi J',
      phone: '+84 666 777 888',
      email: 'agent10@realestate.com',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'
    }
  },
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
  const property = properties.find(property => property.id === id);
  return property; // Make it a real async "thenable"
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