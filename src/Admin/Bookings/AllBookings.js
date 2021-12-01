import React, { useState, useEffect } from 'react'
import { BaseUrl } from '../BaseUrl';
import $ from 'jquery';
import AddBooking from './AddBooking';

export default function AllBookings() {

    const [bookings, setbookings] = useState([])
    const [allBookings, setallBookings] = useState(true)
    const [addBooking, setaddBooking] = useState(false)

    async function getAllBookings() {
        let Bookings = await fetch(BaseUrl + 'bookings');
        let allBookings = await Bookings.json();
        if (allBookings) {
            setbookings(allBookings);
            console.log('All bookings ==>', allBookings);
        }
    }

    $(document).ready(function () {
        $('.searchField').on('keyup', function () {
            var searchTerm = $(this).val().toLowerCase();
            $('#detailTbl tbody tr').each(function () {
                var lineStr = $(this).text().toLowerCase();
                if (lineStr.indexOf(searchTerm) === -1) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    });

    function addNewBooking() {
        setallBookings(!allBookings);
        setaddBooking(!addBooking);
    }

    async function updateFunction(e) {
        let booked_bikes_id = e.target.name;
        let bikeId = document.getElementById('bikeId' + booked_bikes_id).innerHTML;
        let userId = document.getElementById('userId' + booked_bikes_id).innerHTML;
        let booked_from = document.getElementById('booked_from' + booked_bikes_id).innerHTML;
        let booked_till = document.getElementById('booked_till' + booked_bikes_id).innerHTML;
        let total = document.getElementById('total' + booked_bikes_id).innerHTML;
        let payment_status = document.getElementById('payment_status' + booked_bikes_id).innerHTML;

        let bookingUpdate = await fetch(BaseUrl + 'bookings/updatebooking', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                booked_bikes_id: booked_bikes_id, bikeId: bikeId, userId: userId, booked_from: booked_from, booked_till: booked_till,
                total: total, payment_status: payment_status
            })
        })
        let updated = bookingUpdate.json();

        if (bookingUpdate.status === 200) {
            alert('Updated');
        }
    }

    async function deleteRecord(e) {
        let bookingId = e.target.name;
        let deleteBooking = await fetch(BaseUrl + `bookings/deletebooking/${bookingId}`, { method: "DELETE" });
        let deleted = await deleteBooking.json();
        if (deleteBooking.status === 200 && deleted.message === 'Deleted') {
            getAllBookings()
        }
    }

    useEffect(() => {
        getAllBookings()
    }, [])

    return (
        <>
            {
                addBooking === true ?
                    <AddBooking /> :

                    <section class="content" style={{ backgroundColor: 'white' }}>
                        <div class="block-header" style={{ backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '5px' }}>
                            <div class="row">
                                <div class="col-lg-7 col-md-6 col-sm-12">
                                    <h2>Dashboard</h2>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> Aero</a></li>
                                        <li class="breadcrumb-item active">Dashboard 1</li>
                                    </ul>
                                </div>
                                <div class="col-lg-5 col-md-6 col-sm-12">
                                    <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="confirmBtns mb-2 mt-4 ">
                            <button style={{ width: '20%', height: '50px' }} onClick={() => addNewBooking()} className="btn btn-info buttons"> Add New  <i className="zmdi zmdi-plus"></i> </button>
                        </div>
                        <div class="container-fluid">
                            <div class="body_scroll " >
                                <div class="container-fluid" >
                                    <div class="row clearfix">
                                        <div class="col-lg-12 ">

                                            <div class="card bikesTable ">
                                                <h3 class="card-header text-center ml-5 font-weight-bold text-uppercase py-4"> All Bookings</h3>

                                                <div class="card-body">
                                                    <div id="table" class="table-editable">
                                                        <input type="text" placeholder="Search..." className="searchField float-right mb-4 outline" />

                                                        <table id="detailTbl" class="table table-bordered table-responsive-md text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-center">Bike</th>
                                                                    <th class="text-center">Client</th>
                                                                    <th class="text-center">Booked From</th>
                                                                    <th class="text-center">Booked Till</th>
                                                                    <th class="text-center">Total</th>
                                                                    <th class="text-center">Payment Status</th>
                                                                    <th class="text-center">Update/Delete</th>
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
                                                                        <td>
                                                                            <span class="table-remove d-flex">
                                                                                <button type="button" name={booking.booked_bikes_id} onClick={(e) => updateFunction(e)} class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                                                                                <button type="button" name={booking.booked_bikes_id} onClick={(e) => deleteRecord(e)} class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }

        </>
    )

}
