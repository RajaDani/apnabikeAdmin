import React, { useState, useEffect } from 'react'
import Table from '../table';
import { BaseUrl } from '../BaseUrl';
import $ from 'jquery';
import AddUser from './AddUser';
import BikesAdmin from '../Bikes';

export default function Users() {

    const [users, setusers] = useState([])
    const [allUsers, setallUsers] = useState(true)
    const [addUser, setaddUser] = useState(false)

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

    async function addNewUser() {
        setallUsers(!allUsers);
        setaddUser(!addUser)
    }

    async function updateFunction(e) {
        let userId = e.target.name;
        let firstname = document.getElementById('firstname' + userId).innerHTML;
        let lastname = document.getElementById('lastname' + userId).innerHTML;
        let email = document.getElementById('email' + userId).innerHTML;
        let mobile_no = document.getElementById('mobile_no' + userId).innerHTML;
        let cnic = document.getElementById('cnic' + userId).innerHTML;
        let passport = document.getElementById('passport' + userId).innerHTML;

        let userUpdate = await fetch(BaseUrl + 'users/updateuser', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId, firstname: firstname, lastname: lastname, email: email,
                mobile_no: mobile_no, cnic: cnic, passport: passport
            })
        })
        let updated = userUpdate.json();

        if (userUpdate.status === 200) {
            alert('Updated');
        }
    }

    async function deleteRecord(e) {
        let userId = e.target.name;
        let deleteUser = await fetch(BaseUrl + `users/deleteuser/${userId}`, { method: "DELETE" });
        let deleted = await deleteUser.json();
        if (deleteUser.status === 200 && deleted.message == 'Deleted') {
            getAllUsers()
        }
    }


    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <>
            {addUser === true ?
                <AddUser /> :
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
                                        <div className="confirmBtns mb-4 ">
                                            <button style={{ width: '20%', height: '50px' }} onClick={() => addNewUser()} className="btn btn-info buttons"> Add New  <i className="zmdi zmdi-plus"></i> </button>
                                        </div>
                                        <div class="card bikesTable">
                                            <h3 class="card-header text-center ml-5 font-weight-bold text-uppercase py-4"> All Users</h3>

                                            <div class="card-body">
                                                <div id="table" class="table-editable" style={{ overflowX: 'scroll' }}>
                                                    <input type="text" placeholder="Search..." className="searchField float-right mb-4 outline" />
                                                    <table id="detailTbl" class="table table-bordered table-responsive-md text-center">
                                                        <thead>
                                                            <tr>
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
                                                                <tr key={user.user_id}>
                                                                    <td id={"firstname" + user.user_id} class="pt-3-half" contenteditable="true">{user.firstname}</td>
                                                                    <td id={"lastname" + user.user_id} class="pt-3-half" contenteditable="true">{user.lastname}</td>
                                                                    <td id={"email" + user.user_id} class="pt-3-half" contenteditable="true">{user.email}</td>
                                                                    <td id={"mobile_no" + user.user_id} class="pt-3-half" contenteditable="true">{user.mobile}</td>
                                                                    <td id={"cnic" + user.user_id} class="pt-3-half" contenteditable="true">{user.cnic}</td>
                                                                    <td id={"passport" + user.user_id} class="pt-3-half" contenteditable="true">{user.passport}</td>
                                                                    <td>
                                                                        <span class="table-remove d-flex">
                                                                            <button type="button" class="btn update btn-rounded btn-sm my-0 outline" name={user.user_id} onClick={(e) => updateFunction(e)}>Update </button>
                                                                            <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1" name={user.user_id} onClick={(e) => deleteRecord(e)}>Remove </button>
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