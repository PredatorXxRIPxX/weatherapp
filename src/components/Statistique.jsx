import React, { useEffect, useState, useMemo } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';

export default function Statistique({ isDarkMode, city, data }) {
    const [staticList, setStaticList] = useState([]);

    const fetchChatData = async (location) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/forecast/${location}`);    
            setStaticList(response.data.list);
            console.log(response.data.list);
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchChatData(city);
        }
    }, [city]);

    // Process temperature and humidity data from staticList
    const processedTemperatures = useMemo(() => 
        staticList.map(item => item.main.temp), 
        [staticList]
    );

    const processedHumidity = useMemo(() => 
        staticList.map(item => item.main.humidity), 
        [staticList]
    );

    const firstChartOptions = useMemo(() => ({
        series: [{
            name: 'Humidity',
            type: 'area',
            data: processedHumidity.length ? processedHumidity : [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
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
            type: 'category',
            categories: staticList.map(item => new Date(item.dt * 1000).toLocaleDateString())
        }
    }), [processedHumidity, staticList]);

    const secondChartOptions = useMemo(() => ({
        series: [{
            name: 'Temperature',
            type: 'line',
            data: processedTemperatures.length ? processedTemperatures : [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
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
            type: 'category',
            categories: staticList.map(item => new Date(item.dt * 1000).toLocaleDateString())
        }
    }), [processedTemperatures, staticList]);

    useEffect(() => {
        const chartOne = new ApexCharts(document.querySelector("#chart1"), firstChartOptions);
        chartOne.render();
        const chartTwo = new ApexCharts(document.querySelector("#chart2"), secondChartOptions);
        chartTwo.render();
        return () => {
            chartOne.destroy();
            chartTwo.destroy();
        };
    }, [firstChartOptions, secondChartOptions]);

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