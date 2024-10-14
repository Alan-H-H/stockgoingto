import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Flex } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

// Register the necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const StockPieChart = () => {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ['Alcista', 'Bajista', 'Indecision', 'No Operable'],
    datasets: [{
      label: 'porcentaje',
      data: [0, 0, 0, 0], // Default values
      backgroundColor: ['#11DF1B', '#FF0000', '#ECDB08', 'black'], // Colors for each category
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocksCollection = collection(db, "stocks");
        const querySnapshot = await getDocs(stocksCollection);
        const stocksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStocks(stocksList);
      } catch (err) {
        console.error("Error fetching stocks from Firestore:", err);
        setStocks([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (stocks.length > 0) {
      let alcistaCount = 0;
      let bajistaCount = 0;
      let indecisionCount = 0;
      let nooperableCount = 0;

      stocks.forEach(stock => {
        if (stock.tendencia === 'Alcista') alcistaCount++;
        else if (stock.tendencia === 'Bajista') bajistaCount++;
        else if (stock.tendencia === 'Indecision') indecisionCount++;
        else if (stock.tendencia === 'No Operable') nooperableCount++;
      });

      const total = alcistaCount + bajistaCount + indecisionCount + nooperableCount;
      const alcistaPercent = (alcistaCount / total) * 100;
      const bajistaPercent = (bajistaCount / total) * 100;
      const indecisionPercent = (indecisionCount / total) * 100;
      const nooperablePercent = (nooperableCount / total) * 100;

      setChartData({
        labels: ['Alcista', 'Bajista', 'Indecision', 'No Operable'],
        datasets: [{
          label: 'porcentaje',
          data: [alcistaPercent, bajistaPercent, indecisionPercent, nooperablePercent],
          backgroundColor: ['#11DF1B', '#FF0000', '#ECDB08', 'black'],
        }]
      });
    }
  }, [stocks]);

  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      }
    }
  };

  return (
    <Flex direction="column" align="center">
      <Pie data={chartData} options={options} />
    </Flex>
  );
};

export default StockPieChart;

