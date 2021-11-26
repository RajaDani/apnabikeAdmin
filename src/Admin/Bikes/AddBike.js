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

const AddBike = () => {
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
      <Container fluid >
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
                <div id="addproduct-accordion" className="custom-accordion mt-1" >
                  <Card>
                    <div className="p-4">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="font-size-16 mb-1">Add New Bike</h5>
                          <p className="text-muted text-truncate mb-0">Fill all information below</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-top">
                      <Form>
                        <div className="mb-3">
                          <Label htmlFor="productname">Company Name</Label>
                          <input
                            id="productname"
                            name="productname"
                            placeholder="Company Name"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <Row>
                          <Col md="12">
                            <div className="mb-3">
                              <Label className="control-label">Category</Label>
                              <select className="form-control">
                                <option>Select</option>
                                <option value="AK">Chakwal</option>
                                <option value="HI">Rawalpindi</option>
                                <option value="HI">Islamabad</option>
                                <option value="HI">Karachi</option>
                                <option value="HI">Peshawar</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row>

                          <Col lg="4">
                            <div className="mb-3">
                              <Label htmlFor="manufacturername">
                                Model
                              </Label>
                              <input
                                id="model"
                                name="model"
                                type="text"
                                placeholder="Model"
                                className="form-control"
                              />
                            </div>
                          </Col>
                          <Col lg="4">
                            <div className="mb-3">
                              <Label htmlFor="manufacturerbrand">
                                Chasis_no
                              </Label>
                              <input
                                id="chasis_no"
                                name="chasis_no"
                                type="text"
                                placeholder="Chasis No"
                                className="form-control"
                              />
                            </div>
                          </Col>

                          <Col lg="4">
                            <div className="mb-3">
                              <Label htmlFor="price">Status</Label>
                              <select className="form-control">
                                <option>Select</option>
                                <option value="AK">0</option>
                                <option value="HI">1</option>
                              </select>
                            </div>
                          </Col>
                        </Row>



                        <Row>
                          <Col md="4">
                            <div className="mb-3">
                              <Label className="control-label">Daily Rent</Label>
                              <Input
                                id="daily_rent"
                                name="daily_rent"
                                type="text"
                                placeholder="Daily rent"
                                className="form-control"
                              />
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="mb-3">
                              <Label className="control-label">Weekly Rent</Label>
                              <Input
                                id="Weekly_rent"
                                name="Weekly_rent"
                                type="text"
                                placeholder="Weekly rent"
                                className="form-control"
                              />
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="mb-3">
                              <Label className="control-label">Monthly Rent</Label>
                              <Input
                                id="Monthly_rent"
                                name="Monthly_rent"
                                type="text"
                                placeholder="Monthly rent"
                                className="form-control"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="12">
                            <div className="mb-3">
                              <Label className="control-label">Select Image</Label>
                              <input type="file" className="form-control p-1" accept="image/*" />
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

export default AddBike;
