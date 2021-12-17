import React, { useEffect, useState } from "react";
import { Card, CardBody, Table, CardTitle, Label, Input, Row, Col, Button } from "reactstrap";
import { BaseUrl } from "../../BaseUrl";


const LatestTransaction = () => {

    const [bookings, setbookings] = useState([])
    let adminToken = localStorage.getItem('adminToken');

    async function getLatestBookings() {
        let bookings = await fetch(BaseUrl + 'admin/dashboard/getLatestTransactions', {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                "Authorization": `Bearer ${adminToken}`
            }
        });
        let result = await bookings.json();

        if (bookings.status === 200) {
            setbookings(result);
        }
        else alert(result.message);
    }


    useEffect(() => {
        getLatestBookings()
    }, [])
    return (
        <Row>
            <Col lg={12}>
                <Card style={{ backgroundColor: 'white' }}>
                    <CardBody>
                        <CardTitle className="h4 mb-4 ml-4">Latest Transaction</CardTitle>
                        <div class="card bikesTable ">

                            <div class="card-body">
                                <div id="table" class="table-editable">
                                    <table id="detailTbl" class="table table-bordered table-responsive-md text-center">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Bike</th>
                                                <th class="text-center">Client</th>
                                                <th class="text-center">Booked From</th>
                                                <th class="text-center">Booked Till</th>
                                                <th class="text-center">Total</th>
                                                <th class="text-center">Payment Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map(booking =>
                                                <tr key={booking.booked_bikes_id}>
                                                    <td id={"bikeId" + booking.booked_bikes_id} class="pt-3-half" contenteditable="true">{booking.bike_id}</td>
                                                    <td id={"userId" + booking.booked_bikes_id} class="pt-3-half" contenteditable="true">{booking.user_id}</td>
                                                    <td id={"booked_from" + booking.booked_bikes_id} class="pt-3-half" contenteditable="true">{booking.booked_from}</td>
                                                    <td id={"booked_till" + booking.booked_bikes_id} class="pt-3-half" contenteditable="true">{booking.booked_till}</td>
                                                    <td id={"total" + booking.booked_bikes_id} class="pt-3-half" contenteditable="true">{booking.total_amount}</td>
                                                    <td id={"payment_status" + booking.booked_bikes_id} class="pt-3-half" contenteditable="true">{booking.payment_status}</td>

                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default LatestTransaction;