import React, { useState, useEffect } from "react";

export default function Contact({ contact }) {
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useState(() => {
    fetch(
      `https://ui-avatars.com/api/?name=${contact.userData.username
        .split(" ")
        .join("+")}`
    ).then(res => {
      setProfileImageUrl(res.url);
    });
  }, []);

  return (
    <div className="friend">
      <img src={profileImageUrl} />
      <p>
        <strong>{contact.userData.username}</strong><br />
        <span>{contact.userData.email}</span>
      </p>
    </div>
  );
}
