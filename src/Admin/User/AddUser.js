import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from '../BaseUrl';
import { Card, Col, Container, Form, Input, Label, Row, } from "reactstrap";
import Users from ".";
const md5 = require('md5');

const AddUser = () => {

    const [allUsers, setallUsers] = useState(false)
    const [addUser, setaddUsers] = useState(true)

    async function submitHandler(e) {

        e.preventDefault();

        let firstname = document.getElementById('firstname').value;
        let lastname = document.getElementById('lastname').value;
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let cnic = document.getElementById('cnic').value;
        let mobile_no = document.getElementById('mobile_no').value;
        let passport = document.getElementById('passport').value;
        let pass = document.getElementById('password').value;

        let password = md5(pass);

        let user = await fetch(BaseUrl + 'users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname, lastname: lastname, username: username
                , email: email, password: password, cnic: cnic, mobile_no: mobile_no, passport: passport
            })
        });

        let newUser = await user.json();

        if (user.status === 200) {
            setaddUsers(!addUser);
            setallUsers(!allUsers);
        }
        else alert(newUser.message);
    }


    return (
        <>
            {
                allUsers === true ?
                    <Users /> :

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
                        <div class="container-fluid ">

                            <Row>
                                <Col lg="12">
                                    <div id="addproduct-accordion" className="custom-accordion mt-1">
                                        <Card>
                                            <div className="p-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-grow-1 overflow-hidden">
                                                        <h5 className="font-size-16 mb-1">Add New User</h5>
                                                        <p className="text-muted text-truncate mb-0">Fill all information below</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 border-top">
                                                <Form onSubmit={(e) => submitHandler(e)}>

                                                    <Row>

                                                        <Col md="6">
                                                            <div className="mb-3">
                                                                <Label htmlFor="firstname">First Name</Label>
                                                                <input
                                                                    id="firstname"
                                                                    type="text"
                                                                    placeholder="First Name"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="mb-3">
                                                                <Label htmlFor="lastname">Last Name</Label>
                                                                <input
                                                                    id="lastname"
                                                                    type="text"
                                                                    placeholder="Last Name"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>

                                                        <Col md="6">
                                                            <div className="mb-3">
                                                                <Label htmlFor="username">
                                                                    Username
                                                                </Label>
                                                                <input
                                                                    id="username"
                                                                    type="text"
                                                                    placeholder="Username"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="mb-3">
                                                                <Label htmlFor="email">
                                                                    Email
                                                                </Label>
                                                                <input
                                                                    id="email"
                                                                    type="text"
                                                                    placeholder="Email"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col lg="4">
                                                            <div className="mb-3">
                                                                <Label htmlFor="mobile_no">
                                                                    Mobile No
                                                                </Label>
                                                                <Input
                                                                    id="mobile_no"
                                                                    type="text"
                                                                    placeholder="Mobile no"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg="4">
                                                            <div className="mb-3">
                                                                <Label htmlFor="cnic">
                                                                    CNIC
                                                                </Label>
                                                                <Input
                                                                    id="cnic"
                                                                    type="text"
                                                                    placeholder="CNIC"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>

                                                        <Col lg="4">
                                                            <div className="mb-3">
                                                                <Label htmlFor="passport">Passport</Label>
                                                                <Input
                                                                    id="passport"
                                                                    name="passport"
                                                                    placeholder="Passport"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>



                                                    <Row>
                                                        <Col md="12">
                                                            <div className="mb-3">
                                                                <Label className="control-label">Password</Label>
                                                                <input
                                                                    id="password"
                                                                    type="password"
                                                                    placeholder="Password"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <div className="mb-3">
                                                                <Label className="control-label">Confirm Password</Label>
                                                                <input
                                                                    id="password"
                                                                    type="password"
                                                                    placeholder="Confirm Password"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <div className="confirmBtns mt-4">
                                                        <button className="btn btn-danger buttons"> <i className="zmdi zmdi-close"></i> Cancel </button>
                                                        <button type="submit" className="btn btn-success buttons"> <i className="zmdi zmdi-assignment"></i>  Save </button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>
                            </Row >


                        </div >
                    </section >
            }
        </>
    )
}

export default AddUser;

