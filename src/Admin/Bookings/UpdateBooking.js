import React, { useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import AllBookings from "./AllBookings";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";

export default function UpdateBooking(props) {
  const [updateBooking, setupdateBooking] = useState(true);
  const [allbookings, setallBookings] = useState(false);

  const [booked_from, setbooked_from] = useState(props.bookingData[0]);
  const [booked_till, setbooked_till] = useState(props.bookingData[1]);
  const [total, settotal] = useState(props.bookingData[2]);
  const [payment_status, setpayment_status] = useState(props.bookingData[3]);
  const [booked_bikes_id, setbooked_bikes_id] = useState(props.bookingData[4]);

  let history = useHistory();

  async function submitHandler(e) {
    e.preventDefault();
    let adminToken = localStorage.getItem("adminToken");

    let bookingUpdate = await fetch(BaseUrl + "admin/bookings/updatebooking", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        booked_bikes_id: booked_bikes_id,
        booked_from: booked_from,
        booked_till: booked_till,
        total: total,
        payment_status: payment_status,
      }),
    });
    let updated = bookingUpdate.json();

    if (bookingUpdate.status === 200) {
      alert("Updated");
      setupdateBooking(!updateBooking);
      setallBookings(!allbookings);
    } else if (bookingUpdate.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(updated.message);
  }

  function changeHandler(e) {
    let name = e.target.name;
    switch (name) {
      case "booked_from":
        setbooked_from(e.target.value);
        break;
      case "booked_till":
        setbooked_till(e.target.value);
        break;
      case "total":
        settotal(e.target.value);
        break;
      case "payment_status":
        setpayment_status(e.target.value);
        break;

      default:
        break;
    }
  }

  function cancelBtn() {
    setupdateBooking(!updateBooking);
    setallBookings(!allbookings);
  }

  return (
    <React.Fragment>
      {allbookings === true ? <AllBookings /> : null}

      {updateBooking === true ? (
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
                  <h2 className="font-size-16 mb-1">Update Booking</h2>
                  <p className="text-muted text-truncate mt-1 mb-0">
                    Update information below
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
                            <Label htmlFor="productname">Order No</Label>
                            <input
                              value={booked_bikes_id}
                              type="text"
                              className="form-control"
                            />
                          </div>

                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="manufacturername">
                                  Booked From
                                </Label>
                                <input
                                  name="booked_from"
                                  type="text"
                                  value={booked_from}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="manufacturerbrand">
                                  Booked Till
                                </Label>
                                <input
                                  name="booked_till"
                                  type="text"
                                  value={booked_till}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
                                />
                              </div>
                            </Col>
                          </Row>

                          <div className="mb-3">
                            <Label htmlFor="productname">Total</Label>
                            <input
                              name="total"
                              value={total}
                              type="text"
                              className="form-control"
                              onChange={(e) => changeHandler(e)}
                            />
                          </div>

                          <div className="mb-3">
                            <Label htmlFor="productname">Payment Status</Label>
                            <input
                              name="payment_status"
                              value={payment_status}
                              type="text"
                              className="form-control"
                              onChange={(e) => changeHandler(e)}
                            />
                          </div>

                          {/* <div className="mb-0">
                            <Label htmlFor="productdesc">
                              Product Description
                            </Label>
                            <textarea
                              className="form-control"
                              id="productdesc"
                              rows="4"
                            />
                          </div> */}
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
                              <i className="zmdi zmdi-assignment"></i> Update{" "}
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
}
