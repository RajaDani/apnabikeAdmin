import React from "react";
import Calendar from "react-awesome-calendar";
import { Link } from "react-router-dom";

export default function Calender() {
  const events = [
    {
      id: 1,
      color: "#fd3153",
      from: "2019-05-02T18:00:00+00:00",
      to: "2019-05-05T19:00:00+00:00",
      title: "This is an event",
    },
    {
      id: 2,
      color: "#1ccb9e",
      from: "2019-05-01T13:00:00+00:00",
      to: "2019-05-05T14:00:00+00:00",
      title: "This is another event",
    },
    {
      id: 3,
      color: "#3694DF",
      from: "2019-05-05T13:00:00+00:00",
      to: "2019-05-05T20:00:00+00:00",
      title: "This is also another event",
    },
  ];

  return (
    <>
      <section class="content page-calendar" style={{ marginRight: "15px" }}>
        <div class="body_scroll">
          <div class="block-header">
            <div class="row">
              <div class="col-lg-7 col-md-6 col-sm-12">
                <h2>Calendar</h2>
                <ul class="breadcrumb">
                  <Link to="/admin" class="breadcrumb-item">
                    <a>
                      <i class="zmdi zmdi-home"></i> ApnaBike
                    </a>
                  </Link>
                  <li class="breadcrumb-item active">Calendar</li>
                </ul>
                <button
                  class="btn btn-primary btn-icon mobile_menu"
                  type="button"
                >
                  <i class="zmdi zmdi-sort-amount-desc"></i>
                </button>
              </div>

              {/* <aside id="rightsidebar" class="right-sidebar">
                <ul class="nav nav-tabs sm">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-toggle="tab"
                      href="#setting"
                    >
                      <i class="zmdi zmdi-settings zmdi-hc-spin"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#chat">
                      <i class="zmdi zmdi-comments"></i>
                    </a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="setting">
                    <div class="slim_scroll">
                      <div class="card">
                        <h6>Theme Option</h6>
                        <div class="light_dark">
                          <div class="radio">
                            <input
                              type="radio"
                              name="radio1"
                              id="lighttheme"
                              value="light"
                              checked=""
                            />
                            <label for="lighttheme">Light Mode</label>
                          </div>
                          <div class="radio mb-0">
                            <input
                              type="radio"
                              name="radio1"
                              id="darktheme"
                              value="dark"
                            />
                            <label for="darktheme">Dark Mode</label>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <h6>Color Skins</h6>
                        <ul class="choose-skin list-unstyled">
                          <li data-theme="purple">
                            <div class="purple"></div>
                          </li>
                          <li data-theme="blue">
                            <div class="blue"></div>
                          </li>
                          <li data-theme="cyan">
                            <div class="cyan"></div>
                          </li>
                          <li data-theme="green">
                            <div class="green"></div>
                          </li>
                          <li data-theme="orange">
                            <div class="orange"></div>
                          </li>
                          <li data-theme="blush" class="active">
                            <div class="blush"></div>
                          </li>
                        </ul>
                      </div>
                      <div class="card">
                        <h6>General Settings</h6>
                        <ul class="setting-list list-unstyled">
                          <li>
                            <div class="checkbox rtl_support">
                              <input
                                id="checkbox1"
                                type="checkbox"
                                value="rtl_view"
                              />
                              <label for="checkbox1">RTL Version</label>
                            </div>
                          </li>
                          <li>
                            <div class="checkbox ms_bar">
                              <input
                                id="checkbox2"
                                type="checkbox"
                                value="mini_active"
                              />
                              <label for="checkbox2">Mini Sidebar</label>
                            </div>
                          </li>
                          <li>
                            <div class="checkbox">
                              <input
                                id="checkbox3"
                                type="checkbox"
                                checked=""
                              />
                              <label for="checkbox3">Notifications</label>
                            </div>
                          </li>
                          <li>
                            <div class="checkbox">
                              <input id="checkbox4" type="checkbox" />
                              <label for="checkbox4">Auto Updates</label>
                            </div>
                          </li>
                          <li>
                            <div class="checkbox">
                              <input
                                id="checkbox5"
                                type="checkbox"
                                checked=""
                              />
                              <label for="checkbox5">Offline</label>
                            </div>
                          </li>
                          <li>
                            <div class="checkbox">
                              <input
                                id="checkbox6"
                                type="checkbox"
                                checked=""
                              />
                              <label for="checkbox6">Location Permission</label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </aside> */}
              {/* </div> */}
            </div>
          </div>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12 col-lg-8 col-xl-8">
                <div class="card">
                  <div class="body">
                    {/* <div id="calendar"></div> */}
                    <Calendar events={events} />
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-4 col-xl-4">
                <div class="card p-3">
                  <div class="event_list">
                    <button
                      type="button"
                      class="btn btn-info btn-block waves-effect"
                      data-toggle="modal"
                      data-target="#addNewEvent"
                    >
                      Add Events
                    </button>
                    <div class="e_list">
                      <h5 class="e_name">
                        11 September{" "}
                        <span class="badge badge-primary float-right">
                          Conference
                        </span>
                      </h5>
                      <address>
                        <i class="zmdi zmdi-pin"></i> 123 6th St.Melbourne, FL
                        32904
                      </address>
                      <p class="e_details">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                    <div class="e_list">
                      <h5 class="e_name">
                        12 November{" "}
                        <span class="badge badge-success float-right">
                          Birthday Party
                        </span>
                      </h5>
                      <address>
                        <i class="zmdi zmdi-pin"></i> 123 6th St.Melbourne, FL
                        32904
                      </address>
                      <p class="e_details">
                        It is a long established fact that a reader will be
                        distracted
                      </p>
                    </div>
                    <div class="e_list">
                      <h5 class="e_name">
                        16 December{" "}
                        <span class="badge badge-danger float-right">
                          Repeating
                        </span>
                      </h5>
                      <address>
                        <i class="zmdi zmdi-pin"></i> 123 6th St.Melbourne, FL
                        32904
                      </address>
                      <p class="e_details">
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        class="modal fade"
        id="addNewEvent"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                <strong>Add</strong> an event
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <label class="control-label">Event Name</label>
                    <input
                      class="form-control"
                      placeholder="Enter name"
                      type="text"
                      name="category-name"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="control-label">Choose Event Color</label>
                    <select
                      class="form-control"
                      data-placeholder="Choose a color..."
                      name="category-color"
                    >
                      <option value="success">Success</option>
                      <option value="danger">Danger</option>
                      <option value="info">Info</option>
                      <option value="primary">Primary</option>
                      <option value="warning">Warning</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success save-event"
                data-dismiss="modal"
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="addDirectEvent" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Direct Event</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Event Name</label>
                    <input class="form-control" name="event-name" type="text" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Event Type</label>
                    <select name="event-bg" class="form-control">
                      <option value="success">Success</option>
                      <option value="danger">Danger</option>
                      <option value="info">Info</option>
                      <option value="primary">Primary</option>
                      <option value="warning">Warning</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn save-btn btn-success">Save</button>
              <button class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="eventEditModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Event</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Event Name</label>
                    <input class="form-control" name="event-name" type="text" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Event Type</label>
                    <select name="event-bg" class="form-control">
                      <option value="success">Success</option>
                      <option value="danger">Danger</option>
                      <option value="info">Info</option>
                      <option value="primary">Primary</option>
                      <option value="warning">Warning</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn mr-auto delete-btn btn-danger">Delete</button>
              <button class="btn save-btn btn-success">Save</button>
              <button class="btn btn-default" data-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
