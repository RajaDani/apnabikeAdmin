import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { BaseUrl } from "../../BaseUrl";

export default function BikeDeliverMap() {
  const [mapco, setmapco] = useState();
  const [lati, setlati] = useState(32.674);
  const [longi, setlongi] = useState(72.674);

  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={10} defaultCenter={{ lat: 32.756, lng: 72.567 }}>
        <Marker position={{ lat: lati, lng: longi }} />
      </GoogleMap>
    ))
  );

  async function getMapCoordinates() {
    let adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      let mapCoordinates = await fetch(
        BaseUrl + `admin/dashboard/getMapCoordinates`,
        {
          method: "GET",
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (mapCoordinates.status === 200) {
        let coordinates = await mapCoordinates.json();
        setmapco(coordinates);
      }
    }
  }
  function getBikeCoordinates(latitude, longitude) {
    setlati(latitude);
    setlongi(longitude);
  }
  useEffect(() => {
    getMapCoordinates();
  }, []);
  return (
    <div
      className="mb-5 pl-4 pr-3 pt-4"
      style={{ backgroundColor: "white", borderRadius: "5px" }}
    >
      <h2 className="mb-5 mt-3 ml-1">Bikes to Deliver</h2>
      <Row>
        <Col md="5">
          <Card>
            <div>
              <table
                class="table table-bordered table-stripped"
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "white",
                  overflow: "scroll",
                }}
              >
                <thead>
                  <td>BikeId</td>
                  <td>City</td>
                  <td>Booked At</td>
                </thead>

                {mapco &&
                  mapco.map((co) => (
                    <tr
                      onClick={(e) =>
                        getBikeCoordinates(co.latitude, co.longitude)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td>{co.bike_id}</td>
                      <td>{co.city}</td>
                      <td>{co.createdAt}</td>
                    </tr>
                  ))}
              </table>
            </div>
          </Card>
        </Col>
        <Col md="7">
          <Card style={{ border: "2px solid white", borderRadius: "10px" }}>
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA7s-pczSBWzAHzer2TpF6neMyYjVYXEgk&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
