import React, { useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Users from ".";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";

export default function UpdateUser(props) {
  const [updateUser, setupdateUser] = useState(true);
  const [allUsers, setallUsers] = useState(false);

  const [userData, setuserData] = useState({
    userId: props.userData[0],
    firstname: props.userData[1],
    lastname: props.userData[2],
    username: props.userData[3],
    email: props.userData[4],
    mobile_no: props.userData[5],
    cnic: props.userData[6],
    passport: props.userData[7],
  });

  let history = useHistory();

  async function submitHandler(e) {
    e.preventDefault();
    let adminToken = localStorage.getItem("adminToken");

    let userUpdate = await fetch(BaseUrl + "admin/users/updateuser", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        userId: userData.userId,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        mobile_no: userData.mobile_no,
        cnic: userData.cnic,
        passport: userData.passport,
      }),
    });

    let updated = userUpdate.json();

    if (userUpdate.status === 200) {
      alert("Updated");
      setupdateUser(!updateUser);
      setallUsers(!allUsers);
    } else if (userUpdate.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(updated.message);
  }

  function changeHandler(e) {
    let name = e.target.name;
    switch (name) {
      case "firstname":
        setuserData({ ...userData, firstname: e.target.value });
        break;
      case "lastname":
        setuserData({ ...userData, lastname: e.target.value });
        break;
      case "username":
        setuserData({ ...userData, username: e.target.value });
        break;
      case "email":
        setuserData({ ...userData, email: e.target.value });
        break;
      case "mobile_no":
        setuserData({ ...userData, mobile_no: e.target.value });
        break;
      case "cnic":
        setuserData({ ...userData, cnic: e.target.value });
        break;
      case "passport":
        setuserData({ ...userData, passport: e.target.value });
        break;
      default:
        break;
    }
  }

  function cancelBtn() {
    setupdateUser(!updateUser);
    setallUsers(!allUsers);
  }

  return (
    <React.Fragment>
      {allUsers === true ? (
        <Users />
      ) : (
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
                  <h2 className="font-size-16 mb-1">Update User</h2>
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
                            <Label htmlFor="productname">Firstname</Label>
                            <input
                              name="firstname"
                              value={userData.firstname}
                              type="text"
                              className="form-control"
                              onChange={(e) => changeHandler(e)}
                            />
                          </div>

                          <div className="mb-3">
                            <Label htmlFor="productname">Lastname</Label>
                            <input
                              name="lastname"
                              value={userData.lastname}
                              type="text"
                              className="form-control"
                              onChange={(e) => changeHandler(e)}
                            />
                          </div>

                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="manufacturername">
                                  Username
                                </Label>
                                <input
                                  name="username"
                                  type="text"
                                  value={userData.username}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="manufacturerbrand">Email</Label>
                                <input
                                  name="email"
                                  type="text"
                                  value={userData.email}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="4">
                              <div className="mb-3">
                                <Label htmlFor="manufacturername">Mobile</Label>
                                <input
                                  name="mobile_no"
                                  type="text"
                                  value={userData.mobile_no}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="4">
                              <div className="mb-3">
                                <Label htmlFor="manufacturerbrand">CNIC</Label>
                                <input
                                  name="cnic"
                                  type="text"
                                  value={userData.cnic}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="4">
                              <div className="mb-3">
                                <Label htmlFor="manufacturerbrand">
                                  Passport
                                </Label>
                                <input
                                  name="passport"
                                  type="text"
                                  value={userData.passport}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
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
      )}
    </React.Fragment>
  );
}
