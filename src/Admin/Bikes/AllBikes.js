import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import $ from "jquery";
import AddBike from "./AddBike";
import UpdateBike from "./updateBike";
import { Button, Modal, ModalBody } from "reactstrap";
import "./imageStyle.scss";
import PaginatedItems from "../Pagination";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";

export default function AllBikes(props) {
  const [allBikesComponent, setallBikesComponent] = useState(true);
  const [updateComponent, setupdateComponent] = useState(false);
  const [addBikeComponent, setaddBikeComponent] = useState(false);

  const [bikes, setbikes] = useState([]);
  const [bikeData, setbikeData] = useState();
  const [imgModal, setimgModal] = useState(false);
  const [imgSrc, setimgSrc] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [length, setlength] = useState();
  const [offset, setoffset] = useState(0);

  let adminToken = localStorage.getItem("adminToken");
  let history = useHistory();

  function handleImageModal(e) {
    setimgModal(!imgModal);
    if (!imgSrc) setimgSrc(e.target.name);
    else setimgSrc("");
  }

  function handleOffset(off) {
    setoffset(off);
    getAllBikes(off);
  }

  useEffect(() => {
    if (offset === 0) {
      getAllBikes(offset);
    }
    if (props.newState === true) {
      setallBikesComponent(true);
    }
  }, []);

  // $(document).ready(function () {
  //   $(".searchField").on("keyup", function () {
  //     var searchTerm = $(this).val().toLowerCase();
  //     $("#detailTable tbody tr").each(function () {
  //       var lineStr = $(this).text().toLowerCase();
  //       if (lineStr.indexOf(searchTerm) === -1) {
  //         $(this).hide();
  //       } else {
  //         $(this).show();
  //       }
  //     });
  //   });
  // });

  function addNewFunction() {
    setallBikesComponent(!allBikesComponent);
    setaddBikeComponent(!addBikeComponent);
  }

  async function searchBike(e) {
    e.preventDefault();
    let search = document.getElementById("searchValue").value;
    let searchValue = await fetch(
      BaseUrl + `admin/bikes/searchByInput?search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    let searchedResult = await searchValue.json();
    console.log("result", searchedResult);
    if (searchValue.status === 200) {
      console.log(searchedResult);
      setbikes(searchedResult);
    }
  }

  async function getAllBikes(itemOffset) {
    let itemsPerPage = 8;

    let Bikes = await fetch(BaseUrl + `admin/bikes?offset=${itemOffset}`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    });

    let allBikes = await Bikes.json();
    setPageCount(Math.ceil(allBikes.length / itemsPerPage));
    setlength(allBikes.length);

    if (Bikes.status === 200) {
      setbikes(allBikes.bike);
    } else if (Bikes.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(allBikes.message);
  }

  function updateFunction(e) {
    let bikeId = e.target.name;
    let company = document.getElementById("company" + bikeId).innerHTML;
    let model = document.getElementById("model" + bikeId).innerHTML;
    let category = document.getElementById("category" + bikeId).innerHTML;
    let chasis_no = document.getElementById("chasis_no" + bikeId).innerHTML;
    let image = document.getElementById("image" + bikeId).innerHTML;
    let status = document.getElementById("status" + bikeId).innerHTML;

    let bikeData = [bikeId, company, model, category, chasis_no, image, status];
    setbikeData(bikeData);

    setupdateComponent(!updateComponent);
    setallBikesComponent(!allBikesComponent);
  }

  async function deleteRecord(e) {
    let bikeId = e.target.name;
    let deleteBike = await fetch(BaseUrl + `admin/bikes/deletebike/${bikeId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    });
    let deleted = await deleteBike.json();
    if (deleteBike.status === 200 && deleted.message == "Deleted") {
      getAllBikes();
    } else if (deleteBike.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(deleted.message);
  }

  return (
    <>
      {addBikeComponent === true ? <AddBike /> : null}
      {updateComponent === true ? <UpdateBike bikeData={bikeData} /> : null}

      {allBikesComponent === true ? (
        <section
          class="content"
          style={{ backgroundColor: "white", marginRight: "15px" }}
        >
          <div
            class="block-header mb-3"
            style={{
              backgroundColor: "#f7f7f7",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <div class="row">
              <div class="col-lg-7 col-md-6 col-sm-12">
                <h2>Dashboard</h2>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i class="zmdi zmdi-home"></i> ApnaBike
                    </a>
                  </li>
                  <li class="breadcrumb-item active">Bikes</li>
                </ul>
                <button
                  class="btn btn-primary btn-icon mobile_menu"
                  type="button"
                >
                  <i class="zmdi zmdi-sort-amount-desc"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="container-fluid">
            <div class="body_scroll ">
              <div class="body">
                <div
                  id="chart-area-spline-sracked"
                  class="c3_chart d_sales"
                ></div>
              </div>

              <div class="body_scroll dataTable">
                <div class="container-fluid">
                  <div class="row clearfix">
                    <div class="col-lg-12 " style={{ marginTop: "-20px" }}>
                      <div className="confirmBtns mb-4 ">
                        <button
                          style={{ width: "20%", height: "50px" }}
                          onClick={() => addNewFunction()}
                          className="btn btn-info buttons"
                        >
                          {" "}
                          Add New <i className="zmdi zmdi-plus"></i>{" "}
                        </button>
                      </div>
                      <div class="card bikesTable">
                        <h3 class="card-header text-center ml-5 font-weight-bold text-uppercase py-4">
                          {" "}
                          All Bikes
                        </h3>

                        <div class="card-body">
                          <div id="datatable">
                            <form onSubmit={(e) => searchBike(e)}>
                              <Button className="float-right" outline>
                                Search
                              </Button>
                              <input
                                type="text"
                                placeholder="Search..."
                                className="searchField float-right mr-2 mb-4 outline"
                                id="searchValue"
                              />
                            </form>
                            <table
                              id="detailTable"
                              class="table table-bordered table-responsive-md text-center"
                            >
                              <thead>
                                <tr>
                                  {/* <th class="text-center">Id</th> */}
                                  <th class="text-center">Company</th>
                                  <th class="text-center">Model</th>
                                  <th class="text-center">Category</th>
                                  <th class="text-center">Chasis_no</th>
                                  <th class="text-center">Image</th>
                                  <th class="text-center">Status</th>
                                  <th class="text-center">Update/Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bikes.map((bike) => (
                                  <tr key={bike.bike_uuid}>
                                    {/* <td class="pt-3-half" contenteditable="true">{bike.bike_id}</td> */}
                                    <td
                                      id={"company" + bike.bike_uuid}
                                      class="pt-3-half"
                                      contenteditable="true"
                                    >
                                      {bike.company}
                                    </td>
                                    <td
                                      id={"model" + bike.bike_uuid}
                                      class="pt-3-half"
                                      contenteditable="true"
                                    >
                                      {bike.model}
                                    </td>
                                    <td
                                      id={"category" + bike.bike_uuid}
                                      class="pt-3-half"
                                      contenteditable="true"
                                    >
                                      {bike.category}
                                    </td>
                                    <td
                                      id={"chasis_no" + bike.bike_uuid}
                                      class="pt-3-half"
                                      contenteditable="true"
                                    >
                                      {bike.chasis_no}
                                    </td>
                                    <td
                                      id={"image" + bike.bike_uuid}
                                      class="pt-3-half"
                                      contenteditable="true"
                                    >
                                      <img
                                        width="50"
                                        height="40"
                                        className="bikeAdminImg"
                                        style={{ borderRadius: "5px" }}
                                        src={BaseUrl + "images/" + bike.image}
                                        name={BaseUrl + "images/" + bike.image}
                                        onClick={(e) => handleImageModal(e)}
                                      ></img>
                                    </td>
                                    <td
                                      id={"status" + bike.bike_uuid}
                                      class="pt-3-half"
                                      contenteditable="true"
                                    >
                                      {bike.status}
                                    </td>
                                    <td>
                                      <span class="table-remove d-flex">
                                        <button
                                          type="button"
                                          class="btn update btn-rounded btn-sm my-0 outline"
                                          name={bike.bike_uuid}
                                          onClick={(e) => updateFunction(e)}
                                        >
                                          Update{" "}
                                        </button>
                                        <button
                                          type="button"
                                          class="btn delete btn-rounded btn-sm my-0 outline ml-1"
                                          name={bike.bike_id}
                                          onClick={(e) => deleteRecord(e)}
                                        >
                                          Remove{" "}
                                        </button>
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <PaginatedItems
              pageCount={pageCount}
              itemsPerPage={8}
              length={length}
              handleOffset={handleOffset}
            />
          </div>

          <Modal className="modal-md" isOpen={imgModal}>
            <span
              class="close p-2"
              style={{
                textAlign: "right",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() => handleImageModal()}
            >
              &times;
            </span>
            <div id="caption">
              <img id="myImg" src={imgSrc}></img>
            </div>
          </Modal>
        </section>
      ) : null}
    </>
  );
}
