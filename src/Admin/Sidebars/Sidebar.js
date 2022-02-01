import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Sidebar() {
  let admin = localStorage.getItem("adminName");
  let role = localStorage.getItem("role");
  let history = useHistory();

  function logoutFunction() {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <aside id="leftsidebar" className="sidebar">
      <div class="navbar-brand mt-2">
        <button class="btn ls-toggle-btn" type="button">
          <i class="zmdi zmdi-menu"></i>
        </button>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <img
            src="/logo.png"
            width="50"
            height="30"
            alt="Aero"
            className="ml-2"
          />
          <span class="m-l-10">ApnaBike</span>
        </Link>
      </div>
      <div class="menu">
        <ul class="list">
          <li>
            <div className="user-info">
              <a class="image ">
                <img src="myPhoto.png" alt="User" />
              </a>
              <div class="detail">
                <h4>{admin}</h4>
                <small>{role}</small>
              </div>
            </div>
          </li>
          <li>
            <Link to="/admin">
              <i class="zmdi zmdi-home"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="adminbikes">
              <i class="zmdi zmdi-bike"></i>
              <span>Bikes</span>
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/adminmanagebookings">
              <i class="zmdi zmdi-assignment"></i>
              <span>Manage Bookings</span>
            </Link>{" "}
          </li>
          <li>
            <Link to="/admincalender">
              <i class="zmdi zmdi-calendar-check"></i>
              <span>Calender</span>
            </Link>
          </li>
          <li>
            <Link to="/adminusers">
              <i class="zmdi zmdi-account"></i>
              <span>Users</span>
            </Link>
          </li>

          <li>
            <Link to="/chats">
              <i class="zmdi zmdi-inbox"></i>
              <span>Chats</span>
            </Link>{" "}
          </li>
          <li>
            <Link>
              <i class="zmdi zmdi-map"></i>
              <span onClick={() => logoutFunction()}>Logout</span>
            </Link>
          </li>
          {role === "Super Admin" ? (
            <li class="open_top">
              <Link to="/signup">
                <i class="zmdi zmdi-plus"></i>
                <span>Add Admin</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </aside>
  );
}
