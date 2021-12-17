import React from "react"
import { Card, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Progress } from "reactstrap"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TopProduct = (props) => {

    const data = {
        labels: ['Bikes', 'Orders', 'Customers'],
        datasets: [
            {
                label: 'Bikes',
                data: [props.bikes, props.orders, props.users],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <React.Fragment>
            <Pie data={data} style={{ marginTop: '30px', padding: '5px' }} />
        </React.Fragment>
    )
}

export default TopProduct