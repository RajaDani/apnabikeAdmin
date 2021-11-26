import React from 'react'
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Admin from '../Admin/Dashboard/Admin';
import BikesAdmin from '../Admin/Bikes';
import Sidebar from './Sidebars/Sidebar';
import Users from '../Admin/User';
import AddBike from '../Admin/Bikes/AddBike';
import AddUser from '../Admin/User/AddUser';
import ManageBookings from '../Admin/Bookings';
import AddBooking from '../Admin/Bookings/AddBooking';
import Calender from './Calender/calender';
// import './Dashboard/sidebarStyle.scss';
import RightSidebar from './Sidebars/RightSidebar';
import Login from './Login';

export default function AllRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/'>
                    <Sidebar />
                    <RightSidebar />
                    <Admin />
                </Route>
                <Route exact path='/admin'>
                    <Sidebar />
                    <RightSidebar />
                    <Admin />
                </Route>
                <Route exact path='/adminbikes'>
                    <Sidebar />
                    <RightSidebar />
                    <BikesAdmin />
                </Route>
                <Route exact path='/adminaddbike'>
                    <Sidebar />
                    <RightSidebar />
                    <AddBike />
                </Route>
                <Route exact path='/adminadduser'>
                    <Sidebar />
                    <RightSidebar />
                    <AddUser />
                </Route>
                <Route exact path='/adminusers'>
                    <Sidebar />
                    <RightSidebar />
                    <Users />
                </Route>
                <Route exact path='/adminmanagebookings'>
                    <Sidebar />
                    <RightSidebar />
                    <ManageBookings />
                </Route>
                <Route exact path='/adminaddbooking'>
                    <Sidebar />
                    <RightSidebar />
                    <AddBooking />
                </Route>
                <Route exact path='/admincalender'>
                    <Sidebar />
                    <RightSidebar />
                    <Calender />
                </Route>
            </Switch>
        </Router>
    )
}
