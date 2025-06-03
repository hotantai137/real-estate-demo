'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { priceData, propertyCountData } from '@/data/statistics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function Statistics() {
  const t = useTranslations('statistics');

  const priceChartData: ChartData<'line'> = {
    labels: priceData.map(data => data.year.toString()),
    datasets: [
      {
        label: t('average_price'),
        data: priceData.map(data => data.averagePrice),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: t('minimum_price'),
        data: priceData.map(data => data.minPrice),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: t('maximum_price'),
        data: priceData.map(data => data.maxPrice),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const propertyCountChartData: ChartData<'bar'> = {
    labels: propertyCountData.map(data => data.year.toString()),
    datasets: [
      {
        label: t('residential'),
        data: propertyCountData.map(data => data.residential),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: t('commercial'),
        data: propertyCountData.map(data => data.commercial),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: t('land'),
        data: propertyCountData.map(data => data.land),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.datasetIndex === 0) {
              label += formatPrice(context.raw);
            } else {
              label += context.raw;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatPrice(value);
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('price_trends')}</h3>
          <Line data={priceChartData} options={options} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('property_count')}</h3>
          <Bar data={propertyCountChartData} options={barOptions} />
        </div>
      </div>
    </div>
  );
} 