import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels);
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import userData from './data/user_1_nutrition_data.json';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graphs: React.FC = () => {
  const dailyData = userData.daily_data;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels = userData.daily_data.map((entry) => {
    const [_, month, day] = entry.date.split('-');
    return `${months[parseInt(month) - 1]} ${parseInt(day)}`;
  });
  
  const colors = {
    total: 'rgb(255, 99, 132)',
    protein: 'rgb(54, 162, 235)',
    carbs: 'rgb(75, 192, 192)',
    fat: 'rgb(255, 205, 86)',
  };

  const startYear = userData.period.start_date.split('-')[0]
  const endYear = userData.period.end_date.split('-')[0];
  const yearPeriod = startYear == endYear? startYear: `${startYear} - ${endYear}`;

  const startMonthIndex = parseInt(userData.period.start_date.split('-')[1])-1;
  const endMonthIndex = parseInt(userData.period.end_date.split('-')[1])-1;

  const startMonth = months[startMonthIndex];
  const endMonth = months[endMonthIndex];

  const monthPeriod = startMonth == endMonth? startMonth: `${startMonth} - ${endMonth}`;

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Fat(g)',
        data: dailyData.map((entry: {macros: {fat: {amount : number};};}) => entry.macros.fat.amount),
        backgroundColor: colors.fat,
      },
      {
        label: 'Protein(g)',
        data: dailyData.map((entry: {macros: {protein: {amount : number};};}) => entry.macros.protein.amount),
        backgroundColor: colors.protein,
      },
      {
        label: 'Carbs(g)',
        data: dailyData.map((entry: {macros: {carbs: {amount : number};};}) => entry.macros.carbs.amount),
        backgroundColor: colors.carbs,
      },
      {
        label: 'Total(g)',
        data: dailyData.map((entry) =>
          entry.macros.protein.amount +
          entry.macros.carbs.amount +
          entry.macros.fat.amount
        ),
        backgroundColor: colors.total,
      },
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Daily Macronutrient Intake',
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Days " + "(" + monthPeriod + " " + yearPeriod + ")",
          font: {
            size: 16,
            weight: 'bold' as const
          },
          padding: {
            top: 20
          }
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Grams",
          font: {
            size: 16,
            weight: 'bold' as const
          },
          padding: {
            top: 10
          }

        },
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Macro Bar Chart!</h1>
      <div style={{width: '100%', height: '80vh' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Graphs;
