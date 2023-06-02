import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BarChart from "../charts/BarChart";
import "../styles/CustomerDashboard.css";

function CustomerDashboard() {
  const location = useLocation();
  const name = location.state.name;
  const email = location.state.email;
  const [customerReport, setCustomerReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [kgPounds, setKgPounds] = useState("");
  const [currentweight, setCurrentWeight] = useState("");
  const [idealweight, setIdealWeight] = useState("");
  const [currentWeightKg, setCurrentWeightKg] = useState("");
  const [idealWeightKg, setIdealWeightKg] = useState("");

  useEffect(() => {
    async function fetchCustomerReport() {
      setLoading(true);
      const response = await fetch(
        "http://localhost:1337/api/getCustomerData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();
      setCustomerReport(data.weight)
      setKgPounds(data.weight[0].inkg)
      setLoading(false);
    }

    fetchCustomerReport();
  }, [email]);

  async function postCustomerData(event) {
    event.preventDefault();
    if(kgPounds === "1"){
      const currentWeightInKG = currentweight * 0.45;
      setCurrentWeightKg(currentWeightInKG)
      const idealWeightInKG = idealweight * 0.45;
      setIdealWeightKg(idealWeightInKG);
    } else {
      setCurrentWeightKg(currentweight);
      setIdealWeightKg(idealweight);
    }

    const response = await fetch("http://localhost:1337/api/customerreport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        date,
        currentWeightKg,
        idealWeightKg,
        kgPounds
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      alert("Added Successfully!");
      setDate("");
      setCurrentWeight("");
      setIdealWeight("");
    } else {
      alert("Check the Data");
    }
  }

  return (
    <div>
      <div id="header">
        <h2
          style={{
            marginLeft: "16px",
            fontWeight: "normal",
            fontSize: "20px",
            padding: "4px",
          }}
        >
          unlock.fit
        </h2>
      </div>

      <div className="grid-container">
        <div className="grid-item" style={{ marginTop: "36px" }}>
          <form onSubmit={postCustomerData}>
            <div className="customerInfoCard">
              <div style={{ padding: "12px" }}>
                <label style={{ marginLeft: "40px" }}>Date</label>
                <input
                  type="date"
                  style={{
                    marginLeft: "95px",
                    width: "160px",
                    height: "20px",
                    border: "1px solid #d2a72b",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div style={{ padding: "12px" }}>
                <label style={{ marginLeft: "40px" }}>Weight's In</label>
                <select style={{
                  marginLeft: "50px",
                  width: "160px",
                  height: "20px",
                  border: "1px solid #d2a72b",
                  outline: "none"
                }} value={kgPounds} onChange={(e) => setKgPounds(e.target.value)}>
                  <option value="0">KG</option>
                  <option value="1">Pounds</option>
                </select>
                
              </div>

              <div style={{ padding: "12px" }}>
                <label style={{ marginLeft: "40px" }}>Weight</label>
                <input
                  type="Number"
                  style={{
                    marginLeft: "78px",
                    width: "160px",
                    height: "20px",
                    border: "1px solid #d2a72b",
                    outline: "none",
                  }}
                  value={currentweight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                />
              </div>

              <div style={{ padding: "12px" }}>
                <label style={{ marginLeft: "40px" }}>Ideal Weight</label>
                <input
                  type="Number"
                  style={{
                    marginLeft: "40px",
                    width: "160px",
                    height: "20px",
                    border: "1px solid #d2a72b",
                    outline: "none",
                  }}
                  value={idealweight}
                  onChange={(e) => setIdealWeight(e.target.value)}
                />
              </div>

              <div style={{ padding: "12px" }}>
                <input
                  type="submit"
                  value="Save"
                  style={{
                    marginLeft: "168px",
                    height: "28px",
                    width: "160px",
                    border: "1px solid #D2A72B",
                    backgroundColor: "#a37f17",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="grid-item" style={{ marginTop: "12px" }}>
          <div className="chartCard" style={{ width: "500px", margin: "28px" }}>
            <div>
              <h2
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  fontSize: "20px",
                }}
              >
                Weight Tracker
              </h2>
            </div>
            <BarChart chartData={customerReport} />
          </div>
        </div>

        <div className="grid-item" style={{ marginTop: "12px" }}>
          <div className="customerTableCard">
            <table
              style={{
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  <th style={{ color: "#D2A72B" }}>Date</th>
                  <th style={{ color: "#D2A72B" }}>Ideal Weight{(kgPounds === 1) ? " ( Pounds )" : " ( KG )"}</th>
                  <th style={{ color: "#D2A72B" }}>Current Weight{(kgPounds === 1) ? " ( Pounds )" : " ( KG )"}</th>
                </tr>
                {loading ? (
                  <tr></tr>
                ) : (
                  customerReport.map((value, key) => (
                    <tr key={key} style={{ backgroundColor: (value.idealweight.toFixed(2)) >= (value.currentweight.toFixed(2)) ? "#c0f6c0" : "#fce8e8"}}>
                      <td style={{ textAlign: "center", height: "32px" }}>
                        {value.dailydate}
                      </td>
                      <td style={{ textAlign: "center", height: "32px" }}>
                        { (kgPounds === "1") ? value.idealweight.toFixed(2) : (value.idealweight * 2.20462).toFixed(2)}
                      </td>
                      <td style={{ textAlign: "center", height: "32px" }}>
                        { (kgPounds === "1") ? value.currentweight.toFixed(2) : (value.currentweight * 2.20462).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
