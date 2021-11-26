
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Col,
    Container,
    Form,
    Input,
    Label,
    Row,
    Collapse
} from "reactstrap";


const AddUser = () => {

    const [selectedFiles, setselectedFiles] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    const options = [
        { value: "AK", label: "Alaska" },
        { value: "HI", label: "Hawaii" },
        { value: "CA", label: "California" },
        { value: "NV", label: "Nevada" },
        { value: "OR", label: "Oregon" },
        { value: "WA", label: "Washington" }
    ];

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size)
            })
        );

        setselectedFiles(files);
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

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
                                        <Form>

                                            <Row>

                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="firstname">First Name</Label>
                                                        <input
                                                            id="firstname"
                                                            name="firstname"
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
                                                            name="lastname"
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
                                                            name="username"
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
                                                            name="email"
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
                                                            name="mobile_no"
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
                                                            name="cnic"
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
                                                            type="text"
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
                                                            name="password"
                                                            type="text"
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
                                                            name="password"
                                                            type="text"
                                                            placeholder="Confirm Password"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>



                                        </Form>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row >

                    <div className="confirmBtns">
                        <Link to="#" className="btn btn-danger buttons"> <i className="zmdi zmdi-close"></i> Cancel </Link>
                        <Link to="#" className="btn btn-success buttons"> <i className="zmdi zmdi-assignment"></i> Save </Link>
                    </div>
                </div >
            </section >
        </>
    )
}

export default AddUser;

