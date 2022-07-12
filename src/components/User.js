import React from "react";

export default function User(user) {
  return (
    <div className='media-scroller'>
      {user.map((name) => {
        return (
          <div>
            <img
              style={{ width: "100px", margin: "10px" }}
              src={name.imageUrl}
              alt=''
            ></img>
            <h1>{name.name}</h1>
          </div>
        );
      })}
    </div>
  );
}
