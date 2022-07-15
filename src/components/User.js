import React from "react";

export default function User(user) {
  if (user) {
    return (
      <div className='user-scroller'>
        <div style={{ margin: "20px" }}>
          <img
            style={{ width: "100%" }}
            src={user.user.imageUrl + `?q=${user.user.id}`}
            alt=''
          ></img>
        </div>

        <div className='user-info'>
          <legend>Info</legend>
          <strong>
            <p>
              {user.user.prefix} {user.user.name}{" "}
              {user.user.lastName}
            </p>
          </strong>
          <p style={{ fontStyle: "italic" }}>
            {user.user.title}
          </p>
          <br />

          <p>
            <span>Email:</span> {user.user.email}
          </p>
          <p>
            <span>Ip Address:</span> {user.user.ip}
          </p>
          <p>
            <span>Job Area:</span> {user.user.jobArea}
          </p>
          <p>
            <span>Job Type:</span> {user.user.jobType}
          </p>
        </div>

        <div className='user-address'>
          <legend>Address</legend>
          <strong>
            <p>
              {user.user.company?.name}{" "}
              {user.user.company?.suffix}
            </p>
          </strong>
          <p>
            <span>City:</span>
            {user.user.address?.city}
          </p>
          <p>
            <span>Country:</span>{" "}
            {user.user.address?.country}
          </p>
          <p>
            <span>State:</span> {user.user.address?.state}
          </p>
          <p>
            <span>Street Address: </span>
            {user.user.address?.streetAddress}
          </p>
          <p>
            <span>ZIP:</span>
            {user.user.address?.zipCode}
          </p>
        </div>
      </div>
    );
  }
}
