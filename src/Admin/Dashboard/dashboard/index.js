import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import "../../sidebarStyle.scss";
import { BaseUrl } from "../../BaseUrl";

//Import Components
import MiniWidget from "./mini-widget";
import SalesAnalyticsChart from "./salesanalytics-chart";
import TopProduct from "./topselling-product";
import LatestTransaction from "./latest-transaction";
import { SessionExpiredAlert } from "../../Sweetalert";
import { useHistory } from "react-router-dom";
// import BikeDeliverMap from "./BikeDeliverMap";

//Import Image

const series1 = [
  {
    data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54],
  },
];

const options1 = {
  fill: {
    colors: ["#5b73e8"],
  },
  chart: {
    width: 70,
    sparkline: {
      enabled: !0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
    },
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: !1,
    },
    x: {
      show: !1,
    },
    y: {
      title: {
        formatter: function (seriesName) {
          return "";
        },
      },
    },
    marker: {
      show: !1,
    },
  },
};

const series2 = [70];

const options2 = {
  fill: {
    colors: ["#34c38f"],
  },
  chart: {
    sparkline: {
      enabled: !0,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "60%",
      },
      track: {
        margin: 0,
      },
      dataLabels: {
        show: !1,
      },
    },
  },
};

const series3 = [55];

const options3 = {
  fill: {
    colors: ["#5b73e8"],
  },
  chart: {
    sparkline: {
      enabled: !0,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "60%",
      },
      track: {
        margin: 0,
      },
      dataLabels: {
        show: !1,
      },
    },
  },
};

const series4 = [
  {
    data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
  },
];

const options4 = {
  fill: {
    colors: ["#f1b44c"],
  },
  chart: {
    width: 70,
    sparkline: {
      enabled: !0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
    },
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: !1,
    },
    x: {
      show: !1,
    },
    y: {
      title: {
        formatter: function (seriesName) {
          return "";
        },
      },
    },
    marker: {
      show: !1,
    },
  },
};

const Dashboard = () => {
  const [totalBikes, settotalBikes] = useState();
  const [totalOrders, settotalOrders] = useState();
  const [totalUsers, settotalUsers] = useState();
  let adminToken = localStorage.getItem("adminToken");
  let history = useHistory();

  var reports = [
    {
      id: 1,
      icon: "mdi mdi-arrow-up-bold",
      title: "Total Bikes",
      value: totalBikes,
      prefix: "",
      suffix: "",
      badgeValue: "2.65%",
      decimal: 0,
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      color: "success",
      desc: "since last week",
      series: series1,
      options: options1,
    },
    {
      id: 2,
      icon: "mdi mdi-arrow-down-bold",
      title: "Orders",
      value: totalOrders,
      decimal: 0,
      charttype: "radialBar",
      chartheight: 45,
      chartwidth: 45,
      prefix: "",
      suffix: "",
      badgeValue: "0.82%",
      color: "danger",
      desc: "since last week",
      series: series2,
      options: options2,
    },
    {
      id: 3,
      icon: "mdi mdi-arrow-down-bold",
      title: "Customers",
      value: totalUsers,
      decimal: 0,
      prefix: "",
      suffix: "",
      charttype: "radialBar",
      chartheight: 45,
      chartwidth: 45,
      badgeValue: "6.24%",
      color: "danger",
      desc: "since last week",
      series: series3,
      options: options3,
    },
    {
      id: 4,
      icon: "mdi mdi-arrow-up-bold",
      title: "Growth",
      value: 2.48,
      decimal: 2,
      prefix: "+",
      suffix: "%",
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      badgeValue: "10.51%",
      color: "success",
      desc: "since last week",
      series: series4,
      options: options4,
    },
  ];

  const getAllData = async () => {
    try {
      let total = await fetch(BaseUrl + "admin/dashboard/getAllDashboardData", {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      let result = await total.json();
      if (total.status === 200) {
        settotalBikes(result.bike);
        settotalOrders(result.orders);
        settotalUsers(result.users);
      } else if (total.status === 440) {
        SessionExpiredAlert();
        localStorage.clear();
        history.push("login");
      } else alert(total.message);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="mt-4">
          {
            (totalBikes,
              totalOrders,
              totalUsers && <MiniWidget reports={reports} />)
          }
        </Row>

        <Row className="mt-5 mb-5">
          <Col xl={8}>
            <SalesAnalyticsChart />
          </Col>
          <Col xl={4}>
            <TopProduct
              bikes={totalBikes}
              orders={totalOrders}
              users={totalUsers}
            />
          </Col>
        </Row>
        {/* <BikeDeliverMap /> */}
        <LatestTransaction />
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
