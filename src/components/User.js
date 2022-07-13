import React from "react";

export default function User(user) {
  if (user) {
    return (
      <div className='media-scroller'>
        <div>
          <img
            style={{ width: "100px", margin: "10px" }}
            src={user.user.imageUrl}
            alt=''
          ></img>
          <span>{user.user.prefix}</span>
          <span>{user.user.name}</span>
          <span>{user.user.lastName}</span>
          <span>{user.user.title}</span>

          <span>{user.user.email}</span>
          <span>{user.user.ip}</span>
          <span>{user.user.jobArea}</span>
          <span>{user.user.jobType}</span>

          <span>{user.user.company?.name}</span>
          <span>{user.user.address?.city}</span>
          <span>{user.user.address?.country}</span>
          <span>{user.user.address?.state}</span>
          <span>{user.user.address?.streetAddress}</span>
          <span>{user.user.address?.zipCode}</span>
        </div>
      </div>
    );
  }
}
