import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card } from "reactstrap";
import { BaseUrl } from "../../BaseUrl";

const SalesAnalyticsChart = () => {


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const [salesData, setsalesData] = useState([])
    let adminToken = localStorage.getItem('adminToken');

    async function getChartData() {
        let data = await fetch(BaseUrl + `admin/dashboard`, {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                "Authorization": `Bearer ${adminToken}`
            }
        });
        let chartData = await data.json();

        if (data.status === 200) {
            setsalesData(chartData);
        }
        else alert(chartData.message);
    }

    useEffect(() => {
        getChartData();
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },

        },
    };
    var labels = {} = salesData.map(sale => sale.monthly + '-' + sale.yearly);
    var salesChartData = {} = salesData.map(sale => sale.total);

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales',
                data: salesChartData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],

    };

    return (
        <React.Fragment>
            <Card style={{ backgroundColor: '#ffffff ', height: '420px', padding: '20px' }}>
                <Line options={options} data={data} style={{ height: '400px', marginTop: '30px' }} />
            </Card>

        </React.Fragment>
    );
};

export default SalesAnalyticsChart;