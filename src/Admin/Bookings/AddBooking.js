import $ from "jquery";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { BaseUrl } from "../BaseUrl";
import AllBookings from "./AllBookings";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";

const AddBooking = () => {
  const [allBookings, setallBookings] = useState(false);
  const [addBooking, setaddBooking] = useState(true);
  const [availableBikes, setavailableBikes] = useState([]);
  const [category, setcategory] = useState("");
  const [user, setUser] = useState(true);

  let userId;
  let adminToken = localStorage.getItem("adminToken");
  let history = useHistory();

  async function selectedCity(e) {
    let city = e.target.value;

    let bikes = await fetch(
      BaseUrl + `admin/bikes/searchbikesincity?city=${city}`
    );
    let allBikes = await bikes.json();

    if (bikes.status === 200) {
      setavailableBikes(allBikes);
      console.log(allBikes);
    } else alert(allBikes.message);
  }

  function selectedCategory(e) {
    setcategory(e.target.value);

    setTimeout(() => {
      console.log(category);
    }, 2000);
  }

  //   function clear() {
  //     $("#form").trigger("reset");
  //   }

  async function submitHandler(e) {
    e.preventDefault();

    let city = document.getElementById("city").value;
    let bikeId = document.getElementById("bike").value;
    let book_from = document.getElementById("book_from").value;
    let book_till = document.getElementById("book_till").value;
    let total = document.getElementById("total").value;
    let payment_status = document.getElementById("payment_status").value;

    let bookedBike = await fetch(BaseUrl + "admin/bookings/addbooking", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        city: city,
        bikeId: bikeId,
        userId: userId,
        book_from: book_from,
        userId: userId,
        book_till: book_till,
        total: total,
        payment_status: payment_status,
      }),
    });

    let result = await bookedBike.json();
    if (bookedBike.status === 200) {
      alert("Booking Added!");
      setaddBooking(!addBooking);
      setallBookings(!allBookings);
    } else if (bookedBike.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(result.message);
  }

  async function verifyUser() {
    let mobile = document.getElementById("mobile").value;
    let verify = await fetch(BaseUrl + `admin/users/verifyuser/${mobile}`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    });
    let result = await verify.json();

    if (verify.status === 200 && result.message === "User verified") {
      document.getElementById("userinfo").innerHTML = "";
      setUser(true);
      userId = result.user;
    } else {
      document.getElementById("userinfo").innerHTML = "User not found";
      setUser(!user);
    }
  }

  function cancelBtn() {
    setaddBooking(!addBooking);
    setallBookings(!allBookings);
  }

  return (
    <React.Fragment>
      {addBooking === true ? (
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
                  <h2 className="font-size-16 mb-1">Add New Booking</h2>
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
                        <Form id="form" onSubmit={(e) => submitHandler(e)}>
                          <Row>
                            <Col md="12">
                              <div className="mb-3">
                                <Label className="control-label">City</Label>
                                <select
                                  id="city"
                                  className="form-control"
                                  onChange={(e) => selectedCity(e)}
                                >
                                  <option>Select</option>
                                  <option>Chakwal</option>
                                  <option>Rawalpindi</option>
                                  <option>Islamabad</option>
                                  <option>Karachi</option>
                                  <option>Peshawar</option>
                                  <option>Lahore</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label className="control-label">
                                  Category
                                </Label>
                                <select
                                  className="form-control"
                                  onChange={(e) => selectedCategory(e)}
                                >
                                  <option>Select</option>
                                  <option>70cc</option>
                                  <option>100cc</option>
                                  <option>125cc</option>
                                  <option>150cc</option>
                                  <option>200cc</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="manufacturername">Bike</Label>
                                <select className="form-control">
                                  <option>Select</option>
                                  {availableBikes &&
                                    availableBikes.length > 0 &&
                                    category !== "" &&
                                    availableBikes.map((bikes) => (
                                      <>
                                        {bikes.category === category ? (
                                          <option
                                            id="bike"
                                            value={bikes.bike_id}
                                          >
                                            {bikes.company + " " + bikes.model}
                                          </option>
                                        ) : null}
                                      </>
                                    ))}
                                </select>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col md="6">
                              <div className="mb-3">
                                <Label className="control-label">
                                  Book From
                                </Label>
                                <Input
                                  type="date"
                                  id="book_from"
                                  className="form-control"
                                />
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="mb-3">
                                <Label className="control-label">
                                  Book Till
                                </Label>
                                <Input
                                  id="book_till"
                                  type="date"
                                  className="form-control"
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col md="6">
                              <div className="mb-3">
                                <Label className="control-label">
                                  Phone No
                                </Label>
                                <input
                                  onBlur={() => verifyUser()}
                                  id="mobile"
                                  placeholder="User Mobile..."
                                  type="text"
                                  className="form-control"
                                />
                                <p
                                  style={{ color: "red", padding: "10px" }}
                                  id="userinfo"
                                ></p>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="mb-3">
                                <Label className="control-label">Total</Label>
                                <input
                                  id="total"
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
                                <Label className="control-label">
                                  Payment Status
                                </Label>
                                <input
                                  type="text"
                                  id="payment_status"
                                  placeholder="Payment Status"
                                  className="form-control"
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

                          <div className="confirmBtns mt-5">
                            <Button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => cancelBtn()}
                            >
                              {" "}
                              <i className="zmdi zmdi-close"></i> Cancel{" "}
                            </Button>
                            {user === true ? (
                              <button
                                type="submit"
                                className="btn btn-success buttons"
                              >
                                {" "}
                                <i className="zmdi zmdi-assignment"></i>{" "}
                                AddBooking{" "}
                              </button>
                            ) : (
                              <Button
                                type="button"
                                className="btn btn-secondary disabled"
                                style={{ cursor: "not-allowed" }}
                              >
                                {" "}
                                <i className="zmdi zmdi-close"></i> AddBooking{" "}
                              </Button>
                            )}
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
      ) : (
        <AllBookings />
      )}
    </React.Fragment>
  );
};

export default AddBooking;
