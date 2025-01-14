import React from "react";
import Dashboard from "./dashboard";
import { Link } from "react-router-dom";
import "../adminStyle.scss";

export default function Admin() {
  return (
    <>
      <section class="content" style={{ marginRight: "10px" }}>
        <div class="block-header">
          <div class="row">
            <div class="col-lg-7 col-md-6 col-sm-12">
              <h2>Dashboard</h2>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/admin">
                    <i class="zmdi zmdi-home"></i> Apnabike
                  </Link>
                </li>
                <li class="breadcrumb-item active">Dashboard</li>
              </ul>
              <button
                class="btn btn-primary btn-icon mobile_menu"
                type="button"
              >
                <i class="zmdi zmdi-sort-amount-desc"></i>
              </button>
            </div>
            <div class="col-lg-5 col-md-6 col-sm-12">
              {/* <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button> */}
            </div>
          </div>
        </div>
        <div class="body_scroll">
          <div class="row clearfix">
            <div class="col-lg-12">
              <Dashboard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
