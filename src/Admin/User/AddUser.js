import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Users from ".";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";

const md5 = require("md5");

const AddUser = () => {
  const [allUsers, setallUsers] = useState(false);
  const [addUser, setaddUsers] = useState(true);
  let adminToken = localStorage.getItem("adminToken");
  let history = useHistory();

  async function submitHandler(e) {
    e.preventDefault();

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let cnic = document.getElementById("cnic").value;
    let mobile_no = document.getElementById("mobile_no").value;
    let passport = document.getElementById("passport").value;
    let pass = document.getElementById("password").value;

    let password = md5(pass);

    let user = await fetch(BaseUrl + "admin/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        cnic: cnic,
        mobile_no: mobile_no,
        passport: passport,
      }),
    });

    if (user.status === 200) {
      setaddUsers(!addUser);
      setallUsers(!allUsers);
    } else if (user.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(user.message);
  }

  function cancelBtn() {
    setaddUsers(!addUser);
    setallUsers(!allUsers);
  }

  return (
    <>
      {allUsers === true ? (
        <Users />
      ) : (
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
                <h2 className="font-size-16 mb-1">Add New User</h2>
                <p className="text-muted text-truncate mt-1 mb-0">
                  Fill all information below
                </p>
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
                        <Row>
                          <Col md="6">
                            <div className="mb-3">
                              <Label htmlFor="firstname">First Name</Label>
                              <input
                                id="firstname"
                                type="text"
                                placeholder="First Name"
                                className="form-control"
                                required
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
                                required
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="6">
                            <div className="mb-3">
                              <Label htmlFor="username">Username</Label>
                              <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                className="form-control"
                                required
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="mb-3">
                              <Label htmlFor="email">Email</Label>
                              <input
                                id="email"
                                type="text"
                                placeholder="Email"
                                className="form-control"
                                required
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="4">
                            <div className="mb-3">
                              <Label htmlFor="mobile_no">Mobile No</Label>
                              <Input
                                id="mobile_no"
                                type="number"
                                maxLength={11}
                                placeholder="Mobile no"
                                className="form-control"
                                required
                              />
                            </div>
                          </Col>
                          <Col lg="4">
                            <div className="mb-3">
                              <Label htmlFor="cnic">CNIC</Label>
                              <Input
                                id="cnic"
                                type="number"
                                maxLength={14}
                                placeholder="CNIC"
                                className="form-control"
                                required
                              />
                            </div>
                          </Col>

                          <Col lg="4">
                            <div className="mb-3">
                              <Label htmlFor="passport">Passport</Label>
                              <Input
                                id="passport"
                                name="passport"
                                type="number"
                                maxLength={9}
                                placeholder="Passport"
                                className="form-control"
                                required
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
                                required
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <div className="mb-3">
                              <Label className="control-label">
                                Confirm Password
                              </Label>
                              <input
                                id="password"
                                type="password"
                                placeholder="Confirm Password"
                                className="form-control"
                                required
                              />
                            </div>
                          </Col>
                        </Row>

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
      )}
    </>
  );
};

export default AddUser;
