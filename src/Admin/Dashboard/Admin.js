import React from 'react'
import Dashboard from './dashboard'
import Loader from '../Loader';

export default function Admin() {
    return (
        <>
            {/* <Loader /> */}
            <section class="content" style={{ width: 'auto' }}>
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-7 col-md-6 col-sm-12">
                            <h2>Dashboard</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> Aero</a></li>
                                <li class="breadcrumb-item active">Dashboard 1</li>
                            </ul>
                        </div>
                        <div class="col-lg-5 col-md-6 col-sm-12">
                            <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
                <div class="body_scroll" >
                    <div class="row clearfix">
                        <div class="col-lg-12">
                            <Dashboard />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
