import Navbar from "../Components/navbar";
import AdminButton from "../Components/adminButton";
import { useEffect, useState } from "react";

function ChangePrice() {
  const [data, setData] = useState([]);
  const [roomID, setRoomID] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = () => {
    fetch("http://localhost:3001/api/admin/room_prices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Failed to fetch request data");
        }
      })
      .then((data) => {
        setData(data);
        setError("");
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changePrice = () => {
    fetch("http://localhost:3001/api/admin/change-price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomID, newPrice }),
    })
      .then((res) => {
        if (res.status === 200) {
          setSuccess("Price changed successfully");
          setError("");
          fetchData(); // Refresh data after successful update
        } else {
          throw new Error("Failed to change price");
        }
      })
      .catch((error) => {
        setError("Error changing price");
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div style={{ height: "40px" }}></div>
      <div className="four-buttons">
        <AdminButton
          text="Request Handling"
          clicked={false}
          path="/admin-dashboard/request-handling"
          className="admin-button-class"
        />
        <AdminButton
          text="Change Prices"
          clicked={true}
          path="/admin-dashboard/change-prices"
          className="admin-button-class"
        />
        <AdminButton
          text="Upcoming Bookings"
          clicked={false}
          path="/admin-dashboard/upcoming-bookings"
        />
        <AdminButton
          text="Recent Bookings"
          clicked={false}
          path="/admin-dashboard/recent-bookings"
          className="admin-button-class"
        />
      </div>

      <div className="price-table">
        <table>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.RoomID}>
                  <td>{item.RoomID}</td>
                  <td>{item.Price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ height: "40px" }}></div>

      <div className="price-change">
        <input
          type="text"
          placeholder="Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          pattern="[0-9][0-9]"
        />
        <input
          type="text"
          placeholder="New Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          pattern="[0-9]*"
        />
        <button onClick={changePrice}>Change Price</button>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default ChangePrice;
