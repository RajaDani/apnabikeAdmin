import React, { useState } from 'react'
import { Card, Col, Form, Input, Label, Row, Container } from "reactstrap";
import { BaseUrl } from '../BaseUrl';
import { useHistory } from 'react-router-dom';
import BikesAdmin from '.';
import AllBikes from './AllBikes';

export default function AddRent(props) {

    const [rentComponent, setrentComponent] = useState(true)
    const [allBikesComponent, setallBikesComponent] = useState(false)

    let history = useHistory();
    async function submitHandler(e) {

        e.preventDefault();

        let bikeId = props.bikeId;
        let daily_rent = document.getElementById('daily_rent').value.trim();
        let weekly_rent = document.getElementById('weekly_rent').value.trim();
        let monthly_rent = document.getElementById('monthly_rent').value.trim();

        let rent = await fetch(BaseUrl + `rent/addrent?daily_rent=${daily_rent}
        &weekly_rent=${weekly_rent}&monthly_rent=${monthly_rent}&bikeId=${bikeId}`);

        let result = await rent.json();

        if (rent.status === 200 && result.message == 'Rent Added') {
            setrentComponent(!rentComponent)
            setallBikesComponent(!allBikesComponent)
        }
        else alert(result.message);
    }

    return (
        <React.Fragment>

            {allBikesComponent === true ?
                <AllBikes newState={allBikesComponent} />
                : null}


            {rentComponent === true ?
                <Container fluid >
                    <section class="content" style={{ backgroundColor: 'white' }}>
                        <div class="block-header" style={{ backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '5px' }}>
                            <div class="row">
                                <div class="col-lg-7 col-md-6 col-sm-12">
                                    <h2>Bikes</h2>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> ApnaBike</a></li>
                                        <li class="breadcrumb-item active">Add Bike</li>
                                    </ul>
                                </div>
                                <div class="col-lg-5 col-md-6 col-sm-12">
                                    <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid ">
                            <Row>
                                <Col lg="12">
                                    <div id="addproduct-accordion" className="custom-accordion mt-1" >
                                        <Card>
                                            <div className="p-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-grow-1 overflow-hidden">
                                                        <h5 className="font-size-16 mb-1">Add Rent</h5>
                                                        <p className="text-muted text-truncate mb-0">Fill all information below</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 border-top">
                                                <Form onSubmit={(e) => submitHandler(e)}>

                                                    <Row>
                                                        <Col md="12">
                                                            <div className="mb-3">
                                                                <Label className="control-label">Daily Rent</Label>
                                                                <Input
                                                                    id="daily_rent"
                                                                    type="text"
                                                                    placeholder="Daily rent"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="12">
                                                            <div className="mb-3">
                                                                <Label className="control-label">Weekly Rent</Label>
                                                                <Input
                                                                    id="weekly_rent"
                                                                    type="text"
                                                                    placeholder="Weekly rent"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="12">
                                                            <div className="mb-3">
                                                                <Label className="control-label">Monthly Rent</Label>
                                                                <Input
                                                                    id="monthly_rent"
                                                                    type="text"
                                                                    placeholder="Monthly rent"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="confirmBtns mt-4">
                                                        <button style={{ width: '20%' }} type="submit" className="btn btn-success buttons"> <i className="zmdi zmdi-assignment"></i> Save </button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </section >
                </Container >
                : null}
        </React.Fragment >
    )
}
