import React, { useState } from "react";
import AllBikes from "./AllBikes";
import { BaseUrl } from "../BaseUrl";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";

export default function UpdateBike(props) {
  const [updateBike, setupdateBike] = useState(true);
  const [allbikes, setallbikes] = useState(false);
  const [company, setcompany] = useState(props.bikeData[1]);
  const [model, setmodel] = useState(props.bikeData[2]);
  const [category, setcategory] = useState(props.bikeData[3]);
  const [chasis_no, setchasis_no] = useState(props.bikeData[4]);
  const [image, setimage] = useState(props.bikeData[5]);
  const [status, setstatus] = useState(props.bikeData[6]);

  let bikeId = props.bikeData[0];
  let history = useHistory();

  async function submitHandler(e) {
    e.preventDefault();
    let adminToken = localStorage.getItem("adminToken");
    let bikeUpdate = await fetch(BaseUrl + "admin/bikes/updatebike", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        bikeId: bikeId,
        company: company,
        model: model,
        category,
        category,
        chasis_no: chasis_no,
        image: image,
        status: status,
      }),
    });
    let updated = bikeUpdate.json();
    if (bikeUpdate.status === 200 && updated.message === "Updated") {
      alert("Updated");
      setupdateBike(!updateBike);
      setallbikes(!allbikes);
    } else if (bikeUpdate.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(bikeUpdate.message);
  }

  function changeHandler(e) {
    let name = e.target.name;
    switch (name) {
      case "company":
        setcompany(e.target.value);
        break;
      case "model":
        setmodel(e.target.value);
        break;
      case "category":
        setcategory(e.target.value);
        break;
      case "chasis_no":
        setchasis_no(e.target.value);
        break;
      case "status":
        setstatus(e.target.value);
        break;
      case "image":
        let newimage = document.getElementById("image").files[0].name;
        setimage(newimage);
        break;
      default:
        break;
    }
  }

  function cancelBtn() {
    setupdateBike(!updateBike);
    setallbikes(!allbikes);
  }

  return (
    <React.Fragment>
      {allbikes === true ? <AllBikes /> : null}

      {updateBike === true ? (
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
                  <h2 className="font-size-16 mb-1">Update Bike</h2>
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
                            <Label htmlFor="productname">Company Name</Label>
                            <input
                              name="company"
                              value={company}
                              type="text"
                              className="form-control"
                              onChange={(e) => changeHandler(e)}
                            />
                          </div>

                          <div className="mb-3">
                            <Label htmlFor="productname">Category</Label>
                            <input
                              name="category"
                              value={category}
                              type="text"
                              className="form-control"
                              onChange={(e) => changeHandler(e)}
                            />
                          </div>

                          <Row>
                            <Col lg="4">
                              <div className="mb-3">
                                <Label htmlFor="manufacturername">Model</Label>
                                <input
                                  name="model"
                                  type="text"
                                  value={model}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
                                />
                              </div>
                            </Col>
                            <Col lg="4">
                              <div className="mb-3">
                                <Label htmlFor="manufacturerbrand">
                                  Chasis_no
                                </Label>
                                <input
                                  name="chasis_no"
                                  type="text"
                                  value={chasis_no}
                                  className="form-control"
                                  onChange={(e) => changeHandler(e)}
                                />
                              </div>
                            </Col>

                            <Col lg="4">
                              <div className="mb-3">
                                <Label htmlFor="status">Status</Label>
                                <select
                                  onSelect={(e) => changeHandler(e)}
                                  className="form-control"
                                  id="status"
                                >
                                  <option>{status}</option>
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
                                  onSelect={(e) => changeHandler(e)}
                                  type="file"
                                  name="image"
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
