import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Admin from '../Admin/Dashboard/Admin';
import Sidebar from './Sidebars/Sidebar';
import Users from '../Admin/User';
import AddBike from '../Admin/Bikes/AddBike';
import AddUser from '../Admin/User/AddUser';
import Calender from './Calender/calender';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import AllBookings from './Bookings/AllBookings';
import AllBikes from './Bikes/AllBikes';
import Chats from './chats';
import './adminStyle.scss';

export default function AllRoutes() {

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Sidebar />
                    {/* <RightSidebar /> */}
                    <Admin />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/signup'>
                    <Signup />
                </Route>
                <Route exact path='/admin'>
                    <Sidebar />
                    {/* <RightSidebar /> */}
                    <Admin />
                </Route>
                <Route exact path='/adminbikes'>
                    <Sidebar />
                    {/* <RightSidebar /> */}
                    <AllBikes />
                </Route>
                <Route exact path='/adminaddbike'>
                    <Sidebar />
                    {/* <RightSidebar /> */}
                    <AddBike />
                </Route>
                <Route exact path='/adminadduser'>
                    <Sidebar />
                    {/* <RightSidebar /> */}
                    <AddUser />
                </Route>
                <Route exact path='/adminusers'>
                    <Sidebar />
                    <Users />
                </Route>
                <Route exact path='/adminmanagebookings'>
                    <Sidebar />
                    {/* <RightSidebar /> */}
                    <AllBookings />
                </Route>

                <Route exact path='/admincalender'>
                    <Sidebar />
                    {/* <RightSidebar /> */}
                    <Calender />
                </Route>
                <Route exact path='/chats'>
                    <Sidebar />
                    <Chats />
                </Route>

            </Switch>
        </Router>
    )
}
