import React, { useState, useEffect } from 'react'
import Table from '../table'
import { BaseUrl } from '../BaseUrl';
import $ from 'jquery';

export default function ManageBookings() {

    const [bookings, setbookings] = useState([])

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

    function updateItem() {
        alert('Item Changed');
    }

    useEffect(() => {
        getAllBookings()
    }, [])

    return (
        <>
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
                <div class="container-fluid">
                    <div class="body_scroll " >
                        <div class="container-fluid" >
                            <div class="row clearfix">
                                <div class="col-lg-12 ">
                                    {/* <button className="btn btn-success addNewBtn mb-4" onClick={() => { toggleModal() }}>Add new <i className="zmdi zmdi-plus mt-1"></i> </button> */}

                                    <div class="card bikesTable ">
                                        <h3 class="card-header text-center ml-5 font-weight-bold text-uppercase py-4"> All Bookings</h3>

                                        <div class="card-body">
                                            <div id="table" class="table-editable">
                                                <input type="text" placeholder="Search..." className="searchField float-right mb-4 outline" />

                                                <table id="detailTbl" class="table table-bordered table-responsive-md text-center">
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center">BookingId</th>
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
                                                            <tr>
                                                                <td class="pt-3-half" contenteditable="true" onClick={() => updateItem()}>{booking.booked_bikes_id}</td>
                                                                <td class="pt-3-half" contenteditable="true">{booking.bike_id}</td>
                                                                <td class="pt-3-half" contenteditable="true">{booking.user_id}</td>
                                                                <td class="pt-3-half" contenteditable="true">{booking.booked_from}</td>
                                                                <td class="pt-3-half" contenteditable="true">{booking.booked_till}</td>
                                                                <td class="pt-3-half" contenteditable="true">{booking.total_amount}</td>
                                                                <td class="pt-3-half" contenteditable="true">{booking.payment_status}</td>
                                                                <td>
                                                                    <span class="table-remove d-flex">
                                                                        <button type="button" class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                                                                        <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
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
            {/* 
            <Modal isOpen={isModal} toggle={toggleModal} className="Modal modal-lg">
                <span className="fas fa-times mt-1 " onClick={toggleModal}></span>
                <div className="loginHeader">
                    <i className="fas fa-user fa-2x"></i>
                </div>
                <h2>Sign up</h2>
                <ModalBody>
                    <Form className="pl-4 pr-4 mt-1 ">
                        <FormGroup className="signupFormElement">
                            <Input type="text" placeholder="Username.."></Input>
                        </FormGroup>
                        <FormGroup className="signupFormElement">
                            <Input type="email" placeholder="Email: apnabike@gmail.com"></Input>
                        </FormGroup>
                        <FormGroup className="signupFormElement">
                            <Input type="numbers" placeholder="CNIC : 37201-1021442-9"></Input>
                        </FormGroup>
                        <FormGroup className="signupFormElement">
                            <Input type="email" placeholder="Passport.."></Input>
                        </FormGroup>

                        <FormGroup className="signupFormElement">
                            <Input type="email" placeholder="Create Password.."></Input>
                        </FormGroup>
                        <FormGroup className="signupFormElement">
                            <Input type="email" placeholder="Confirm Password.."></Input>
                        </FormGroup>

                        <Button className="btn btn-info mt-3">Signup</Button>
                    </Form>
                </ModalBody>
            </Modal> */}
        </>
    )
}
