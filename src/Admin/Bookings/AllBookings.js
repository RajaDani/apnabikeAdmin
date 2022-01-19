import React, { useState, useEffect } from "react";
import { BaseUrl } from "../BaseUrl";
import AddBooking from "./AddBooking";
import UpdateBooking from "./UpdateBooking";
import PaginatedItems from "../Pagination";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export default function AllBookings() {
  const [bookings, setbookings] = useState([]);
  const [allBookings, setallBookings] = useState(true);
  const [addBooking, setaddBooking] = useState(false);
  const [updateBooking, setupdateBooking] = useState(false);
  const [bookingData, setbookingData] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [length, setlength] = useState();
  const [offset, setoffset] = useState(0);

  let adminToken = localStorage.getItem("adminToken");
  let history = useHistory();

  function handleOffset(off) {
    setoffset(off);
    getAllBookings(off);
  }

  async function getAllBookings(itemOffset) {
    let itemsPerPage = 8;

    let Bookings = await fetch(
      BaseUrl + `admin/bookings?offset=${itemOffset}`,
      {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    let allBookings = await Bookings.json();
    setPageCount(Math.ceil(allBookings.count / itemsPerPage));
    setlength(allBookings.count);

    if (Bookings.status === 200) {
      setbookings(allBookings.rows);
    } else if (Bookings.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(allBookings.message);
  }

  async function searchBooking(e) {
    e.preventDefault();
    let search = document.getElementById("searchValue").value;
    let searchValue = await fetch(
      BaseUrl + `admin/bookings/searchByInput?search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    let searchedResult = await searchValue.json();
    if (searchValue.status === 200) {
      setbookings(searchedResult);
    }
  }

  function addNewBooking() {
    setallBookings(!allBookings);
    setaddBooking(!addBooking);
  }

  function updateFunction(e) {
    let booked_bikes_id = e.target.name;

    let booked_from = document.getElementById(
      "booked_from" + booked_bikes_id
    ).innerHTML;
    let booked_till = document.getElementById(
      "booked_till" + booked_bikes_id
    ).innerHTML;
    let total = document.getElementById("total" + booked_bikes_id).innerHTML;
    let payment_status = document.getElementById(
      "payment_status" + booked_bikes_id
    ).innerHTML;

    let bookedData = [
      booked_from,
      booked_till,
      total,
      payment_status,
      booked_bikes_id,
    ];

    setbookingData(bookedData);
    setallBookings(!allBookings);
    setupdateBooking(!updateBooking);
  }

  async function deleteRecord(e) {
    let bookingId = e.target.name;
    let deleteBooking = await fetch(
      BaseUrl + `admin/bookings/deletebooking/${bookingId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    let deleted = await deleteBooking.json();
    if (deleteBooking.status === 200 && deleted.message === "Deleted") {
      getAllBookings();
    } else if (deleteBooking.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(deleted.message);
  }

  useEffect(() => {
    if (offset === 0) {
      getAllBookings(offset);
    }
  }, []);

  return (
    <>
      {addBooking === true ? (
        <AddBooking />
      ) : updateBooking === true ? (
        <UpdateBooking bookingData={bookingData} />
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
                <h2>Dashboard</h2>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i class="zmdi zmdi-home"></i> ApnaBike
                    </a>
                  </li>
                  <li class="breadcrumb-item active">Bookings</li>
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
          <div className="confirmBtns mb-2 mt-4 ">
            <button
              style={{ width: "20%", height: "50px" }}
              onClick={() => addNewBooking()}
              className="btn btn-info buttons"
            >
              {" "}
              Add New <i className="zmdi zmdi-plus"></i>{" "}
            </button>
          </div>
          <div class="container-fluid">
            <div class="body_scroll ">
              <div class="container-fluid">
                <div class="row clearfix">
                  <div class="col-lg-12 ">
                    <div class="card bikesTable ">
                      <h3 class="card-header text-center ml-5 font-weight-bold text-uppercase py-4">
                        {" "}
                        All Bookings
                      </h3>

                      <div class="card-body">
                        <div id="table">
                          <form onSubmit={(e) => searchBooking(e)}>
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
                            id="detailTbl"
                            class="table table-bordered table-responsive-md text-center"
                          >
                            <thead>
                              <tr>
                                <th class="text-center">Order No</th>
                                <th class="text-center">Booked From</th>
                                <th class="text-center">Booked Till</th>
                                <th class="text-center">Total</th>
                                <th class="text-center">Payment Status</th>
                                <th class="text-center">Update/Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookings.map((booking) => (
                                <tr
                                  key={booking.booked_bikes_id}
                                  key={booking.booked_bikes_id}
                                >
                                  <td
                                    id={"bikeId" + booking.booked_bikes_id}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {booking.booked_bikes_id}
                                  </td>
                                  <td
                                    id={"booked_from" + booking.booked_bikes_id}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {booking.booked_from}
                                  </td>
                                  <td
                                    id={"booked_till" + booking.booked_bikes_id}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {booking.booked_till}
                                  </td>
                                  <td
                                    id={"total" + booking.booked_bikes_id}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {booking.total_amount}
                                  </td>
                                  <td
                                    id={
                                      "payment_status" + booking.booked_bikes_id
                                    }
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {booking.payment_status}
                                  </td>
                                  <td>
                                    <span class="table-remove d-flex">
                                      <button
                                        type="button"
                                        name={booking.booked_bikes_id}
                                        onClick={(e) => updateFunction(e)}
                                        class="btn update btn-rounded btn-sm my-0 outline"
                                      >
                                        Update{" "}
                                      </button>
                                      <button
                                        type="button"
                                        name={booking.booked_bikes_id}
                                        onClick={(e) => deleteRecord(e)}
                                        class="btn delete btn-rounded btn-sm my-0 outline ml-1"
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

          <PaginatedItems
            pageCount={pageCount}
            itemsPerPage={8}
            length={length}
            handleOffset={handleOffset}
          />
        </section>
      )}
    </>
  );
}
