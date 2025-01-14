import React, { useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import AddRent from "./AddRent";
import AllBikes from "./AllBikes";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";

const AddBike = () => {
  const [rentComponent, setrentComponent] = useState(false);
  const [addBikeComponent, setaddBikeComponent] = useState(true);
  const [allBikes, setallBikes] = useState(false);
  const [bikeId, setbikeId] = useState("");
  let history = useHistory();

  async function submitHandler(e) {
    e.preventDefault();
    let adminToken = localStorage.getItem("adminToken");

    let company = document.getElementById("company").value;
    let city = document.getElementById("city").value;
    let model = document.getElementById("model").value;
    let chasis_no = document.getElementById("chasis_no").value;
    let status = document.getElementById("status").value;
    let category = document.getElementById("category").value;
    let image = document.getElementById("image").files[0];
    let imageName = document.getElementById("image").files[0].name;

    let formData = new FormData();
    formData.append("image", image);
    formData.append("filename", imageName);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    let bike = await fetch(BaseUrl + "admin/bikes/addbike", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        company: company,
        category: category,
        city: city,
        model: model,
        chasis_no: chasis_no,
        status: status,
        image: imageName,
      }),
    });

    let newBike = await bike.json();

    if (bike.status === 200 && newBike.message == "Bike Added") {
      console.log(newBike);
      console.log("bikeId", newBike.bikesData.bike_id);

      let bikeImg = await fetch(BaseUrl + "admin/bikes/addbike/bikeimage", {
        method: "POST",
        body: formData,
      });

      if (bikeImg.status === 200) {
        setbikeId(newBike.bikesData.bike_id);
        setaddBikeComponent(!addBikeComponent);
        setrentComponent(!rentComponent);
      }
    } else if (bike.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(bike.message);
  }

  function cancelBtn() {
    setaddBikeComponent(!addBikeComponent);
    setallBikes(!allBikes);
  }

  return (
    <React.Fragment>
      {rentComponent === true ? <AddRent bikeId={bikeId} /> : null}
      {allBikes === true ? <AllBikes /> : null}

      {addBikeComponent === true ? (
        <Container fluid>
          <section
            class="content"
            style={{ backgroundColor: "white", marginRight: "15px" }}
          >
            <div
              class="block-header"
              style={{
                backgroundColor: "#f7f7f7",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <div class="row">
                <div class="col-lg-7 col-md-6 col-sm-12">
                  <h2 className="font-size-16 mb-1">Add New Bike</h2>
                  <p className="text-muted text-truncate mt-1 mb-0">
                    Fill all information below
                  </p>
                  <button
                    class="btn btn-primary btn-icon mobile_menu"
                    type="button"
                  >
                    <i class="zmdi zmdi-sort-amount-desc"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="container-fluid ">
              <Row>
                <Col lg="12">
                  <div
                    id="addproduct-accordion"
                    className="custom-accordion mt-1"
                  >
                    <Card>
                      <div className="p-1"></div>
                      <div className="p-4">
                        <Form onSubmit={(e) => submitHandler(e)}>
                          <div className="mb-3">
                            <Label htmlFor="productname">Company Name</Label>
                            <input
                              id="company"
                              placeholder="Company Name"
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <Row>
                            <Col md="6">
                              <div className="mb-3">
                                <Label className="control-label">City</Label>
                                <select className="form-control" id="city">
                                  <option>Select</option>
                                  <option>Chakwal</option>
                                  <option>Rawalpindi</option>
                                  <option>Islamabad</option>
                                  <option>Karachi</option>
                                  <option>Peshawar</option>
                                </select>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="mb-3">
                                <Label htmlFor="category">Category</Label>
                                <select className="form-control" id="category">
                                  <option>Select</option>
                                  <option>70cc</option>
                                  <option>100cc</option>
                                  <option>125cc</option>
                                  <option>150cc</option>
                                  <option>200cc</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="4">
                              <div className="mb-3">
                                <Label htmlFor="manufacturername">Model</Label>
                                <input
                                  id="model"
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
                                  type="text"
                                  placeholder="Chasis No"
                                  className="form-control"
                                />
                              </div>
                            </Col>

                            <Col lg="4">
                              <div className="mb-3">
                                <Label htmlFor="price">Status</Label>
                                <select className="form-control" id="status">
                                  <option>Select</option>
                                  <option>0</option>
                                  <option>1</option>
                                </select>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col md="12">
                              <div className="mb-3">
                                <Label className="control-label">
                                  Select Image
                                </Label>
                                <input
                                  type="file"
                                  id="image"
                                  className="form-control p-1"
                                  accept="image/*"
                                />
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
                          <div className="confirmBtns mt-4">
                            <button
                              className="btn btn-danger buttons"
                              onClick={() => cancelBtn()}
                            >
                              {" "}
                              <i className="zmdi zmdi-close"></i> Cancel{" "}
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success buttons"
                            >
                              {" "}
                              <i className="zmdi zmdi-assignment"></i> Save{" "}
                            </button>
                          </div>
                        </Form>
                      </div>
                    </Card>
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        </Container>
      ) : null}
    </React.Fragment>
  );
};

export default AddBike;
