import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

import userData from '../data/user_1_nutrition_data.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ArcElement);

const Graphs: React.FC = () => {
  const dailyData = userData.daily_data;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const availableDates = dailyData.map((entry) => entry.date);
  const availableDayMonth = availableDates.map(dateStr => {
    const [_, month, day] = dateStr.split('-');
    return { month: parseInt(month), day: parseInt(day), full: dateStr };
  });

  const [start, setStart] = useState<string>(availableDayMonth[0].full);
  const [end, setEnd] = useState<string>(availableDayMonth[availableDayMonth.length - 1].full);
  const [selectedDay, setSelectedDay] = useState<string>(availableDayMonth[0].full);

  const labels = dailyData.map((entry) => {
    const [_, month, day] = entry.date.split('-');
    return `${months[parseInt(month) - 1]} ${parseInt(day)}`;
  });

  const colours = {
    fat: '#AAB7B8',
    protein: '#58D68D',
    carbs: '#5DADE2',
    Total_Label: '#34495E'
  };

  const getFilteredData = () => {
    const startIndex = availableDates.indexOf(start);
    const endIndex = availableDates.indexOf(end);
    return dailyData.slice(startIndex, endIndex + 1);
  };

  const getFilteredLabels = () => {
    const startIndex = availableDates.indexOf(start);
    const endIndex = availableDates.indexOf(end);
    return labels.slice(startIndex, endIndex + 1);
  };

  const filteredData = getFilteredData();
  const filteredLabels = getFilteredLabels();

  const chartData: ChartData<'bar'> = {
    labels: filteredLabels,
    datasets: [
      {
        label: 'Fat(g)',
        data: filteredData.map((entry) => entry.macros.fat.amount),
        backgroundColor: colours.fat,
        stack: 'stack1',
      },
      {
        label: 'Protein(g)',
        data: filteredData.map((entry) => entry.macros.protein.amount),
        backgroundColor: colours.protein,
        stack: 'stack1',
      },
      {
        label: 'Carbs(g)',
        data: filteredData.map((entry) => entry.macros.carbs.amount),
        backgroundColor: colours.carbs,
        stack: 'stack1',
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Macros Breakdown',
        font: { size: 16, weight: 'bold' },
        padding: { top: 0, bottom: 10 },
      },
      datalabels: {
        display: (context) => {
          const dataset = context.chart.data.datasets[context.datasetIndex];
          return dataset.label == 'Carbs(g)';
        },
        anchor: 'end',
        align: 'end',
        backgroundColor: colours.Total_Label,
        borderRadius: 4,
        color: 'white',
        padding: { left: 6, right: 6, top: 2, bottom: 2 },
        font: { weight: 'bold', size: 10 },
        formatter: (_, context) => {
          const total = context.chart.data.datasets
            .filter(d => ['Fat(g)', 'Protein(g)', 'Carbs(g)'].includes(d.label!))
            .map(d => d.data[context.dataIndex] as number)
            .reduce((sum, val) => sum + val, 0);
          return `${total}g`;
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: 'Grams', font: { size: 14, weight: 'bold' } },
        grace: '2%'
      },
      y: {
        stacked: true,
        title: { display: true, text: 'Days', font: { size: 14, weight: 'bold' } },
      },
    },
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Macro Distribution',
        font: { size: 16, weight: 'bold' },
        padding: { top: 0, bottom: 10 },
      },
      legend: {
        position: 'top',
      },
      datalabels: {
        display: (context) => {
          const value = context.dataset.data[context.dataIndex] as number; 
          return value > 0; // Only show label if slice value > 0
        },
        color: 'black',
        font: { weight: 'bold', size: 12 },
        formatter: (value) => `${value}g`,
      },
    },
  };
  

  const selectedEntry = dailyData.find((entry) => entry.date === selectedDay);
  let totalMacros = 0;
  if (selectedEntry) {
    totalMacros = selectedEntry.macros.fat.amount + selectedEntry.macros.protein.amount + selectedEntry.macros.carbs.amount;
  }

  const pieData: ChartData<'pie'> = {
    labels: ['Fat', 'Protein', 'Carbs', `Total(g): ${totalMacros}`], // 
    datasets: [
      {
        label: 'Macros (g)',
        data: selectedEntry ? [
          selectedEntry.macros.fat.amount,
          selectedEntry.macros.protein.amount,
          selectedEntry.macros.carbs.amount,
          0, // <-- Fake 0 value for Total
        ] : [0, 0, 0, 0],
        backgroundColor: [
          colours.fat,
          colours.protein,
          colours.carbs,
          colours.Total_Label,
        ],
      },
    ],
  };
  
  return (
    <div style={{
      backgroundColor: '#1E1E1E',
      width: '100%',
      minHeight: '100vh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0 0 20px 0',
        padding: 0,
        color: '#E0E0E0',
      }}>Macro Nutrient Graphs</h1>

      {/* Date selection controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          backgroundColor: '#34495E',
          padding: '12px',
          borderRadius: '8px',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}>
          <div>
            <label htmlFor="start" style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Start Date:</label>
            <select
              id="start"
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              value={start}
              onChange={(e) => setStart(e.target.value)}>
              {availableDayMonth.map((item) => (
                <option key={item.full} value={item.full}>{months[item.month - 1]} {item.day}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="end" style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>End Date:</label>
            <select
              id="end"
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              value={end}
              onChange={(e) => setEnd(e.target.value)}>
              {availableDayMonth.map((item) => (
                <option key={item.full} value={item.full}>{months[item.month - 1]} {item.day}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="day" style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>View Day:</label>
            <select
              id="day"
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}>
              {availableDayMonth.map((item) => (
                <option key={item.full} value={item.full}>{months[item.month - 1]} {item.day}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Charts container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
      }}>
        <div style={{
          flex: 1,
          backgroundColor: '#D6E4F0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          padding: '15px',
          minHeight: '400px',
        }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div style={{
          flex: 1,
          backgroundColor: '#D6E4F0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          padding: '15px',
          minHeight: '400px',
        }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;