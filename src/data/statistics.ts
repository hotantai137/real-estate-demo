export interface PriceData {
  year: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface PropertyCount {
  year: number;
  total: number;
  residential: number;
  commercial: number;
  land: number;
}

export const priceData: PriceData[] = [
  {
    year: 2020,
    averagePrice: 2500000,
    minPrice: 1500000,
    maxPrice: 4500000
  },
  {
    year: 2021,
    averagePrice: 2800000,
    minPrice: 1700000,
    maxPrice: 5000000
  },
  {
    year: 2022,
    averagePrice: 3200000,
    minPrice: 2000000,
    maxPrice: 5500000
  },
  {
    year: 2023,
    averagePrice: 3500000,
    minPrice: 2200000,
    maxPrice: 6000000
  },
  {
    year: 2024,
    averagePrice: 3800000,
    minPrice: 2500000,
    maxPrice: 6500000
  }
];

export const propertyCountData: PropertyCount[] = [
  {
    year: 2020,
    total: 1200,
    residential: 800,
    commercial: 250,
    land: 150
  },
  {
    year: 2021,
    total: 1500,
    residential: 1000,
    commercial: 300,
    land: 200
  },
  {
    year: 2022,
    total: 1800,
    residential: 1200,
    commercial: 350,
    land: 250
  },
  {
    year: 2023,
    total: 2100,
    residential: 1400,
    commercial: 400,
    land: 300
  },
  {
    year: 2024,
    total: 2400,
    residential: 1600,
    commercial: 450,
    land: 350
  }
]; 