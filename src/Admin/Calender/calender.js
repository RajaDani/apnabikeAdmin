import React from 'react'
import Calendar from 'react-awesome-calendar';

export default function Calender() {

    const events = [{
        id: 1,
        color: '#fd3153',
        from: '2019-05-02T18:00:00+00:00',
        to: '2019-05-05T19:00:00+00:00',
        title: 'This is an event'
    }, {
        id: 2,
        color: '#1ccb9e',
        from: '2019-05-01T13:00:00+00:00',
        to: '2019-05-05T14:00:00+00:00',
        title: 'This is another event'
    }, {
        id: 3,
        color: '#3694DF',
        from: '2019-05-05T13:00:00+00:00',
        to: '2019-05-05T20:00:00+00:00',
        title: 'This is also another event'
    }];


    return (
        <>
            <section class="content page-calendar">
                <div class="body_scroll">
                    <div class="block-header">
                        <div class="row">
                            <div class="col-lg-7 col-md-6 col-sm-12">
                                <h2>Calendar</h2>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> Aero</a></li>
                                    <li class="breadcrumb-item"><a href="javascript:void(0);">App</a></li>
                                    <li class="breadcrumb-item active">Calendar</li>
                                </ul>
                            </div>
                            <div class="col-lg-5 col-md-6 col-sm-12">
                                <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12 col-lg-8 col-xl-8">
                                <div class="card">

                                    <div class="body">
                                        {/* <div id="calendar"></div> */}
                                        <Calendar
                                            events={events}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-4 col-xl-4">
                                <div class="card p-3" >
                                    <div class="event_list">
                                        <button type="button" class="btn btn-info btn-block waves-effect" data-toggle="modal" data-target="#addNewEvent">Add Events</button>
                                        <div class="e_list">
                                            <h5 class="e_name">11 September <span class="badge badge-primary float-right">Conference</span></h5>
                                            <address><i class="zmdi zmdi-pin"></i> 123 6th St. Melbourne, FL 32904</address>
                                            <p class="e_details">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                        <div class="e_list">
                                            <h5 class="e_name">12 November <span class="badge badge-success float-right">Birthday Party</span></h5>
                                            <address><i class="zmdi zmdi-pin"></i> 123 6th St. Melbourne, FL 32904</address>
                                            <p class="e_details">It is a long established fact that a reader will be distracted</p>
                                        </div>
                                        <div class="e_list">
                                            <h5 class="e_name">16 December <span class="badge badge-danger float-right">Repeating</span></h5>
                                            <address><i class="zmdi zmdi-pin"></i> 123 6th St. Melbourne, FL 32904</address>
                                            <p class="e_details">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="modal fade" id="addNewEvent" aria-hidden="true" style={{ display: "none" }}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title"><strong>Add</strong> an event</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="control-label">Event Name</label>
                                        <input class="form-control" placeholder="Enter name" type="text" name="category-name" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="control-label">Choose Event Color</label>
                                        <select class="form-control" data-placeholder="Choose a color..." name="category-color">
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
                            <button type="button" class="btn btn-success save-event" data-dismiss="modal">Save</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
                            <button class="btn btn-secondary" data-dismiss="modal">Close</button>
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
                            <button class="btn btn-default" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
