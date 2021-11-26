import React, { useState, useEffect } from 'react'
import Table from '../table';
import { BaseUrl } from '../BaseUrl';
import $ from 'jquery';

export default function Users() {

    const [users, setusers] = useState([])

    async function getAllUsers() {
        let Users = await fetch(BaseUrl + 'users/getAllUsers');
        let allUsers = await Users.json();
        if (allUsers) {
            setusers(allUsers);
            console.log('All users ==>', allUsers);
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

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <>
            <section class="content">
                <div class="block-header">
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
                <div class="container-fluid ">

                    <div class="row clearfix ">
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="card widget_2 big_icon traffic">
                                <div class="body">
                                    <h6>New Users</h6>
                                    <h3>20 <small class="info">of 1Tb</small></h3>
                                    <small>2% higher than last month</small>
                                    <div class="progress">
                                        <div class="progress-bar l-amber" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{ width: "45%" }}></div>                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="card widget_2 big_icon sales">
                                <div class="body">
                                    <h6>Sales</h6>
                                    <h3>12% <small class="info">of 100</small></h3>
                                    <small>6% higher than last month</small>
                                    <div class="progress">
                                        <div class="progress-bar l-blue" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" style={{ width: "38%;" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="card widget_2 big_icon email">
                                <div class="body">
                                    <h6>Email</h6>
                                    <h3>39 <small class="info">of 100</small></h3>
                                    <small>Total Registered email</small>
                                    <div class="progress">
                                        <div class="progress-bar l-purple" role="progressbar" aria-valuenow="39" aria-valuemin="0" aria-valuemax="100" style={{ width: "39%;" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="card widget_2 big_icon domains">
                                <div class="body">
                                    <h6>Total Users</h6>
                                    <h3>8 <small class="info">of 10</small></h3>
                                    <small>Total Registered Domain</small>
                                    <div class="progress">
                                        <div class="progress-bar l-green" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100" style={{ width: "89%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body">
                        <div id="chart-area-spline-sracked" class="c3_chart d_sales"></div>
                    </div>


                    <div class="body_scroll dataTable" >
                        <div class="container-fluid" >
                            <div class="row clearfix">

                                <div class="col-lg-12 ">
                                    <div class="card bikesTable">
                                        <h3 class="card-header text-center ml-5 font-weight-bold text-uppercase py-4"> All Users</h3>

                                        <div class="card-body">
                                            <div id="table" class="table-editable" style={{ overflowX: 'scroll' }}>
                                                <input type="text" placeholder="Search..." className="searchField float-right mb-4 outline" />
                                                <table id="detailTbl" class="table table-bordered table-responsive-md text-center">
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center">Id</th>
                                                            <th class="text-center">FirstName</th>
                                                            <th class="text-center">LaseName</th>
                                                            <th class="text-center">Email</th>
                                                            <th class="text-center">Mobile no</th>
                                                            <th class="text-center">CNIC</th>
                                                            <th class="text-center">PASSPORT</th>
                                                            <th class="text-center">Update/Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users.map(user =>
                                                            <tr>
                                                                <td class="pt-3-half" contenteditable="true">{user.user_id}</td>
                                                                <td class="pt-3-half" contenteditable="true">{user.firstname}</td>
                                                                <td class="pt-3-half" contenteditable="true">{user.lastname}</td>
                                                                <td class="pt-3-half" contenteditable="true">{user.email}</td>
                                                                <td class="pt-3-half" contenteditable="true">{user.mobile_no}</td>
                                                                <td class="pt-3-half" contenteditable="true">{user.cnic}</td>
                                                                <td class="pt-3-half" contenteditable="true">{user.passport}</td>
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

        </>
    )
}
