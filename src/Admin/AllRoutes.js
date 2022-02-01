import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "../Admin/Dashboard/Admin";
import Sidebar from "./Sidebars/Sidebar";
import Users from "../Admin/User";
import AddBike from "../Admin/Bikes/AddBike";
import AddUser from "../Admin/User/AddUser";
import Calender from "./Calender/calender";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import AllBookings from "./Bookings/AllBookings";
import AllBikes from "./Bikes/AllBikes";
import Chats from "./chats";
import Error404 from "./Error404";
import "./adminStyle.scss";

export default function AllRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Sidebar />
          <Admin />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/admin">
          <Sidebar />
          <Admin />
        </Route>
        <Route exact path="/adminbikes">
          <Sidebar />
          <AllBikes />
        </Route>
        <Route exact path="/adminaddbike">
          <Sidebar />
          <AddBike />
        </Route>
        <Route exact path="/adminadduser">
          <Sidebar />
          <AddUser />
        </Route>
        <Route exact path="/adminusers">
          <Sidebar />
          <Users />
        </Route>
        <Route exact path="/adminmanagebookings">
          <Sidebar />
          <AllBookings />
        </Route>

        <Route exact path="/admincalender">
          <Sidebar />
          <Calender />
        </Route>
        <Route exact path="/chats">
          <Sidebar />
          <Chats />
        </Route>
        <Route exact path="/404">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}
