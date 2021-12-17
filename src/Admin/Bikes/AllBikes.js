import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../BaseUrl';
import $ from 'jquery';
import AddBike from './AddBike';


export default function AllBikes(props) {

    const [allBikesComponent, setallBikesComponent] = useState(true)
    const [rentComponent, setrentComponent] = useState(false)
    const [addBikeComponent, setaddBikeComponent] = useState(false)

    const [bikes, setbikes] = useState([])
    let adminToken = localStorage.getItem('adminToken');

    // const [allBikesComponent, setallBikesComponent] = useState(true)

    async function getAllBikes() {
        let Bikes = await fetch(BaseUrl + 'admin/bikes', {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                "Authorization": `Bearer ${adminToken}`
            }
        });
        let allBikes = await Bikes.json();

        if (Bikes.status === 200) {
            setbikes(allBikes);
            console.log(allBikes);
        }
        else alert(allBikes.message);
    }


    useEffect(() => {
        getAllBikes();
        console.log(props.newState);
        if (props.newState === true) {
            setallBikesComponent(true);
        }
    }, [])

    $(document).ready(function () {
        $('.searchField').on('keyup', function () {
            var searchTerm = $(this).val().toLowerCase();
            $('#detailTbl tbody tr').each(function () {
                var lineStr = $(this).text().toLowerCase();
                if (lineStr.indexOf(searchTerm) === -1) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    });


    function addNewFunction() {
        setallBikesComponent(!allBikesComponent);
        setaddBikeComponent(!addBikeComponent);
    }

    async function getAllBikes() {
        let Bikes = await fetch(BaseUrl + 'admin/bikes', {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                "Authorization": `Bearer ${adminToken}`
            }
        });
        let allBikes = await Bikes.json();

        if (Bikes.status === 200) {
            setbikes(allBikes);
        }
        else alert(allBikes.message);
    }

    async function updateFunction(e) {
        let bikeId = e.target.name;
        let company = document.getElementById('company' + bikeId).innerHTML;
        let model = document.getElementById('model' + bikeId).innerHTML;
        let category = document.getElementById('category' + bikeId).innerHTML;
        let chasis_no = document.getElementById('chasis_no' + bikeId).innerHTML;
        let image = document.getElementById('image' + bikeId).innerHTML;
        let status = document.getElementById('status' + bikeId).innerHTML;

        let bikeUpdate = await fetch(BaseUrl + 'admin/bikes/updatebike', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": `Bearer ${adminToken}`
            },
            body: JSON.stringify({
                bikeId: bikeId, company: company, model: model, category, category,
                chasis_no: chasis_no, image: image, status: status
            })
        })
        let updated = bikeUpdate.json();
        if (bikeUpdate.status === 200 && updated.message === 'Updated') {
            alert('Updated');
        }
        else alert(updated.message);
    }

    async function deleteRecord(e) {
        let bikeId = e.target.name;
        let deleteBike = await fetch(BaseUrl + `admin/bikes/deletebike/${bikeId}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'Application/json',
                "Authorization": `Bearer ${adminToken}`
            }
        });
        let deleted = await deleteBike.json();
        if (deleteBike.status === 200 && deleted.message == 'Deleted') {
            getAllBikes()
        }
        else alert(deleted.message);
    }


    return (
        <>
            {addBikeComponent === true ?
                <AddBike />
                : null}

            {allBikesComponent === true ?
                <section class="content" style={{ backgroundColor: 'white', marginRight: '15px' }}>
                    <div class="block-header mb-3" style={{ backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '5px' }}>
                        <div class="row">
                            <div class="col-lg-7 col-md-6 col-sm-12">
                                <h2>Dashboard</h2>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> ApnaBike</a></li>
                                    <li class="breadcrumb-item active">Bikes</li>
                                </ul>
                                <button class="btn btn-primary btn-icon mobile_menu" type="button"><i class="zmdi zmdi-sort-amount-desc"></i></button>

                            </div>

                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="body_scroll ">
                            <div class="body">
                                <div id="chart-area-spline-sracked" class="c3_chart d_sales"></div>
                            </div>

                            <div class="body_scroll dataTable"  >
                                <div class="container-fluid" >
                                    <div class="row clearfix">
                                        <div class="col-lg-12 " style={{ marginTop: '-20px' }} >
                                            <div className="confirmBtns mb-4 ">
                                                <button style={{ width: '20%', height: '50px' }} onClick={() => addNewFunction()} className="btn btn-info buttons"> Add New  <i className="zmdi zmdi-plus"></i> </button>
                                            </div>
                                            <div class="card bikesTable">
                                                <h3 class="card-header text-center ml-5 font-weight-bold text-uppercase py-4"> All Bikes</h3>

                                                <div class="card-body">
                                                    <div id="table" class="table-editable">
                                                        <input type="text" placeholder="Search..." className="searchField float-right mb-4 outline" />
                                                        <table id="detailTbl" class="table table-bordered table-responsive-md text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-center">Id</th>
                                                                    <th class="text-center">Company</th>
                                                                    <th class="text-center">Model</th>
                                                                    <th class="text-center">Category</th>
                                                                    <th class="text-center">Chasis_no</th>
                                                                    <th class="text-center">Image</th>
                                                                    <th class="text-center">Status</th>
                                                                    <th class="text-center">Update/Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {bikes.map(bike =>
                                                                    <tr key={bike.bike_id}>
                                                                        <td class="pt-3-half" contenteditable="true">{bike.bike_id}</td>
                                                                        <td id={"company" + bike.bike_id} class="pt-3-half" contenteditable="true">{bike.company}</td>
                                                                        <td id={"model" + bike.bike_id} class="pt-3-half" contenteditable="true">{bike.model}</td>
                                                                        <td id={"category" + bike.bike_id} class="pt-3-half" contenteditable="true">{bike.category}</td>
                                                                        <td id={"chasis_no" + bike.bike_id} class="pt-3-half" contenteditable="true">{bike.chasis_no}</td>
                                                                        <td id={"image" + bike.bike_id} class="pt-3-half" contenteditable="true">{bike.image}</td>
                                                                        <td id={"status" + bike.bike_id} class="pt-3-half" contenteditable="true">{bike.status}</td>
                                                                        <td>
                                                                            <span class="table-remove d-flex">
                                                                                <button type="button" class="btn update btn-rounded btn-sm my-0 outline" name={bike.bike_id} onClick={(e) => updateFunction(e)}>Update </button>
                                                                                <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1" name={bike.bike_id} onClick={(e) => deleteRecord(e)}>Remove </button>
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>

                : null
            }

        </>
    )
}
