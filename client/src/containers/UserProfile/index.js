import React, { useState, useEffect } from 'react';

export default function UserProfile() {
  fetch(`/api/users/getuser` , {
    method: "GET",
  })
    .then((result) => {
      console.log(result.json())
    })

  return (
    <div className="LogOut">
      <h1>Getting user....</h1>
    </div>
  );
}
