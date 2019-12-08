import React from "react";

export default function Contact({ contact }) {
  return (
    <div className="friend">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg"
        alt="avatar"
      />
      <p>
        <strong>{contact.userData.username}</strong>
        <span>Last Message</span>
      </p>
    </div>
  );
}
