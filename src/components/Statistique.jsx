import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

export default function Statistique({ isDarkMode, city, data }) {
    const { temperature, humidity } = data;

    const firstChartOptions = {
        series: [{
            name: 'Humidity',
            type: 'area',
            data: humidity || [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
        }],
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            }
        },
        title: {
            text: 'Humidity Levels',
            align: 'left'
        },
        xaxis: {
            type: 'category'
        }
    };

    const secondChartOptions = {
        series: [{
            name: 'Temperature',
            type: 'line',
            data: temperature || [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
        }],
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            }
        },
        title: {
            text: 'Temperature Trend',
            align: 'left'
        },
        xaxis: {
            type: 'category'
        }
    };

    useEffect(() => {
        const chartOne = new ApexCharts(document.querySelector("#chart1"), firstChartOptions);
        chartOne.render();

        const chartTwo = new ApexCharts(document.querySelector("#chart2"), secondChartOptions);
        chartTwo.render();

        return () => {
            chartOne.destroy();
            chartTwo.destroy();
        };
    }, [data]); 

    return (
        <div className={`
            ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
            w-full mt-3 p-6 rounded-lg shadow-lg
            flex flex-col space-y-4
            h-full
        `}>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{city}</h2>
            </div>
            <div id="chart1" className="w-full"></div>
            <div id="chart2" className="w-full"></div>
        </div>
    );
}