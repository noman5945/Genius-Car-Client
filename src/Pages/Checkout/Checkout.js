import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { context } from "../../Context/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const fname = form.firstName.value;
    const lname = form.lastName.value;
    const name = `${fname} ${lname}`;
    const email = user?.email || "unregisterd";
    const message = form.message.value;
    const phone = form.phone.value;

    const order = {
      service: _id,
      orderName: title,
      price: price,
      customerName: name,
      email: email,
      message: message,
      phone,
    };

    fetch("http://localhost:50000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          form.reset();
          alert("Order Placed");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>{title}</h2>
      <div>Price:{price}</div>
      <form onSubmit={handleSubmit} className="my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full "
            name="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full "
            name="lastName"
          />
          <input
            type="text"
            placeholder="Phone No"
            className="input input-bordered w-full "
            name="phone"
          />
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full "
            value={user?.email}
            name="email"
            readOnly
          />
        </div>
        <div className="my-5">
          <textarea
            className="textarea textarea-success w-full"
            placeholder="Message"
            name="message"
          ></textarea>
        </div>
        <div className="my-10">
          <input
            className="btn btn-success"
            type="submit"
            placeholder="Order"
          />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
