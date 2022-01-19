import React, { useState, useEffect } from "react";
import { BaseUrl } from "../BaseUrl";
import $ from "jquery";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import PaginatedItems from "../Pagination";
import { SessionExpiredAlert } from "../Sweetalert";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export default function Users() {
  const [users, setusers] = useState([]);
  const [allUsers, setallUsers] = useState(true);
  const [addUser, setaddUser] = useState(false);
  const [updateUser, setupdateUser] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [length, setlength] = useState();
  const [offset, setoffset] = useState(0);

  const [userData, setuserData] = useState();

  let adminToken = localStorage.getItem("adminToken");
  let history = useHistory();

  function handleOffset(off) {
    setoffset(off);
    getAllUsers(off);
  }

  async function getAllUsers(itemOffset) {
    let itemsPerPage = 8;

    let Users = await fetch(
      BaseUrl + `admin/users/getAllUsers?offset=${itemOffset}`,
      {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    let allUsers = await Users.json();
    setPageCount(Math.ceil(allUsers.count / itemsPerPage));
    setlength(allUsers.count);

    if (Users.status === 200) {
      setusers(allUsers.rows);
    } else if (Users.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(allUsers.message);
  }

  async function addNewUser() {
    setallUsers(!allUsers);
    setaddUser(!addUser);
  }

  async function updateFunction(e) {
    e.preventDefault();

    let userId = e.target.name;
    let firstname = document.getElementById("firstname" + userId).innerHTML;
    let lastname = document.getElementById("lastname" + userId).innerHTML;
    let email = document.getElementById("email" + userId).innerHTML;
    let mobile_no = document.getElementById("mobile_no" + userId).innerHTML;
    let cnic = document.getElementById("cnic" + userId).innerHTML;
    let passport = document.getElementById("passport" + userId).innerHTML;

    let userDetails = [
      userId,
      firstname,
      lastname,
      email,
      mobile_no,
      cnic,
      passport,
    ];
    setuserData(userDetails);
    // setusers(!users);
    setupdateUser(!updateUser);
  }

  async function searchUser(e) {
    e.preventDefault();
    let search = document.getElementById("searchValue").value;
    let searchValue = await fetch(
      BaseUrl + `admin/users/searchByInput?search=${search}`,
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
      setusers(searchedResult);
    }
  }

  async function deleteRecord(e) {
    let userId = e.target.name;
    let deleteUser = await fetch(BaseUrl + `admin/users/deleteuser/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    });
    let deleted = await deleteUser.json();
    if (deleteUser.status === 200 && deleted.message == "Deleted") {
      getAllUsers();
    } else if (deleteUser.status === 440) {
      SessionExpiredAlert();
      localStorage.clear();
      history.push("login");
    } else alert(deleted.message);
  }
  useEffect(() => {
    if (offset === 0) {
      getAllUsers(offset);
    }
  }, []);

  return (
    <>
      {addUser === true ? (
        <AddUser />
      ) : updateUser === true ? (
        <UpdateUser userData={userData} />
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
                  <li class="breadcrumb-item active">Users</li>
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
          <div class="container-fluid ">
            <div class="body">
              <div
                id="chart-area-spline-sracked"
                class="c3_chart d_sales"
              ></div>
            </div>
            <div class="body_scroll dataTable">
              <div class="container-fluid">
                <div class="row clearfix">
                  <div class="col-lg-12 ">
                    <div className="confirmBtns mb-4 ">
                      <button
                        style={{ width: "20%", height: "50px" }}
                        onClick={() => addNewUser()}
                        className="btn btn-info buttons"
                      >
                        {" "}
                        Add New <i className="zmdi zmdi-plus"></i>{" "}
                      </button>
                    </div>
                    <div class="card bikesTable">
                      <h3 class="card-header text-center ml-5 font-weight-bold text-uppercase py-4">
                        {" "}
                        All Users
                      </h3>

                      <div class="card-body">
                        <div
                          id="table"
                          class="table-editable"
                          style={{ overflowX: "scroll" }}
                        >
                          <form onSubmit={(e) => searchUser(e)}>
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
                                <th class="text-center">FirstName</th>
                                <th class="text-center">LaseName</th>
                                <th class="text-center">Email</th>
                                <th class="text-center">Mobile no</th>
                                <th class="text-center">CNIC</th>
                                <th class="text-center">PASSPORT</th>
                                <th class="text-center">Update/Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user) => (
                                <tr key={user.user_uuid}>
                                  <td
                                    id={"firstname" + user.user_uuid}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {user.firstname}
                                  </td>
                                  <td
                                    id={"lastname" + user.user_uuid}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {user.lastname}
                                  </td>
                                  <td
                                    id={"email" + user.user_uuid}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {user.email}
                                  </td>
                                  <td
                                    id={"mobile_no" + user.user_uuid}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {user.mobile}
                                  </td>
                                  <td
                                    id={"cnic" + user.user_uuid}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {user.cnic}
                                  </td>
                                  <td
                                    id={"passport" + user.user_uuid}
                                    class="pt-3-half"
                                    contenteditable="true"
                                  >
                                    {user.passport}
                                  </td>
                                  <td>
                                    <span class="table-remove d-flex">
                                      <button
                                        type="button"
                                        class="btn update btn-rounded btn-sm my-0 outline"
                                        name={user.user_uuid}
                                        onClick={(e) => updateFunction(e)}
                                      >
                                        Update{" "}
                                      </button>
                                      <button
                                        type="button"
                                        class="btn delete btn-rounded btn-sm my-0 outline ml-1"
                                        name={user.user_id}
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
