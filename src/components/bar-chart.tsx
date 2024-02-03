import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { HealthCheckSummary } from '../models/index';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Health check summary',
    },
  },
};



type HealthCheckTableProps = {
    summaries: HealthCheckSummary[]
  }

const addHealthCheck = (key: string , value: number, records: Record<string, number>) => {
    const item = records[key]
    if (item) {
        records[key] = item + value
    }
    else {
        records[key] = value
    }

    return records
}

export default function HeathCheckBarChart({
    summaries,
  }: Readonly<HealthCheckTableProps>) {
    const workingStatusId = 1

    let total: Record<string, number> = {};
    let failed: Record<string, number> = {};

    summaries.forEach((item, _) => {
        total = addHealthCheck(item.label, item.count, total)
        if (item.value !== workingStatusId) {
            failed = addHealthCheck(item.label, item.count, failed)
        }
    })


    let labels: Array<string>  = [];
    let totalCount: Array<number> = []
    let failedCount: Array<number> = []

    Object.entries(total).forEach(([key, value]) => {
        labels.push(key)
        totalCount.push(value)
        if (failed[key]) {
            failedCount.push(failed[key])
        } else {
            failedCount.push(0)
        }
    });
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Total',
          data: totalCount,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Failed',
          data: failedCount,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

  return <Bar options={options} data={data} />;
}
