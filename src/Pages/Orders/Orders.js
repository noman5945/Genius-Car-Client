import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user, logOut } = useContext(context);
  const [orders, setOrders] = useState([]);
  console.log(user);

  useEffect(() => {
    fetch(`http://localhost:50000/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("acces-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 403 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setOrders(data));
  }, [user?.email, logOut]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure about canceling this order?");
    if (proceed) {
      fetch(`http://localhost:50000/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Order Cancelled");
            const remining = orders.filter((odr) => odr._id !== id);
            setOrders(remining);
          }
        });
    }
  };

  const handleStatusUpdate = (id) => {
    fetch(`http://localhost:50000/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr._id !== id);
          const approving = orders.find((odr) => odr._id === id);
          approving.status = "Approved";

          const newOrders = [approving, ...remaining];
          setOrders(newOrders);
        }
      });
  };

  return (
    <div>
      <div className="my-15">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Email</th>
                <th>Message</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  handleDelete={handleDelete}
                  handleStatusUpdate={handleStatusUpdate}
                ></OrderRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
