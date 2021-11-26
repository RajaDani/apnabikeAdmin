import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <aside id="leftsidebar" class="sidebar ">
                <div class="navbar-brand mt-2">
                    <button class="btn ls-toggle-btn" type="button"><i class="zmdi zmdi-menu"></i></button>
                    <a href="" style={{ textDecoration: 'none' }} ><img src="/logo.png" width="50" height="30" alt="Aero" className="ml-2" /><span class="m-l-10">ApnaBike</span></a>
                </div>
                <div class="menu">
                    <ul class="list">
                        <li>
                            <div className="user-info">
                                <a class="image " href="profile.html"><img src="myPhoto.png" alt="User" /></a>
                                <div class="detail">
                                    <h4>Danish</h4>
                                    <small>Super Admin</small>
                                </div>
                            </div>
                        </li>
                        <li><Link to='/admin' href="index.html"><i class="zmdi zmdi-home"></i><span>Dashboard</span></Link></li>
                        <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-bike"></i><span>Bikes</span></a>
                            <ul class="ml-menu">
                                <li><Link to='adminbikes'>All Bikes</Link></li>
                                <li><Link to='adminaddbike'>Add Bike</Link></li>
                            </ul>
                        </li>
                        <li> <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-assignment"></i><span>Manage Bookings</span></a>
                            <ul class="ml-menu">
                                <li><Link to='/adminmanagebookings'>All Bookings</Link></li>
                                <li><Link to='/adminaddbooking'>Add Booking</Link></li>
                            </ul>
                        </li>
                        <li><Link to='/admincalender'><i class="zmdi zmdi-calendar-check"></i><span>Calender</span></Link></li>
                        <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-account"></i><span>Users</span></a>
                            <ul class="ml-menu">
                                <li><Link to='/adminusers'>All Users</Link></li>
                                <li><Link to='/adminadduser'>Add User</Link></li>
                            </ul>
                        </li>

                        <li><Link href="javascript:void(0);"><i class="zmdi zmdi-inbox"></i><span>Chats</span></Link> </li>

                        <li class="open_top"><a href="javascript:void(0);"><i class="zmdi zmdi-map"></i><span>Logout</span></a></li>

                    </ul>
                </div>
            </aside>
        </>
    )
}
