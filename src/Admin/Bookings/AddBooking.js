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
} from "reactstrap";

const AddBooking = () => {
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
        <React.Fragment>
            <Container fluid>
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
                                                    <h5 className="font-size-16 mb-1">Add New Booking</h5>
                                                    <p className="text-muted text-truncate mb-0">Fill all information below</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 border-top">
                                            <Form>

                                                <Row>
                                                    <Col md="12">
                                                        <div className="mb-3">
                                                            <Label className="control-label">Category</Label>
                                                            <select className="form-control">
                                                                <option>Select</option>
                                                                <option value="AK">70cc Bikes</option>
                                                                <option value="HI">100cc Bikes</option>
                                                                <option value="HI">125cc Bikes</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>

                                                    <Col lg="6">
                                                        <div className="mb-3">
                                                            <Label htmlFor="manufacturername">
                                                                Bike
                                                            </Label>
                                                            <select className="form-control">
                                                                <option>Select</option>
                                                                <option value="AK">0</option>
                                                                <option value="HI">1</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col lg="6">
                                                        <div className="mb-3">
                                                            <Label htmlFor="price">Phone no</Label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Phone no..."
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>



                                                <Row>
                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label className="control-label">Book From</Label>
                                                            <Input
                                                                type="date"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label className="control-label">Book Till</Label>
                                                            <Input
                                                                type="date"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md="4">
                                                        <div className="mb-3">
                                                            <Label className="control-label">Total</Label>
                                                            <input
                                                                placeholder="Total..."
                                                                type="text"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md="12">
                                                        <div className="mb-3">
                                                            <Label className="control-label">Payment Status</Label>
                                                            <input type="text" placeholder="Payment Status" className="form-control" accept="image/*" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12">
                                                        <div className="mb-3">
                                                            <Label className="control-label">Remarks</Label>
                                                            <input type="text" placeholder="Remarks" className="form-control" accept="image/*" />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <div className="mb-0">
                                                    <Label htmlFor="productdesc">
                                                        Product Description
                                                    </Label>
                                                    <textarea
                                                        className="form-control"
                                                        id="productdesc"
                                                        rows="4"
                                                    />
                                                </div>



                                            </Form>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </Row>

                        <div className="confirmBtns">
                            <Link to="#" className="btn btn-danger buttons"> <i className="zmdi zmdi-close"></i> Cancel </Link>
                            <Link to="#" className="btn btn-success buttons"> <i className="zmdi zmdi-assignment"></i> Save </Link>
                        </div>
                    </div>
                </section >
            </Container >
        </React.Fragment >
    );
};

export default AddBooking;
