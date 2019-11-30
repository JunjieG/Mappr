import React, { useState, useEffect } from 'react';

function LogOut() {
  fetch(`/api/users/logout` , {
    method: "GET",
    //headers: {
      //'Content-type': 'application/json'
    //},
    //body: JSON.stringify({
      //'email': email,
      //'password': password
    //})
  })
  .then((result) => result.json())
    .then((info) => {
      if (info == "auth/invalid-email"){
        console.log('whyyy?')
      }
    })

  return (
    <div className="LogOut">
      <h1>Logging Out..</h1>
    </div>
  );
}

export default LogOut;
